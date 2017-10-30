import * as reducer from './address-info.reducer';
import { AddressInfoUpdateAction } from '../../actions/address-info/address-info.action';
import { Test } from '../../../../../../../test/test.action';

describe('Marital Status Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = '2002-02-02';
      const result = reducer.reducer(null, new AddressInfoUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = '2010-10-10';
      const payload = '2002-02-02';
      const result = reducer.reducer(initState, new AddressInfoUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('2002-02-02', new Test());
      expect(result).toEqual('2002-02-02');
    });
  });
});
