import * as reducer from './other.reducer';
import * as actions from '../../actions/other/other.action';
import { Test } from '../../../../../../test/test.action';

describe('Other Income Reducer', () => {
  let stateData: reducer.OtherIncomeStateObject;
  beforeEach(() => {
    stateData = {
      type: {
        option: 'option',
        explain: 'explain'
      },
      monthly: 1500,
      rentalLocation: {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }
    };
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  it('should return the initial state if the action.type is not caught', () => {
    const result = reducer.reducer([{
      type: { option: 'bar' }
    }], new Test());
    expect(result).toEqual([{
      type: { option: 'bar' }
    }]);
  });

  describe('reducer function', () => {
    describe('with ADD action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          type: {
            option: 'other',
              explain: 'Misc Inheritance'
          }
        };
        initState = [{
          type: 'rental'
        }];
        result = reducer.reducer(initState, new actions.OtherIncomeAddAction(payload));
      });

      it('should add the payload to the end of the otherIncome array', () => {
        expect(result).toEqual([
          payload,
          initState[0]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with DELETE action type', () => {
      let result;
      let initState;
      beforeEach(() => {
        initState = [{
          type: {
            option: 'rental'
          }
        }, {
          type: {
            option: 'other',
            explain: 'explain'
          }
        }, {
          type: {
            option: 'other',
            explain: 'explain'
          }
        }];
        result = reducer.reducer(initState, new actions.OtherIncomeDeleteAction(initState[1]));
      });

      it('should remove the payload from the otherIncome array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the inital state if the memory reference does not match anything', () => {
        result = reducer.reducer(initState, new actions.OtherIncomeDeleteAction({
          type: {
            option: 'other'
          }
        }));
        expect(result).toEqual(initState);
      });
    });
  });
});
