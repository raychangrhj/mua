import { Component, OnInit } from '@angular/core';
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
import { LoanAmountUpdateAction } from '../ngrx/actions/loan-amount/loan-amount.action';
import {
  getRefinanceLoanAmountState,
  State
} from '../ngrx/reducers/index.reducer';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-loan-amount',
  templateUrl: './loan-amount.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './loan-amount.component.scss']
})
export class QuestionsMortgageIntentRefinanceLoanAmountComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRefinanceLoanAmountState)
      .take(1)
      .subscribe((loanAmount: number) => {
        this.form.controls['loanAmount'].setValue(loanAmount);
      });
  }

  public formatLoanAmount() {
    const number = this.form.controls['loanAmount'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['loanAmount'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['loanAmount'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['loanAmount'].updateValueAndValidity();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new LoanAmountUpdateAction(
        parseInt(this.form.value.loanAmount, 10)
      ));
    };
    this.form = formBuilder.group({
      loanAmount: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    })
  }

}
