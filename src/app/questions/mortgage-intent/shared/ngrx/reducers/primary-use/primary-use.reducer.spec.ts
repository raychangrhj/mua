import * as reducer from './primary-use.reducer';
import { PrimaryUseUpdateAction } from '../../actions/primary-use/primary-use.action';
import { Test } from '../../../../../../../test/test.action';

describe('Cost Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 'vacation';
      const result = reducer.reducer(null, new PrimaryUseUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 'other';
      const payload = 'vacation';
      const result = reducer.reducer(initState, new PrimaryUseUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('vacation', new Test());
      expect(result).toEqual('vacation');
    });
  });
});
