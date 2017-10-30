import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {
  getTempJobIncomeState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { TempEmploymentIncomeUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';

@Component({
  selector: 'regions-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './monthly-income.component.scss']
})
export class QuestionsIncomeEmploymentMonthlyIncomeComponent extends QuestionsBaseComponent implements OnInit {

  public currentEmployment: EmploymentStateObject;

  public ngOnInit() {
    super.ngOnInit();

    const currentEmployment$ = this.activatedRoute.data.map((data => data.currentEmployment)).take(1);
    const tempEmploymentIncome$ = this.store.select(getTempJobIncomeState).take(1);

    Observable.forkJoin(currentEmployment$, tempEmploymentIncome$)
      .subscribe((resolves: [EmploymentStateObject, number]) => {
        if (resolves[0]) {
          this.currentEmployment = resolves[0];
          this.form.controls['income'].setValue(resolves[0].income);
        } else {
          this.form.controls['income'].setValue(resolves[1]);
        }
      });
  }

  constructor (
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<IncomeState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentEmployment) {
        this.store.dispatch(new EmploymentUpdateAction(
          this.currentEmployment, Object.assign({},
            this.currentEmployment,
            {
              income: this.form.value.income && this.form.value.income.replace
                ? parseInt(this.form.value.income.replace('$', '').replace(',', ''), 10)
                : this.form.value.income
            }
          )
        ));
      } else {
        this.store.dispatch(new TempEmploymentIncomeUpdateAction(
          this.form.value.income && this.form.value.income.replace
            ? parseInt(this.form.value.income.replace('$', '').replace(',', ''), 10)
            : this.form.value.income
        ));
      }
    };
    this.form = this.formBuilder.group({
      income: [null, Validators.required]
    });
  }

}
