import { Component, OnInit } from '@angular/core';
import { AppraisalUpdateAction } from '../ngrx/actions/appraisal/appraisal.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getRefinanceAppraisalState,
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
  selector: 'regions-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './appraisal.component.scss']
})
export class QuestionsMortgageIntentRefinanceAppraisalComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getRefinanceAppraisalState)
      .take(1)
      .subscribe((appraisal: number) => {
        this.form.controls['appraisal'].setValue(appraisal);
      });
  }

  public formatAppraisal() {
    const number = this.form.controls['appraisal'].value;
    const cleanNumber = number ? number.replace(/[,]/g, '') : '';
    const commaNumber = cleanNumber ? cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    const renderString = commaNumber ? commaNumber.split('') : '';
    if (renderString && renderString[0] === '$') {
      this.form.controls['appraisal'].setValue(
        `${commaNumber}`
      );
    } else {
      this.form.controls['appraisal'].setValue(
        `$${commaNumber}`
      );
    }
    this.form.controls['appraisal'].updateValueAndValidity();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AppraisalUpdateAction(
        this.form.value.appraisal && this.form.value.appraisal.replace
          ? parseInt(this.form.value.appraisal.replace('$', '').replace(',', ''), 10)
          : this.form.value.appraisal
      ));
    };
    this.form = formBuilder.group({
      appraisal: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    })
  }

}
