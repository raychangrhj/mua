import * as reducer from './temp-gift.reducer';
import * as actions from '../../actions/temp-gifts/temp-gifts.action';
import { Test } from '../../../../../../test/test.action';
import {
  initialGiftStateObject,
  GiftStateObject
} from '../gifts/gifts.reducer';

describe('Temp Other Income Reducer', () => {
  let stateData: GiftStateObject;
  beforeEach(() => {
    stateData = {
      who: 'who',
      relationship: 'relationship',
      amount: 10000
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
    describe('with UPDATE_WHO action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'new-who';
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempGiftWhoUpdateAction(payload));
      });

      it('should add the who payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          who: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_RELATIONSHIP action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'new-relationship';
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempGiftRelationshipUpdateAction(payload));
      });

      it('should add the rental location payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          relationship: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_AMOUNT action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 20000;
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempGiftAmountUpdateAction(payload));
      });

      it('should add the type payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          amount: payload
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
        result = reducer.reducer(initState, new actions.TempGiftClearAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(initialGiftStateObject);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });
  });

  it('should export a getter for the who', () => {
    expect(reducer.getTempWho).toEqual(jasmine.any(Function));
    expect(reducer.getTempWho(stateData)).toEqual(stateData.who);
  });

  it('should export a getter for the relationship', () => {
    expect(reducer.getTempRelationship).toEqual(jasmine.any(Function));
    expect(reducer.getTempRelationship(stateData)).toEqual(stateData.relationship);
  });

  it('should export a getter for the amount', () => {
    expect(reducer.getTempAmount).toEqual(jasmine.any(Function));
    expect(reducer.getTempAmount(stateData)).toEqual(stateData.amount);
  });
});
