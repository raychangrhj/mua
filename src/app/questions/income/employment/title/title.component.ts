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
import 'rxjs/add/operator/take';

import {
  getTempCompanyNameState,
  getTempJobTitleState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { TempEmploymentJobTitleUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';

@Component({
  selector: 'regions-employment-title',
  templateUrl: './title.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './title.component.scss']
})
export class QuestionsIncomeEmploymentTitleComponent extends QuestionsBaseComponent implements OnInit {

  public currentEmployment: EmploymentStateObject;
  public companyName$: Observable<string>;

  public ngOnInit() {
    super.ngOnInit();

    this.companyName$ = this.store.select(getTempCompanyNameState);

    const currentEmployment$ = this.activatedRoute.data.map((data => data.currentEmployment)).take(1);
    const tempEmploymentTitle$ = this.store.select(getTempJobTitleState).take(1);

    Observable.forkJoin(currentEmployment$, tempEmploymentTitle$)
      .subscribe((resolves: [EmploymentStateObject, string]) => {
        if (resolves[0]) {
          this.currentEmployment = resolves[0];
          this.form.controls['title'].setValue(resolves[0].title);
        } else {
          this.form.controls['title'].setValue(resolves[1]);
        }
      });
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
        this.store.dispatch(new EmploymentUpdateAction(
          this.currentEmployment, Object.assign({}, this.currentEmployment, this.form.value)
        ));
      } else {
        this.store.dispatch(new TempEmploymentJobTitleUpdateAction(
          this.form.value.title
        ));
      }
    };
    this.form = formBuilder.group({
      title: [null, Validators.required],
    });
  }

}
