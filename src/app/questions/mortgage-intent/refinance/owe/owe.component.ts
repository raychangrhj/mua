import { Component, OnInit } from '@angular/core';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getRefinanceOweState,
  State
} from '../ngrx/reducers/index.reducer';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { OwedUpdateAction } from '../ngrx/actions/owed/owed.action';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-owed',
  templateUrl: './owe.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './owe.component.scss']
})
export class QuestionsMortgageIntentRefinanceOweComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRefinanceOweState)
      .take(1)
      .subscribe((owe: number) => {
        this.form.controls['owe'].setValue(owe);
      });
  }

  public formatOwe() {
    const number = this.form.controls['owe'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['owe'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['owe'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['owe'].updateValueAndValidity();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new OwedUpdateAction(
        parseInt(this.form.value.owe, 10)
      ));
    };
    this.form = formBuilder.group({
      owe: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    })
  }
}
