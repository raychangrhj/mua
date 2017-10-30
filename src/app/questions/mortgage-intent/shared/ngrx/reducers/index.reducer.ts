import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromPrimaryResidence from './primary-residence/primary-residence.reducer';
import * as fromPrimaryUse from './primary-use/primary-use.reducer';
import * as fromPropertyLocation from './property-location/property-location.reducer';
import * as fromMortgageType from './mortgage-type/mortgage-type.reducer';
import * as fromCost from './cost/cost.reducer';
import * as fromDownPayment from './down-payment/down-payment.reducer';

export interface MortgageIntentState {
  propertyLocation: fromPropertyLocation.PropertyLocationState;
  primaryUse: string;
  primaryResidence: boolean;
  mortgageType: string;
  cost: number;
  downPayment: number;
}

export interface State {
  mortgageIntent: MortgageIntentState;
}

export const reducers = {
  propertyLocation: fromPropertyLocation.reducer,
  primaryUse: fromPrimaryUse.reducer,
  primaryResidence: fromPrimaryResidence.reducer,
  mortgageType: fromMortgageType.reducer,
  cost: fromCost.reducer,
  downPayment: fromDownPayment.reducer,
};

export const getMortgageIntentState = createFeatureSelector<MortgageIntentState>('mortgageIntent');

export const getMortgagePropertyLocationState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.propertyLocation
);
export const getMortgagePrimaryUseState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.primaryUse
);
export const getMortgagePrimaryResidenceState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.primaryResidence
);
export const getMortgageTypeState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.mortgageType
);
export const getMortgageIntendedUseState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => {
    if (state && state.primaryResidence) {
      return 'Primary Residence';
    }
    if (state && state.primaryUse === 'second-home') {
      return '2nd Home/Vacation';
    }
    if (state && state.primaryUse === 'investment') {
      return 'Investment/Rental';
    }
    return null;
  }
);
export const getMortgageCostState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.cost
);
export const getMortgageDownPaymentState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && state.downPayment
);
export const getMortgageLoanAmountState = createSelector(
  getMortgageIntentState,
  (state: MortgageIntentState) => state && (state.cost - state.downPayment)
);
