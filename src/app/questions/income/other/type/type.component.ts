import {
  Component,
  OnInit
} from '@angular/core';
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

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getTempOtherIncomesState,
  IncomeState
} from '../../ngrx/reducers/index.reducer';
import { TempOtherIncomeTypeUpdateAction } from '../../ngrx/actions/temp-other/temp-other.action';
import {
  OtherIncomeStateObject,
  OtherIncomeTypeState
} from '../../ngrx/reducers/other/other.reducer';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import {incomeTypes} from '../../../../shared/select-definitions';

@Component({
  selector: 'regions-other-income-type',
  templateUrl: './type.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './type.component.scss']
})
export class QuestionsIncomeOtherIncomeTypeComponent extends QuestionsBaseComponent implements OnInit {

  private tempOtherIncome: OtherIncomeStateObject;

  public currentOtherIncome: OtherIncomeStateObject;
  public baseUrl: string;
  public incomeTypes: {} = incomeTypes;

  public onChangeOfIncomeType() {
    if (this.form.controls['option'].value === 'other') {
      this.form.controls['explain'].setValidators(Validators.required);
    } else {
      this.form.controls['explain'].setValidators(null);
    }
    this.form.controls['explain'].updateValueAndValidity();
  }

  public ngOnInit() {
    super.ngOnInit();

    const currentOtherIncome$: Observable<OtherIncomeStateObject> = this.activatedRoute.data.map((data => data.currentOtherIncome)).take(1);
    const tempMonthlyIncome$: Observable<OtherIncomeStateObject> = this.store.select(getTempOtherIncomesState).take(1);

    Observable.forkJoin(currentOtherIncome$, tempMonthlyIncome$)
      .take(1)
      .subscribe((resolves: [OtherIncomeStateObject, OtherIncomeTypeState]) => {
        if (resolves[0]) {
          this.currentOtherIncome = resolves[0];
          this.form.controls['option'].setValue(resolves[0].type.option || null);
          this.form.controls['explain'].setValue(resolves[0].type.explain || null);
        } else {
          this.tempOtherIncome = resolves[1];
          this.form.controls['option'].setValue(resolves[1].option || null);
          this.form.controls['explain'].setValue(resolves[1].explain || null);
        }
        this.onChangeOfIncomeType();
      });

    this.activatedRoute.data.map(obj => obj.sectionId).take(1).subscribe((sectionId: number) => {
      this.baseUrl = sectionId === 30 ? '' : '/co-borrower';
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
      const isRental = this.form.controls['option'].value === 'rental';
      if (this.currentOtherIncome) {
        this.store.dispatch(new OtherIncomeUpdateAction(
          this.currentOtherIncome,
          Object.assign({},
            this.currentOtherIncome,
            {
              type: this.form.value
            },
            isRental ? {} : {
              rentalLocation: {
                street: null,
                unit: null,
                city: null,
                state: null,
                zip: null
              }
            }
          )
        ));
        if (isRental) {
          this.saveAction = null;
          this.router.navigate(['../../../../../rental-location/edit'], {
            relativeTo: this.activatedRoute
          })
        }
      } else {
        this.store.dispatch(isRental
          ? new TempOtherIncomeTypeUpdateAction(this.form.value)
          : new OtherIncomeAddAction(
            Object.assign({},
              this.tempOtherIncome,
              {
                type: this.form.value
              }
            )
          )
        );
        this.router.navigate([isRental
          ? `${this.baseUrl}/income/other-income/rental-location`
          : `${this.baseUrl}/income/other-income`
        ]);
      }
    };
    this.form = formBuilder.group({
      option: [null, Validators.required],
      explain: []
    });
  }

}
