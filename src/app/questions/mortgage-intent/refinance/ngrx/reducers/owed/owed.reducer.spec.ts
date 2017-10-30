import * as reducer from './owed.reducer';
import { OwedUpdateAction } from '../../actions/owed/owed.action';
import { Test } from '../../../../../../../test/test.action';

describe('Owed Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 10000;
      const result = reducer.reducer(null, new OwedUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 90000;
      const payload = 10000;
      const result = reducer.reducer(initState, new OwedUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(10000, new Test());
      expect(result).toEqual(10000);
    });
  });
});
