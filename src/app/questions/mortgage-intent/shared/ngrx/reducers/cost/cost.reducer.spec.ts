import * as reducer from './cost.reducer';
import { CostUpdateAction } from '../../actions/cost/cost.action';
import { Test } from '../../../../../../../test/test.action';

describe('Cost Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 10000;
      const result = reducer.reducer(null, new CostUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 90000;
      const payload = 10000;
      const result = reducer.reducer(initState, new CostUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(10000, new Test());
      expect(result).toEqual(10000);
    });
  });
});
