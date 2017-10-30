import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromIntent from '../reducers/intent/intent.reducer';
import * as fromOwe from '../reducers/owed/owed.reducer';
import * as fromPayment from '../reducers/payments/payment.reducer';
import * as fromAppraisal from '../reducers/appraisal/appraisal.reducer';
import * as fromLoanAmount from '../reducers/loan-amount/loan-amount.reducer';

export interface RefinanceState {
  intent: string;
  owe: number;
  payment: number;
  appraisal: number;
  loanAmount: number;
}

export interface State {
  refinance: RefinanceState;
}

export const reducers = {
  intent: fromIntent.reducer,
  owe: fromOwe.reducer,
  payment: fromPayment.reducer,
  appraisal: fromAppraisal.reducer,
  loanAmount: fromLoanAmount.reducer,
};

export const getRefinanceState = createFeatureSelector<RefinanceState>('refinance');

export const getRefinanceIntentState = createSelector(
  getRefinanceState,
  (state: RefinanceState) => state && state.intent
);
export const getRefinanceOweState = createSelector(
  getRefinanceState,
  (state: RefinanceState) => state && state.owe
);
export const getRefinancePaymentState = createSelector(
  getRefinanceState,
  (state: RefinanceState) => state && state.payment
);
export const getRefinanceAppraisalState = createSelector(
  getRefinanceState,
  (state: RefinanceState) => state && state.appraisal
);
export const getRefinanceLoanAmountState = createSelector(
  getRefinanceState,
  (state: RefinanceState) => state && state.loanAmount
);
