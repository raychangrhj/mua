import * as reducer from './temp-account.reducer';
import * as actions from '../../actions/temp-accounts/temp-accounts.action';
import { Test } from '../../../../../../test/test.action';
import {
  initialAccountStateObject,
  AccountStateObject
} from '../accounts/accounts.reducer';

describe('Temp Other Income Reducer', () => {
  let stateData: AccountStateObject;
  beforeEach(() => {
    stateData = {
      bankName: 'bankName',
      type: 'type',
      balance: 10000
    };
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  it('should return the initial state if the action.type is not caught', () => {
    const result = reducer.reducer(stateData, new Test());
    expect(result).toEqual(stateData);
  });

  describe('reducer function', () => {
    describe('with UPDATE_BANK_NAME action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'new-bank-name';
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempAccountBankNameUpdateAction(payload));
      });

      it('should add the bank name payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          bankName: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_TYPE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'new-type';
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempAccountUpdateTypeUpdateAction(payload));
      });

      it('should add the type payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          type: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_BALANCE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 20000;
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempAccountUpdateBalanceUpdateAction(payload));
      });

      it('should add the type payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          balance: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with CLEAR action type', () => {
      let result;
      let initState;
      beforeEach(() => {
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempAccountClearAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(initialAccountStateObject);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });
  });

  it('should export a getter for the bank name', () => {
    expect(reducer.getTempBankName).toEqual(jasmine.any(Function));
    expect(reducer.getTempBankName(stateData)).toEqual(stateData.bankName);
  });

  it('should export a getter for the type', () => {
    expect(reducer.getTempType).toEqual(jasmine.any(Function));
    expect(reducer.getTempType(stateData)).toEqual(stateData.type);
  });

  it('should export a getter for the balance', () => {
    expect(reducer.getTempBalance).toEqual(jasmine.any(Function));
    expect(reducer.getTempBalance(stateData)).toEqual(stateData.balance);
  });
});
