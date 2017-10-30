import * as OtherIncomeActions from '../../actions/other/other.action';

export type Action = OtherIncomeActions.ALL;

export interface OtherIncomeStateObject {
  id?: number;
  type?: OtherIncomeTypeState;
  monthly?: number;
  rentalLocation?: OtherIncomeRentalLocationState
}

export interface OtherIncomeTypeState {
  option: string;
  explain?: string;
}

export const initialOtherIncomeTypeState: OtherIncomeTypeState = {
  option: null,
  explain: null
};

export interface OtherIncomeRentalLocationState {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}

export const initialOtherIncomeRentalLocationState: OtherIncomeRentalLocationState = {
  street: null,
  unit: null,
  city: null,
  state: null,
  zip: null
};

export const initialOtherIncomeStateObject: OtherIncomeStateObject = {
  type: initialOtherIncomeTypeState,
  monthly: null,
  rentalLocation: initialOtherIncomeRentalLocationState
};

export function reducer(state: OtherIncomeStateObject[] = [], action: Action) {
  switch (action.type) {
    case OtherIncomeActions.ADD: {
      return [
        (action as OtherIncomeActions.OtherIncomeAddAction).payload,
        ...state
      ];
    }

    case OtherIncomeActions.DELETE: {
      const payload = (action as OtherIncomeActions.OtherIncomeDeleteAction).payload;
      const index = state.findIndex(item => Object.is(item, payload));
      return index > -1
        ? [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
        : state;
    }

    case OtherIncomeActions.UPDATE: {
      const payload = (action as OtherIncomeActions.OtherIncomeUpdateAction).payload;
      const otherIncome = (action as OtherIncomeActions.OtherIncomeUpdateAction).otherIncome;
      const index = state.findIndex(item => Object.is(item, otherIncome));
      return index > -1
        ? [
          ...state.slice(0, index),
          payload,
          ...state.slice(index + 1)
        ]
        : state;
    }

    default: {
      return state;
    }
  }
}
