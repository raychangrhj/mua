import * as reducer from './dob.reducer';
import { DOBUpdateAction } from '../../actions/dob/dob.action';
import { Test } from '../../../../../../../test/test.action';

describe('DOB Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = '2012-02-02';
      const result = reducer.reducer(null, new DOBUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = '2099-99-99';
      const payload = '2012-02-02';
      const result = reducer.reducer(initState, new DOBUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('2012-02-02', new Test());
      expect(result).toEqual('2012-02-02');
    });
  });
});
