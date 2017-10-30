import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  getPrevEmploymentState,
  IncomeState
} from '../ngrx/reducers/index.reducer';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EmploymentStateObject } from '../ngrx/reducers/employment/employement.reducer';
import { TempEmploymentClearAction } from '../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentDeleteAction } from '../ngrx/actions/employment/employment.action';
import { Subscription } from 'rxjs/Subscription';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-previous-employment',
  templateUrl: './previous-employment.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './previous-employment.component.scss']
})
export class QuestionsIncomePreviousEmploymentComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private employments: EmploymentStateObject[];
  private employmentsStateObject$: Subscription;

  public displayEmployments: any[];
  public baseUrl: string;

  public removeEmployment(i: number) {
    this.store.dispatch(new EmploymentDeleteAction(this.employments[i]));
  }

  public ngOnDestroy() {
    this.employmentsStateObject$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.data.map(obj => obj.sectionId).take(1).subscribe((sectionId: number) => {
      this.baseUrl = sectionId === 30 ? '' : '/co-borrower';

      this.employmentsStateObject$ = this.store.select(getPrevEmploymentState)
        .subscribe((employments: EmploymentStateObject[]) => {
          if (Array.isArray(employments)) {
            this.employments = employments;
            this.displayEmployments = [];

            if (employments.length) {
              this.form.controls['hasPrevEmployments'].enable();
              this.form.controls['hasPrevEmployments'].setValue(true);

              this.form.controls['noPrevEmployment'].disable();
            } else {
              this.form.controls['hasPrevEmployments'].setValue(false);
              this.form.controls['hasPrevEmployments'].disable();

              this.form.controls['noPrevEmployment'].enable();
            }

            employments.forEach((employment: EmploymentStateObject, i: number) => {
              this.displayEmployments.push({
                title: employment.companyName,
                answers: [{
                  title: 'Company Name',
                  response: Observable.of(employment.companyName),
                  returnLink: `${this.baseUrl}/income/previous-employment/${i}/company-name/edit`
                }, {
                  title: 'Job Title',
                  response: Observable.of(employment.title),
                  returnLink: `${this.baseUrl}/income/previous-employment/${i}/title/edit`
                }, {
                  title: 'Employer Address',
                  response: Observable.of(employment.location),
                  type: 'propertyLocation',
                  returnLink: `${this.baseUrl}/income/previous-employment/${i}/company-location/edit`
                }, {
                  title: 'Start Date',
                  response: Observable.of(employment.dates.startDate),
                  returnLink: `${this.baseUrl}/income/previous-employment/${i}/dates/edit`
                }, {
                  title: 'End Date',
                  response: Observable.of(employment.dates.endDate),
                  returnLink: `${this.baseUrl}/income/previous-employment/${i}/dates/edit`
                }]
              });
            });
          }
        });
    });

    this.store.dispatch(new TempEmploymentClearAction());
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<IncomeState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);

    this.form = formBuilder.group({
      noPrevEmployment: [null, Validators.requiredTrue],
      hasPrevEmployments: [null, Validators.requiredTrue]
    });
  }

}
