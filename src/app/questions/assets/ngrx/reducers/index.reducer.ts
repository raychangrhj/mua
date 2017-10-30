import {
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromAccounts from './accounts/accounts.reducer';
import * as fromTempAccount from './temp-account/temp-account.reducer';
import * as fromGifts from './gifts/gifts.reducer';
import * as fromReset from '../actions/reset/reset.action';
import * as fromTempGift from './temp-gift/temp-gift.reducer';
import {
  getTempBalance,
  getTempBankName,
  getTempType
} from './temp-account/temp-account.reducer';
import {
  getTempAmount,
  getTempRelationship,
  getTempWho
} from './temp-gift/temp-gift.reducer';

export interface State {
  assets: AssetsState;
}

export interface AssetsState {
  gifts: Array<fromGifts.GiftStateObject>;
  tempGift: fromGifts.GiftStateObject;
  accounts: Array<fromAccounts.AccountStateObject>;
  tempAccount: fromAccounts.AccountStateObject;
}

export const reducers = {
  gifts: fromGifts.reducer,
  tempGift: fromTempGift.reducer,
  accounts: fromAccounts.reducer,
  tempAccount: fromTempAccount.reducer
};

export const initialAssetsState: AssetsState = {
  gifts: [],
  accounts: [],
  tempGift: fromGifts.initialGiftStateObject,
  tempAccount: fromAccounts.initialAccountStateObject
};

export function assetsReducer(state: AssetsState = initialAssetsState, action: any) {
  switch (action.type) {
    case fromReset.RESET: {
      return initialAssetsState;
    }

    case fromReset.SET: {
      return (action as fromReset.AssetsSetAction).payload;
    }

    default: {
      return combineReducers(reducers)(state, action);
    }
  }
}

export const getAssetsState = createFeatureSelector<AssetsState>('assets');

// Accounts
export const getAccountsState = createSelector(
  getAssetsState,
  (state: AssetsState) => state && state.accounts
);

// Gifts
export const getGiftsState = createSelector(
  getAssetsState,
  (state: AssetsState) => state && state.gifts
);

// Temp Accounts
export const getTempAccountsState = createSelector(
  getAssetsState,
  (state: AssetsState) => state && state.tempAccount
);
export const getTempAccountsBankNameState = createSelector(
  getTempAccountsState,
  getTempBankName
);
export const getTempAccountsBalanceState = createSelector(
  getTempAccountsState,
  getTempBalance
);
export const getTempAccountsTypeState = createSelector(
  getTempAccountsState,
  getTempType
);

// Temp Gifts
export const getTempGiftState = createSelector(
  getAssetsState,
  (state: AssetsState) => state && state.tempGift
);
export const getTempGiftWhoState = createSelector(
  getTempGiftState,
  getTempWho
);
export const getTempGiftRelationshipState = createSelector(
  getTempGiftState,
  getTempRelationship
);
export const getTempGiftAmountState = createSelector(
  getTempGiftState,
  getTempAmount
);
