import * as reducer from './primary-residence.reducer';
import { PrimaryResidenceUpdateAction } from '../../actions/primary-residence/primary-residence.action';
import { Test } from '../../../../../../../test/test.action';

describe('PrimaryResidence Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = false;
      const result = reducer.reducer(null, new PrimaryResidenceUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = true;
      const payload = false;
      const result = reducer.reducer(initState, new PrimaryResidenceUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(true, new Test());
      expect(result).toEqual(true);
    });
  });
});
