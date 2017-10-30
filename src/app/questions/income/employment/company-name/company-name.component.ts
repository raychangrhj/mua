import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/empty';

import {
  getCurrentEmploymentState,
  getTempCompanyNameState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { TempEmploymentCompanyNameUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';

@Component({
  selector: 'regions-employment-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './company-name.component.scss']
})
export class QuestionsIncomeEmploymentCompanyNameComponent extends QuestionsBaseComponent implements OnInit {

  public currentEmployment: EmploymentStateObject;
  public isFirstJob = true;

  public ngOnInit() {
    super.ngOnInit();

    const employmentState$: Observable<EmploymentStateObject[]> = this.store.select(getCurrentEmploymentState).take(1);
    const params$: Observable<Params> = this.activatedRoute.params.take(1);

    Observable.forkJoin(employmentState$, params$)
      .subscribe((resolves: [EmploymentStateObject[], Params]) => {

        this.isFirstJob =
          !!(resolves[1] && resolves[1].index)
            ? resolves[1].index === '0'
            : Array.isArray(resolves[0]) && !resolves[0].length;
      });

    const currentEmployment$ = this.activatedRoute.data.map((data => data.currentEmployment)).take(1);
    const tempEmploymentCompanyName$ = this.store.select(getTempCompanyNameState).take(1);

    Observable.forkJoin(currentEmployment$, tempEmploymentCompanyName$)
      .subscribe((resolves: [EmploymentStateObject, string]) => {
        if (resolves[0]) {
          this.currentEmployment = resolves[0];
          this.form.controls['employer'].setValue(resolves[0].companyName);
        } else {
          this.form.controls['employer'].setValue(resolves[1]);
        }
      }).unsubscribe();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<IncomeState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentEmployment) {
        this.store.dispatch(new EmploymentUpdateAction(this.currentEmployment, Object.assign({},
          this.currentEmployment,
          {
            companyName: this.form.value.employer
          }
        )));
      } else {
        this.store.dispatch(new TempEmploymentCompanyNameUpdateAction(this.form.value.employer));
      }
    };
    this.form = formBuilder.group({
      employer: [null, Validators.required]
    });
  }

}
