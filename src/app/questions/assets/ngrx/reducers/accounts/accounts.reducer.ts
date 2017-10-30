import * as AccountActions from '../../actions/acounts/acounts.action';

export type Action = AccountActions.ALL;

export interface AccountStateObject {
  id?: number;
  bankName?: string;
  type?: string;
  balance?: number;
}

export const initialAccountStateObject: AccountStateObject = {
  bankName: null,
  type: null,
  balance: null
};

export function reducer(state: AccountStateObject[] = [], action: Action) {
  switch (action.type) {
    case AccountActions.ADD: {
      return [
        (action as AccountActions.AccountAddAction).payload,
        ...state,
      ];
    }

    case AccountActions.DELETE: {
      const payload = (action as AccountActions.AccountDeleteAction).payload;
      const index = state.findIndex(item => Object.is(item, payload));
      return index > -1
        ? [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
        : state;
    }

    case AccountActions.UPDATE: {
      const payload = (action as AccountActions.AccountUpdateAction).payload;
      const account = (action as AccountActions.AccountUpdateAction).account;
      const index = state.findIndex(item => Object.is(item, account));
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
