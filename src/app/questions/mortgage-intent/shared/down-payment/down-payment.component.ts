import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { DownPaymentUpdateAction } from '../ngrx/actions/down-payment/down-payment.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  validMoneyRegex,
  validPositiveNumberRegex
} from '../../../../shared/form-validators';
import {
  getMortgageIntentState,
  MortgageIntentState,
  State
} from '../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-down-payment',
  templateUrl: './down-payment.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './down-payment.component.scss']
})
export class QuestionsMortgageIntentDownPaymentComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  public loanPrice: number;
  public downPaymentPercentValueChanges$: Subscription;
  public downPaymentAmountValueChanges$: Subscription;

  private convertToNumber(str: string): number {
    return parseInt(str.replace('$', '').replace(',', '').replace('%', ''), 10);
  }

  public onPercentFocus() {
    this.downPaymentPercentValueChanges$ = this.form.controls['downPaymentPercent'].valueChanges
      .subscribe((downPaymentPercent: string) => {
        const downPaymentAmount = this.form.controls['downPaymentAmount'];
        const newDownPaymentAmount = this.loanPrice * (this.convertToNumber(downPaymentPercent) / 100);
        downPaymentAmount.setValue(Number.isNaN(newDownPaymentAmount) ? null : `${+((newDownPaymentAmount).toFixed(0))}`);
      });
  }

  public onPercentBlur() {
    this.downPaymentPercentValueChanges$.unsubscribe();
  }

  public onAmountFocus() {
    this.downPaymentAmountValueChanges$ = this.form.controls['downPaymentAmount'].valueChanges
      .subscribe((downPaymentAmount: string) => {
        const downPaymentPercent = this.form.controls['downPaymentPercent'];
        const newDownPaymentPercent = (this.convertToNumber(downPaymentAmount) / this.loanPrice) * 100;
        downPaymentPercent.setValue(Number.isNaN(newDownPaymentPercent) ? null : `${+((newDownPaymentPercent).toFixed(2))}`);
      });
  }

  public onAmountBlur() {
    this.downPaymentAmountValueChanges$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getMortgageIntentState)
      .take(1)
      .subscribe((mortgageIntentState: MortgageIntentState) => {
        this.loanPrice = mortgageIntentState.cost;
        if (mortgageIntentState.downPayment) {
          this.form.controls['downPaymentAmount'].setValue(mortgageIntentState.downPayment);
          this.form.controls['downPaymentPercent'].setValue(
            +((mortgageIntentState.downPayment / mortgageIntentState.cost * 100).toFixed(2))
          );
        }
      });
  }

  public ngOnDestroy() {
    if (this.downPaymentPercentValueChanges$) {
      this.downPaymentPercentValueChanges$.unsubscribe();
    }
    if (this.downPaymentAmountValueChanges$) {
      this.downPaymentAmountValueChanges$.unsubscribe();
    }
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new DownPaymentUpdateAction(
        this.form.value.downPaymentAmount && this.form.value.downPaymentAmount.replace
          ? this.convertToNumber(this.form.value.downPaymentAmount)
          : this.form.value.downPaymentAmount
      ));
    };
    this.form = this.formBuilder.group({
      downPaymentAmount: [null, [Validators.required, Validators.pattern(validMoneyRegex)]],
      downPaymentPercent: [null, [Validators.required, Validators.pattern(validPositiveNumberRegex)]]
    })
  }

}
