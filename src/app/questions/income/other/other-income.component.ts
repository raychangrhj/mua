import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  getNeedsPrevEmploymentState,
  getOtherIncomesState,
  IncomeState
} from '../ngrx/reducers/index.reducer';
import { OtherIncomeStateObject } from '../ngrx/reducers/other/other.reducer';
import { OtherIncomeDeleteAction } from '../ngrx/actions/other/other.action';
import { TempOtherIncomeClearAction } from '../ngrx/actions/temp-other/temp-other.action';
import { ActionBtnGroupLinkOptions } from '../../../../models/action-btn-group-link-options';
import { NavigationCompleteSectionAction } from '../../shared/ngrx/actions/navigation.action';

@Component({
  selector: 'regions-other-income',
  templateUrl: './other-income.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './other-income.component.scss']
})
export class QuestionsIncomeOtherIncomeComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private incomes: OtherIncomeStateObject[];
  private incomeStateObjects$: Subscription;
  private sectionId: number;

  public displayOtherIncomes: any[];
  public baseUrl: string;

  public removeIncome(i: number) {
    this.store.dispatch(new OtherIncomeDeleteAction(this.incomes[i]));
  }

  public ngOnDestroy() {
    this.incomeStateObjects$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.data.map(obj => obj.sectionId)
      .take(1)
      .subscribe((sectionId: number) => {
        this.sectionId = sectionId;
        this.baseUrl = sectionId === 30 ? '' : '/co-borrower';

        this.incomeStateObjects$ = this.store.select(getOtherIncomesState)
          .subscribe((incomes: OtherIncomeStateObject[]) => {
            if (Array.isArray(incomes)) {
              this.incomes = incomes;
              this.displayOtherIncomes = [];

              if (incomes.length) {
                this.form.controls['hasIncomes'].enable();
                this.form.controls['hasIncomes'].setValue(true);

                this.form.controls['noOtherIncome'].disable();
              } else {
                this.form.controls['hasIncomes'].setValue(false);
                this.form.controls['hasIncomes'].disable();

                this.form.controls['noOtherIncome'].enable();
              }

              incomes.forEach((income: OtherIncomeStateObject, i: number) => {
                let title: string;
                switch (income.type && income.type.option) {
                  case 'pension':
                    title = 'Pension/Retirement';
                    break;
                  case 'alimony':
                    title = 'Alimony/Child Support';
                    break;
                  case 'social-security':
                    title = 'Social Security/Disability';
                    break;
                  case 'rental':
                    title = 'Rental Property';
                    break;
                  default:
                    title = `Other: ${income.type.explain}`;
                    break;
                }

                const isRentalIncome = income.type && income.type.option === 'rental';
                const answers: any[] = [{
                  title: 'Income Type',
                  response: Observable.of(title),
                  type: 'otherIncome',
                  returnLink: `${this.baseUrl}/income/other-income/${i}/type/edit`
                }];

                if (isRentalIncome) {
                  answers.splice(1, 0, {
                    title: 'Rental Location',
                    response: Observable.of(income.rentalLocation),
                    type: 'propertyLocation',
                    returnLink: `${this.baseUrl}/income/other-income/${i}/rental-location/edit`
                  });
                }

                this.displayOtherIncomes.push({
                  title,
                  answers
                });
              });
            }
          });
      });

    this.store.dispatch(new TempOtherIncomeClearAction());
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<IncomeState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new NavigationCompleteSectionAction(this.sectionId));
    };
    this.form = formBuilder.group({
      noOtherIncome: [null, Validators.requiredTrue],
      hasIncomes: [null, Validators.requiredTrue]
    });
  }

}
