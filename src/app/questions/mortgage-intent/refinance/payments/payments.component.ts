import { Component, OnInit } from '@angular/core';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { PaymentUpdateAction } from '../ngrx/actions/payments/payment.action';
import {
  getRefinancePaymentState,
  State
} from '../ngrx/reducers/index.reducer';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './payments.component.scss']
})
export class QuestionsMortgageIntentRefinancePaymentsComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRefinancePaymentState)
      .take(1)
      .subscribe((payment: number) => {
        this.form.controls['payment'].setValue(payment);
      });
  }

    public formatPayment() {
    const number = this.form.controls['payment'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['payment'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['payment'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['payment'].updateValueAndValidity();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new PaymentUpdateAction(
        parseInt(this.form.value.payment, 10)
      ));
    };
    this.form = formBuilder.group({
      payment: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    })
  }

}
