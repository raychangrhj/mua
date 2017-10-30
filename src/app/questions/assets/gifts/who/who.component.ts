import { Component, OnInit } from '@angular/core';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { GiftStateObject } from '../../ngrx/reducers/gifts/gifts.reducer';
import { GiftUpdateAction } from '../../ngrx/actions/gifts/gifts.action';
import { TempGiftWhoUpdateAction } from '../../ngrx/actions/temp-gifts/temp-gifts.action';
import {
  AssetsState,
  getTempGiftWhoState
} from '../../ngrx/reducers/index.reducer';
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

@Component({
  selector: 'regions-who',
  templateUrl: './who.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './who.component.scss']
})
export class QuestionsAssetsGiftsWhoComponent extends QuestionsBaseComponent implements OnInit {

  public currentGift: GiftStateObject;

  public ngOnInit() {
    super.ngOnInit();

    const currentGift$ = this.activatedRoute.data.map((data => data.currentGift)).take(1);
    const tempGift$ = this.store.select(getTempGiftWhoState).take(1);

    Observable.forkJoin(currentGift$, tempGift$)
      .subscribe((resolves: [GiftStateObject, string]) => {
        if (resolves[0]) {
          this.currentGift = resolves[0];
          this.form.controls['who'].setValue(resolves[0].who);
        } else {
          this.form.controls['who'].setValue(resolves[1]);
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
            who: this.form.value.who
          }
        )));
      } else {
        this.store.dispatch(new TempGiftWhoUpdateAction(this.form.value.who));
      }
    };
    this.form = formBuilder.group({
      who: [null, Validators.required]
    });
  }

}
