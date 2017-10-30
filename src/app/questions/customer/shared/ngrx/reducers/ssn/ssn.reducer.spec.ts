import * as reducer from './ssn.reducer';
import { SSNUpdateAction } from '../../actions/ssn/ssn.action';
import { Test } from '../../../../../../../test/test.action';

describe('SSN Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 'email';
      const result = reducer.reducer(null, new SSNUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 'init email';
      const payload = 'email';
      const result = reducer.reducer(initState, new SSNUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('email', new Test());
      expect(result).toEqual('email');
    });
  });
});
