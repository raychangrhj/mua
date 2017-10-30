import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';

import { PropertyLocationState } from '../ngrx/reducers/property-location/property-location.reducer';
import {
  getMortgageIntentState,
  MortgageIntentState,
  State as MortgageIntentFeatureState
} from '../ngrx/reducers/index.reducer';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { getMortgagePropertyLocationState } from '../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-confirm-loan-amount',
  templateUrl: './confirm-loan-amount.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './confirm-loan-amount.component.scss']
})
export class QuestionsMortgageIntentConfirmLoanAmountComponent extends QuestionsBaseComponent implements OnInit {

  public downPayment: number;
  public cost: number;
  public loanAmount: number;
  public propertyLocation: PropertyLocationState;
  public mortgageType: string;

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getMortgagePropertyLocationState)
      .take(1)
      .subscribe((propertyLocation: PropertyLocationState) => {
        this.propertyLocation = propertyLocation;
      });

    this.store.select(getMortgageIntentState)
      .take(1)
      .subscribe((mortgageIntentState: MortgageIntentState) => {
        this.mortgageType = mortgageIntentState.mortgageType;
        this.downPayment = mortgageIntentState.downPayment;
        this.cost = mortgageIntentState.cost;
        this.loanAmount = this.cost - this.downPayment;
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<MortgageIntentFeatureState>
  ) {
    super(router, activatedRoute, store);
  }

}
