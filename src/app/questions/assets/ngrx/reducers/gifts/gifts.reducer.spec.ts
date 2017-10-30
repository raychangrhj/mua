import * as reducer from './gifts.reducer';
import * as actions from '../../actions/gifts/gifts.action';
import { Test } from '../../../../../../test/test.action';

describe('Gift Reducer', () => {
  let stateData: reducer.GiftStateObject;
  beforeEach(() => {
    stateData = {
      who: 'mom',
      relationship: 'mom',
      amount: 10000
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
          who: 'dad'
        });
        initState = [stateData];
        result = reducer.reducer(initState, new actions.GiftAddAction(payload));
      });

      it('should add the payload to the end of the gifts array', () => {
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
        payload = Object.assign({}, stateData, {
          who: 'dad'
        });
        initState = [
          Object.assign({}, stateData, {
            who: 'mom 2'
          }),
          payload,
          Object.assign({}, stateData, {
            who: 'dad 2'
          })
        ];
        result = reducer.reducer(initState, new actions.GiftDeleteAction(payload));
      });

      it('should remove the payload from the gifts array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the state if the payload is not in the list', () => {
        result = reducer.reducer(initState, new actions.GiftDeleteAction(Object.assign({}, stateData)));
        expect(result).toEqual(initState);
      });
    });

    describe('with UPDATE action type', () => {
      let payload;
      let initialGift;
      let result;
      let initState;
      beforeEach(() => {
        initialGift = Object.assign({}, stateData, {
          who: 'initialGift'
        });
        payload = Object.assign({}, stateData, {
          who: 'updatedGift'
        });
        initState = [stateData, initialGift, Object.assign({}, stateData)];
        result = reducer.reducer(initState, new actions.GiftUpdateAction(initialGift, payload));
      });

      it('should update the gift in the array by memory reference', () => {
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
        result = reducer.reducer(initState, new actions.GiftUpdateAction({
          who: 'something that does not exist'
        }, {
          who: 'some update'
        }));
        expect(result).toEqual(initState);
      });
    });
  });
});
