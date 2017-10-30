import { State } from './index.reducer';
import * as reducer from './index.reducer';
import * as fromGifts from './gifts/gifts.reducer';
import * as fromTempGift from './temp-gift/temp-gift.reducer';
import * as fromAccounts from './accounts/accounts.reducer';
import * as fromTempAccount from './temp-account/temp-account.reducer';

describe('Index Assets Reducer', () => {
  let stateData: State;
  beforeEach(() => {
    stateData = {
      assets: {
        gifts: [{
          who: 'Calvin Cox',
          relationship: 'friend',
          amount: 10000
        }],
        accounts: [{
          bankName: 'Regions',
          type: 'checking',
          balance: 10000
        }],
        tempGift: {
          who: 'Temp Who',
          relationship: 'Temp Relationship',
          amount: 1
        },
        tempAccount: {
          bankName: 'temp name',
          type: 'temp type',
          balance: 2
        }
      }
    };
  });

  it('should export a reducers object of all the reducer function', () => {
    expect(reducer.reducers).toEqual({
      gifts: fromGifts.reducer,
      accounts: fromAccounts.reducer,
      tempGift: fromTempGift.reducer,
      tempAccount: fromTempAccount.reducer
    });
  });

  it('should export a getAssetsState', () => {
    expect(reducer.getAssetsState).toEqual(jasmine.any(Function));
    const result = reducer.getAssetsState(stateData);
    expect(result).toEqual(stateData.assets);
  });

  it('should export a getAccountsState', () => {
    expect(reducer.getAccountsState).toEqual(jasmine.any(Function));
    const result = reducer.getAccountsState(stateData);
    expect(result).toEqual(stateData.assets.accounts);
  });

  it('should export a getGiftsState', () => {
    expect(reducer.getGiftsState).toEqual(jasmine.any(Function));
    const result = reducer.getGiftsState(stateData);
    expect(result).toEqual(stateData.assets.gifts);
  });
});
