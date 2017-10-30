import * as TempEmploymentActions from '../../actions/temp-employment/temp-employment.action';
import {
  EmploymentStateObject,
  initialEmploymentStateObject
} from '../employment/employement.reducer';

export type Action = TempEmploymentActions.ALL;

export interface EmploymentDatesState {
  startDate: string;
  endDate: string;
}

export interface EmploymentLocationState {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}

export function reducer(state: EmploymentStateObject = initialEmploymentStateObject, action: Action) {
  switch (action.type) {
    case TempEmploymentActions.UPDATE_NAME: {
      const payload = (action as TempEmploymentActions.TempEmploymentCompanyNameUpdateAction).payload;
      return Object.assign({}, state, {
        companyName: payload
      });
    }

    case TempEmploymentActions.UPDATE_TITLE: {
      const payload = (action as TempEmploymentActions.TempEmploymentJobTitleUpdateAction).payload;
      return Object.assign({}, state, {
        title: payload
      });
    }

    case TempEmploymentActions.UPDATE_LOCATION: {
      const payload = (action as TempEmploymentActions.TempEmploymentLocationUpdateAction).payload;
      return Object.assign({}, state, {
        location: payload
      });
    }

    case TempEmploymentActions.UPDATE_INCOME: {
      const payload = (action as TempEmploymentActions.TempEmploymentIncomeUpdateAction).payload;
      return Object.assign({}, state, {
        income: payload
      });
    }

    case TempEmploymentActions.UPDATE_DATES: {
      const payload = (action as TempEmploymentActions.TempEmploymentDatesUpdateAction).payload;
      return Object.assign({}, state, {
        dates: payload
      });
    }

    case TempEmploymentActions.UPDATE_PRIMARY_JOB: {
      const payload = (action as TempEmploymentActions.TempEmploymentPrimaryJobUpdateAction).payload;
      return Object.assign({}, state, {
        isPrimary: payload
      });
    }

    case TempEmploymentActions.CLEAR: {
      return initialEmploymentStateObject;
    }

    default: {
      return state;
    }
  }
}

export const getTempCompanyName = (state: EmploymentStateObject) => state && state.companyName;
export const getTempCompanyLocation = (state: EmploymentStateObject) => state && state.location;
export const getTempJobIncome = (state: EmploymentStateObject) => state && state.income;
export const getTempJobTitle = (state: EmploymentStateObject) => state && state.title;
export const getTempJobDates = (state: EmploymentStateObject) => state && state.dates;
