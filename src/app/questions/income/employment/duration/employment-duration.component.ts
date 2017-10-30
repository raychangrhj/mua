import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

import {
  getTempCompanyNameState,
  getTempEmploymentState,
  getTempJobDatesState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { TempEmploymentDatesUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentDatesState } from '../../ngrx/reducers/temp-employment/temp-employement.reducer';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import {
  EmploymentAddAction,
  EmploymentUpdateAction
} from '../../ngrx/actions/employment/employment.action';
import { specialDateValidator } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-employment-duration',
  templateUrl: './employment-duration.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './employment-duration.component.scss']
})
export class QuestionsIncomeEmploymentDurationComponent extends QuestionsBaseComponent implements OnInit {

  public currentEmployment: EmploymentStateObject;
  public isCurrentEmployment = false;
  public companyName$: Observable<string>;

  public ngOnInit() {
    super.ngOnInit();

    this.companyName$ = this.store.select(getTempCompanyNameState);

    const currentEmployment$ = this.activatedRoute.data.map((data => data.currentEmployment)).take(1);
    const tempEmploymentDates$ = this.store.select(getTempJobDatesState).take(1);

    Observable.forkJoin(currentEmployment$, tempEmploymentDates$)
      .subscribe((resolves: [EmploymentStateObject, EmploymentDatesState]) => {
        let currentEmployment = false;
        if (resolves[0]) {
          this.currentEmployment = resolves[0];
          this.form.controls['startDate'].setValue(resolves[0].dates.startDate);
          this.form.controls['endDate'].setValue(resolves[0].dates.endDate);
          currentEmployment = resolves[0].dates.endDate === 'current';
        } else {
          this.form.controls['startDate'].setValue(resolves[1].startDate);
          this.form.controls['endDate'].setValue(resolves[1].endDate);
          currentEmployment = resolves[1].endDate === 'current';
        }
        this.isCurrentEmployment = currentEmployment;
        if (this.isCurrentEmployment) {
          this.form.controls['endDate'].setValidators(Validators.required);
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
          this.currentEmployment,
          Object.assign({},
            this.currentEmployment,
            {
              dates: this.form.value
            }
          )
        ));
      } else {
        this.store.dispatch(new TempEmploymentDatesUpdateAction(
          this.form.value
        ));
        this.store.select(getTempEmploymentState)
          .take(1)
          .subscribe((employment: EmploymentStateObject) => {
            this.store.dispatch(new EmploymentAddAction(employment));
          });
      }
    };
    this.form = this.formBuilder.group({
      startDate: [null, [Validators.required, specialDateValidator]],
      endDate: [null, [Validators.required, specialDateValidator]]
    });
  }
}
