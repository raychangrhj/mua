import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/observable/of';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import {
  getCurrentEmploymentState,
  getNeedsPrevEmploymentState,
  IncomeState
} from '../ngrx/reducers/index.reducer';
import {
  TempEmploymentClearAction,
  TempEmploymentDatesUpdateAction,
  TempEmploymentPrimaryJobUpdateAction
} from '../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../ngrx/reducers/employment/employement.reducer';
import { EmploymentDeleteAction } from '../ngrx/actions/employment/employment.action';
import { getMortgageTypeState } from '../../mortgage-intent/shared/ngrx/reducers/index.reducer';
import { ActionBtnGroupLinkOptions } from '../../../../models/action-btn-group-link-options';

@Component({
  selector: 'regions-current-employment',
  templateUrl: './current-employment.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './current-employment.component.scss']
})
export class QuestionsIncomeCurrentEmploymentComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private employments: EmploymentStateObject[];
  private employmentsStateObject$: Subscription;
  private needsPrevEmployment: boolean;
  private needsPrevEmployment$: Subscription;
  private isPrimaryJob = true;
  private sectionId: number;

  public displayEmployments: any[];
  public baseUrl: string;

  public addCurrentEmployment() {
    if (this.isPrimaryJob) {
      this.store.dispatch(new TempEmploymentPrimaryJobUpdateAction(this.isPrimaryJob));
    }
    this.store.dispatch(new TempEmploymentDatesUpdateAction({
      startDate: null,
      endDate: 'current'
    }));
  }

  public removeEmployment(i: number) {
    this.store.dispatch(new EmploymentDeleteAction(this.employments[i]));
  }

  public ngOnDestroy() {
    this.employmentsStateObject$.unsubscribe();
    this.needsPrevEmployment$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.needsPrevEmployment$ = this.store.select(getNeedsPrevEmploymentState)
      .subscribe((needsPrevEmployment: boolean) => this.needsPrevEmployment = needsPrevEmployment);

    const sectionId$: Observable<number> = this.activatedRoute.data.map(obj => obj.sectionId).take(1);
    const mortgageType$: Observable<string> = this.store.select(getMortgageTypeState).take(1);
    Observable.forkJoin(sectionId$, mortgageType$)
      .take(1)
      .subscribe((resolves: [number, string]) => {
        const isBorrower = resolves[0] === 30;
        this.sectionId = resolves[0];
        this.baseUrl = isBorrower ? '' : '/co-borrower';

        this.employmentsStateObject$ = this.store.select(getCurrentEmploymentState)
          .subscribe((employments: EmploymentStateObject[]) => {
            if (Array.isArray(employments)) {
              this.employments = employments;
              this.displayEmployments = [];

              if (employments.length) {
                this.form.controls['hasEmployments'].enable();
                this.form.controls['hasEmployments'].setValue(true);

                this.form.controls['notEmployed'].disable();
              } else {
                this.form.controls['hasEmployments'].setValue(false);
                this.form.controls['hasEmployments'].disable();

                this.form.controls['notEmployed'].enable();
              }

              employments.forEach((employment: EmploymentStateObject, i: number) => {
                this.displayEmployments.push({
                  title: employment.companyName,
                  answers: [{
                    title: 'Company Name',
                    response: Observable.of(employment.companyName),
                    returnLink: `${this.baseUrl}/income/employment/${i}/company-name/edit`
                  }, {
                    title: 'Job Title',
                    response: Observable.of(employment.title),
                    returnLink: `${this.baseUrl}/income/employment/${i}/title/edit`
                  }, {
                    title: 'Employer Address',
                    response: Observable.of(employment.location),
                    type: 'propertyLocation',
                    returnLink: `${this.baseUrl}/income/employment/${i}/company-location/edit`
                  }, {
                    title: 'Start Date',
                    response: Observable.of(employment.dates.startDate),
                    returnLink: `${this.baseUrl}/income/employment/${i}/dates/edit`
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
    this.onSubmitMethod = () => {
      this.router.navigate([
        this.needsPrevEmployment ? `${this.baseUrl}/income/previous-employment` : `${this.baseUrl}/income/other-income`
      ]);
    };
    this.form = formBuilder.group({
      notEmployed: [null, Validators.requiredTrue],
      hasEmployments: [null, Validators.requiredTrue]
    });
  }

}
