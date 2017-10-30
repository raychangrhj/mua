import * as TempAccountsActions from '../../actions/temp-accounts/temp-accounts.action';
import {
  initialAccountStateObject,
  AccountStateObject
} from '../accounts/accounts.reducer';

export type Action = TempAccountsActions.ALL;

export function reducer(state: AccountStateObject = initialAccountStateObject, action: Action) {
  switch (action.type) {
    case TempAccountsActions.UPDATE_BANK_NAME: {
      const payload = (action as TempAccountsActions.TempAccountBankNameUpdateAction).payload;
      return Object.assign({}, state, {
        bankName: payload
      });
    }

    case TempAccountsActions.UPDATE_TYPE: {
      const payload = (action as TempAccountsActions.TempAccountUpdateTypeUpdateAction).payload;
      return Object.assign({}, state, {
        type: payload
      });
    }

    case TempAccountsActions.UPDATE_BALANCE: {
      const payload = (action as TempAccountsActions.TempAccountUpdateBalanceUpdateAction).payload;
      return Object.assign({}, state, {
        balance: payload
      });
    }

    case TempAccountsActions.CLEAR: {
      return initialAccountStateObject;
    }

    default: {
      return state;
    }
  }
}

export const getTempBankName = (state: AccountStateObject) => state && state.bankName;
export const getTempType = (state: AccountStateObject) => state && state.type;
export const getTempBalance = (state: AccountStateObject) => state && state.balance;
