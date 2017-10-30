import * as TempOtherIncomeActions from '../../actions/temp-other/temp-other.action';
import {
  initialOtherIncomeStateObject,
  OtherIncomeStateObject
} from '../other/other.reducer';

export type Action = TempOtherIncomeActions.ALL;

export function reducer(state: OtherIncomeStateObject = initialOtherIncomeStateObject, action: Action) {
  switch (action.type) {
    case TempOtherIncomeActions.UPDATE_MONTHLY: {
      const payload = (action as TempOtherIncomeActions.TempOtherIncomeMonthlyUpdateAction).payload;
      return Object.assign({}, state, {
        monthly: payload
      });
    }

    case TempOtherIncomeActions.UPDATE_RENTAL_LOCATION: {
      const payload = (action as TempOtherIncomeActions.TempOtherIncomeRentalLocationUpdateAction).payload;
      return Object.assign({}, state, {
        rentalLocation: payload
      });
    }

    case TempOtherIncomeActions.UPDATE_TYPE: {
      const payload = (action as TempOtherIncomeActions.TempOtherIncomeTypeUpdateAction).payload;
      return Object.assign({}, state, {
        type: payload
      });
    }

    case TempOtherIncomeActions.CLEAR: {
      return initialOtherIncomeStateObject;
    }

    default: {
      return state;
    }
  }
}

export const getTempType = (state: OtherIncomeStateObject) => state && state.type;
export const getTempRentalLocation = (state: OtherIncomeStateObject) => state && state.rentalLocation;
export const getTempIncome = (state: OtherIncomeStateObject) => state && state.monthly;
