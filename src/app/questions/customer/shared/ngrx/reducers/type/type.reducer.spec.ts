import * as reducer from './type.reducer';
import { TypeUpdateAction } from '../../actions/type/type.action';
import { Test } from '../../../../../../../test/test.action';

describe('Type Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = '2012-02-02';
      const result = reducer.reducer(null, new TypeUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = '2099-99-99';
      const payload = '2012-02-02';
      const result = reducer.reducer(initState, new TypeUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('2012-02-02', new Test());
      expect(result).toEqual('2012-02-02');
    });
  });
});
