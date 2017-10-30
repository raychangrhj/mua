import {
  Component,
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
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getTempOtherIncomesState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import { OtherIncomeStateObject } from '../../ngrx/reducers/other/other.reducer';
import { ActionBtnGroupLinkOptions } from '../../../../../models/action-btn-group-link-options';
import { validMoneyRegex } from '../../../../shared/form-validators';

@Component({
  selector: 'regions-other-income',
  templateUrl: './income-amount.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './income-amount.component.scss']
})
export class QuestionsIncomeOtherIncomeAmountComponent extends QuestionsBaseComponent implements OnInit {

  public currentOtherIncome: OtherIncomeStateObject;
  public tempOtherIncome: OtherIncomeStateObject;
  public actionBtnLinkOptions: ActionBtnGroupLinkOptions;

  public ngOnInit() {
    super.ngOnInit();

    this.actionBtnLinkOptions$.subscribe((data: ActionBtnGroupLinkOptions) => {
      this.actionBtnLinkOptions = data;
    });

    const currentOtherIncome$ = this.activatedRoute.data.map((data => data.currentOtherIncome)).take(1);
    const tempMonthlyIncome$ = this.store.select(getTempOtherIncomesState).take(1);

    Observable.forkJoin(currentOtherIncome$, tempMonthlyIncome$)
      .take(1)
      .subscribe((resolves: [OtherIncomeStateObject, OtherIncomeStateObject]) => {
        if (resolves[0]) {
          this.currentOtherIncome = resolves[0];
          this.form.controls['monthly'].setValue(resolves[0].monthly);
        } else {
          this.tempOtherIncome = resolves[1];
          this.form.controls['monthly'].setValue(resolves[1].monthly);
          this.actionBtnLinkOptionsSubject$.next({
            back: {
              link: {
                routerLink: this.tempOtherIncome.type.option === 'rental'
                  ? '/income/other-income/rental-location'
                  : '/income/other-income/type'
              }
            },
            next: true,
            saveAndExit: true
          });
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
      if (this.currentOtherIncome) {
        this.store.dispatch(new OtherIncomeUpdateAction(
          this.currentOtherIncome,
          Object.assign({},
            this.currentOtherIncome,
            {
              monthly: this.form.value.monthly && this.form.value.monthly.replace
                ? parseInt(this.form.value.monthly.replace('$', '').replace(',', ''), 10)
                : this.form.value.monthly
            }
          )
        ))
      } else {
        this.store.dispatch(new OtherIncomeAddAction(
          Object.assign(this.tempOtherIncome, {
            monthly: this.form.value.monthly && this.form.value.monthly.replace
              ? parseInt(this.form.value.monthly.replace('$', '').replace(',', ''), 10)
              : this.form.value.monthly
          })
        ));
      }
    };
    this.form = this.formBuilder.group({
      monthly: [null, [Validators.required, Validators.pattern(validMoneyRegex)]]
    });
  }

}
