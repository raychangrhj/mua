import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { GiftStateObject } from '../../ngrx/reducers/gifts/gifts.reducer';
import {
  GiftAddAction,
  GiftUpdateAction
} from '../../ngrx/actions/gifts/gifts.action';
import {
  AssetsState,
  getTempGiftState
} from '../../ngrx/reducers/index.reducer';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './amount.component.scss']
})
export class QuestionsAssetsGiftsAmountComponent extends QuestionsBaseComponent implements OnInit {

  public tempGift: GiftStateObject;
  public currentGift: GiftStateObject;

  public formatAmount() {
    const number = this.form.controls['amount'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['amount'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['amount'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['amount'].updateValueAndValidity();
  }

  public ngOnInit() {
    super.ngOnInit();

    const currentGift$ = this.activatedRoute.data.map((data => data.currentGift)).take(1);
    const tempGift$ = this.store.select(getTempGiftState).take(1);

    Observable.forkJoin(currentGift$, tempGift$)
      .subscribe((resolves: [GiftStateObject, GiftStateObject]) => {
        if (resolves[0]) {
          this.currentGift = resolves[0];
          this.form.controls['amount'].setValue(resolves[0].amount);
        } else {
          this.tempGift = resolves[1];
          this.form.controls['amount'].setValue(resolves[1].amount);
        }
      }).unsubscribe();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AssetsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentGift) {
        this.store.dispatch(new GiftUpdateAction(this.currentGift, Object.assign({},
          this.currentGift,
          {
            amount: this.form.value.amount && this.form.value.amount.replace
              ? parseInt(this.form.value.amount.replace('$', '').replace(',', ''), 10)
              : this.form.value.amount
          }
        )));
      } else {
        this.store.dispatch(new GiftAddAction(
          Object.assign({}, this.tempGift, {
            amount: this.form.value.amount && this.form.value.amount.replace
              ? parseInt(this.form.value.amount.replace('$', '').replace(',', ''), 10)
              : this.form.value.amount
          })
        ));
      }
    };
    this.form = formBuilder.group({
      amount: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    });
  }

}
