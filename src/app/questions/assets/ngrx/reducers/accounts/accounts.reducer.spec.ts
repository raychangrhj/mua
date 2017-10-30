import * as reducer from './accounts.reducer';
import * as actions from '../../actions/acounts/acounts.action';
import { Test } from '../../../../../../test/test.action';
import { stat } from 'fs';

describe('Account Reducer', () => {
  let stateData: reducer.AccountStateObject;
  beforeEach(() => {
    stateData = {
      bankName: 'bank',
      type: 'checking',
      balance: 10000
    }
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  it('should return the initial state if the action.type is not caught', () => {
    const result = reducer.reducer([stateData], new Test());
    expect(result).toEqual([stateData]);
  });

  describe('reducer function', () => {
    describe('with ADD action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = Object.assign({}, stateData, {
          bankName: 'new bank'
        });
        initState = [stateData];
        result = reducer.reducer(initState, new actions.AccountAddAction(payload));
      });

      it('should add the payload to the end of the accounts array', () => {
        expect(result).toEqual([
          payload,
          initState[0],
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with DELETE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          bankName: 'payload'
        };
        initState = [{
          bankName: '0'
        }, payload, {
          bankName: '2'
        }];
        result = reducer.reducer(initState, new actions.AccountDeleteAction(payload));
      });

      it('should remove the payload from the accounts array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the state if the payload is not in the list', () => {
        result = reducer.reducer(initState, new actions.AccountDeleteAction({
          bankName: 'foo'
        }));
        expect(result).toEqual(initState);
      });
    });

    describe('with UPDATE action type', () => {
      let payload;
      let initialAccount;
      let result;
      let initState;
      beforeEach(() => {
        initialAccount = {
          bankName: 'not_1'
        };
        payload = {
          bankName: '1'
        };
        initState = [{
          bankName: '0'
        }, initialAccount, {
          bankName: '2'
        }];
        result = reducer.reducer(initState, new actions.AccountUpdateAction(initialAccount, payload));
      });

      it('should update the account in the array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          payload,
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the state if the payload is not in the list', () => {
        result = reducer.reducer(initState, new actions.AccountUpdateAction({
          bankName: 'something that does not exist'
        }, {
          bankName: 'some update'
        }));
        expect(result).toEqual(initState);
      });
    });
  });
});
