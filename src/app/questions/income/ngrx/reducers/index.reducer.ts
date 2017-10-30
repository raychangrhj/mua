import {
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromOtherIncome from './other/other.reducer';
import * as fromReset from '../actions/reset/reset.action';
import * as fromTempOtherIncome from './temp-other/temp-other.reducer';
import * as fromEmploymentIncome from './employment/employement.reducer';
import * as fromTempEmploymentIncome from './temp-employment/temp-employement.reducer';
import {
  getTempCompanyLocation,
  getTempCompanyName,
  getTempJobDates,
  getTempJobIncome,
  getTempJobTitle
} from './temp-employment/temp-employement.reducer';
import {
  getTempIncome,
  getTempRentalLocation,
  getTempType
} from './temp-other/temp-other.reducer';

export interface State {
  income: IncomeState;
}

export interface IncomeState {
  other: Array<fromOtherIncome.OtherIncomeStateObject>;
  employment: Array<fromEmploymentIncome.EmploymentStateObject>;
  tempOther: fromOtherIncome.OtherIncomeStateObject;
  tempEmployment: fromEmploymentIncome.EmploymentStateObject;
}

export const reducers = {
  other: fromOtherIncome.reducer,
  employment: fromEmploymentIncome.reducer,
  tempOther: fromTempOtherIncome.reducer,
  tempEmployment: fromTempEmploymentIncome.reducer
};

export const initialIncomeState: IncomeState = {
  other: [],
  employment: [],
  tempOther: fromOtherIncome.initialOtherIncomeStateObject,
  tempEmployment: fromEmploymentIncome.initialEmploymentStateObject
};

export function incomeReducer(state: IncomeState = initialIncomeState, action: fromReset.ALL) {
  switch (action.type) {
    case fromReset.RESET: {
      return initialIncomeState
    }
    case fromReset.SET: {
      return (action as fromReset.IncomeSetAction).payload
    }
    default: {
      return combineReducers(reducers)(state, action);
    }
  }
}

export const getIncomeState = createFeatureSelector<IncomeState>('income');

// Other Income
export const getOtherIncomesState = createSelector(
  getIncomeState,
  (state: IncomeState) => state && state.other
);

// Current Employment
export const getCurrentEmploymentState = createSelector(
  getIncomeState,
  (state: IncomeState) => state && state.employment.filter(employment => employment.dates && employment.dates.endDate === 'current')
);

// Previous Employment
export const getPrevEmploymentState = createSelector(
  getIncomeState,
  (state: IncomeState) => state && state.employment.filter(employment => employment.dates && employment.dates.endDate !== 'current')
);

// Needs Previous Employment
export const getNeedsPrevEmploymentState = createSelector(
  getIncomeState,
  (state: IncomeState) => {
    const twoYearsAgo = new Date(Date.now());
    twoYearsAgo.setDate(twoYearsAgo.getDate() - 730);

    return state && !state.employment
      .filter(employment => employment.dates && employment.dates.endDate === 'current')
      .some(employment =>
        new Date(`${employment.dates.startDate.split('/')[0]}/01/${employment.dates.startDate.split('/')[1]}`) < twoYearsAgo);
  }
);

// Temp Other Income
export const getTempOtherIncomesState = createSelector(
  getIncomeState,
  (state: IncomeState) => state && state.tempOther
);
export const getTempOtherIncomeTypeState = createSelector(
  getTempOtherIncomesState,
  getTempType
);
export const getTempOtherIncomeRentalLocationState = createSelector(
  getTempOtherIncomesState,
  getTempRentalLocation
);
export const getTempOtherIncomeMonthlyIncomeState = createSelector(
  getTempOtherIncomesState,
  getTempIncome
);

// Temp Employment
export const getTempEmploymentState = createSelector(
  getIncomeState,
  (state: IncomeState) => state && state.tempEmployment
);
export const getTempCompanyNameState = createSelector(
  getTempEmploymentState,
  getTempCompanyName
);
export const getTempCompanyLocationState = createSelector(
  getTempEmploymentState,
  getTempCompanyLocation
);
export const getTempJobIncomeState = createSelector(
  getTempEmploymentState,
  getTempJobIncome
);
export const getTempJobTitleState = createSelector(
  getTempEmploymentState,
  getTempJobTitle
);
export const getTempJobDatesState = createSelector(
  getTempEmploymentState,
  getTempJobDates
);
