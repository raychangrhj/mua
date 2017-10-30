import * as reducer from './marital-status.reducer';
import { MaritalStatusUpdateAction } from '../../actions/marital-status/marital-status.action';
import { Test } from '../../../../../../../test/test.action';

describe('Marital Status Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 'marital-status';
      const result = reducer.reducer(null, new MaritalStatusUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 'init marital-status';
      const payload = 'marital-status';
      const result = reducer.reducer(initState, new MaritalStatusUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('marital-status', new Test());
      expect(result).toEqual('marital-status');
    });
  });
});
