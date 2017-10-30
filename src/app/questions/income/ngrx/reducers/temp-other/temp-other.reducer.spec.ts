import * as reducer from './temp-other.reducer';
import * as actions from '../../actions/temp-other/temp-other.action';
import { Test } from '../../../../../../test/test.action';
import {
  initialOtherIncomeStateObject,
  OtherIncomeStateObject
} from '../other/other.reducer';

describe('Temp Other Income Reducer', () => {
  let stateData: OtherIncomeStateObject;
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
    const result = reducer.reducer({
      type: { option: 'bar' }
    }, new Test());
    expect(result).toEqual({
      type: { option: 'bar' }
    });
  });

  describe('reducer function', () => {
    describe('with UPDATE_MONTHLY action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 20000;
        initState = {
          type: {
            option: 'rental'
          }
        };
        result = reducer.reducer(initState, new actions.TempOtherIncomeMonthlyUpdateAction(payload));
      });

      it('should add the monthly income payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          monthly: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_RENTAL_LOCATION action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip'
        };
        initState = {
          type: {
            option: 'rental'
          }
        };
        result = reducer.reducer(initState, new actions.TempOtherIncomeRentalLocationUpdateAction(payload));
      });

      it('should add the rental location payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          rentalLocation: payload
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
        payload = {
          option: 'pizza'
        };
        initState = {
          type: {
            option: 'rental'
          }
        };
        result = reducer.reducer(initState, new actions.TempOtherIncomeTypeUpdateAction(payload));
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

    describe('with CLEAR action type', () => {
      let result;
      let initState;
      beforeEach(() => {
        initState = {
          type: {
            option: 'rental'
          }
        };
        result = reducer.reducer(initState, new actions.TempOtherIncomeClearAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(initialOtherIncomeStateObject);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });
  });

  it('should export a getter for the type', () => {
    expect(reducer.getTempType).toEqual(jasmine.any(Function));
    expect(reducer.getTempType(stateData)).toEqual(stateData.type);
  });

  it('should export a getter for the rental location', () => {
    expect(reducer.getTempRentalLocation).toEqual(jasmine.any(Function));
    expect(reducer.getTempRentalLocation(stateData)).toEqual(stateData.rentalLocation);
  });

  it('should export a getter for the income', () => {
    expect(reducer.getTempIncome).toEqual(jasmine.any(Function));
    expect(reducer.getTempIncome(stateData)).toEqual(stateData.monthly);
  });
});
