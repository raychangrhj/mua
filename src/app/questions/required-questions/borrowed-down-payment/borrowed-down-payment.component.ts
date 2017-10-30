import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import {
  getGovernmentQuestionsBorrowedDownPaymentState,
  GovernmentQuestionsState
} from '../ngrx/reducers/government-questions.reducer';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GovernmentQuestionsBorrowedDownPaymentUpdateAction } from '../ngrx/actions/government-questions.action';

@Component({
  selector: 'regions-borrowed-down-payment',
  templateUrl: './borrowed-down-payment.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './borrowed-down-payment.component.scss']
})
export class QuestionsRequiredQuestionsBorrowedDownPaymentComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getGovernmentQuestionsBorrowedDownPaymentState)
      .take(1)
      .subscribe((bool: boolean) => {
        if (bool !== null) {
          this.form.controls['borrowedDownPayment'].setValue(bool ? 'yes' : 'no');
        }
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<GovernmentQuestionsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new GovernmentQuestionsBorrowedDownPaymentUpdateAction(
        this.form.value.borrowedDownPayment === 'yes'
      ));
    };
    this.form = formBuilder.group({
      borrowedDownPayment: [null, Validators.required]
    });
  }

}
