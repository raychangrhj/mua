import * as reducer from './mortgage-type.reducer';
import { MortgageTypeUpdateAction } from '../../actions/mortgage-type/mortgage-type.action';
import { Test } from '../../../../../../../test/test.action';

describe('Mortgage Type Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 'buying';
      const result = reducer.reducer(null, new MortgageTypeUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 'buying';
      const payload = 'lower-payments';
      const result = reducer.reducer(initState, new MortgageTypeUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('foo', new Test());
      expect(result).toEqual('foo');
    });
  });
});
