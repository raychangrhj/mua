import * as EmploymentActions from '../../actions/employment/employment.action';
import {
  EmploymentDatesState,
  EmploymentLocationState
} from '../temp-employment/temp-employement.reducer';

export type Action = EmploymentActions.ALL;

export interface EmploymentStateObject {
  id?: number;
  companyName?: string;
  title?: string;
  location?: EmploymentLocationState;
  income?: number;
  dates?: EmploymentDatesState;
  isPrimary?: boolean;
}

export const initialEmploymentStateObject: EmploymentStateObject = {
  companyName: null,
  title: null,
  location: {
    street: null,
    unit: null,
    city: null,
    state: null,
    zip: null
  },
  income: null,
  dates: {
    startDate: null,
    endDate: null
  },
  isPrimary: null
};

export function reducer(state: EmploymentStateObject[] = [], action: Action) {
  switch (action.type) {
    case EmploymentActions.ADD: {
      return [
        (action as EmploymentActions.EmploymentAddAction).payload,
        ...state,
      ];
    }

    case EmploymentActions.DELETE: {
      const payload = (action as EmploymentActions.EmploymentDeleteAction).payload;
      const index = state.findIndex(item => Object.is(item, payload));
      return index > -1
        ? [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
        : state;
    }

    case EmploymentActions.UPDATE: {
      const payload = (action as EmploymentActions.EmploymentUpdateAction).payload;
      const employment = (action as EmploymentActions.EmploymentUpdateAction).employment;
      const index = state.findIndex(item => Object.is(item, employment));
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
