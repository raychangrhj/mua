import * as reducer from './address.reducer';
import { AddressUpdateAction } from '../../actions/address/address.action';
import { Test } from '../../../../../../../test/test.action';

describe('Address Reducer', () => {
  it('should export an initial name state', () => {
    expect(reducer.initialAddressState).toEqual({
      street: null,
      city: null,
      state: null,
      zip: null
    });
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload: reducer.AddressState = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const result = reducer.reducer(null, new AddressUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState: reducer.AddressState = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const payload: reducer.AddressState = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const result = reducer.reducer(initState, new AddressUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(reducer.initialAddressState, new Test());
      expect(result).toEqual(reducer.initialAddressState);
    });
  });
});
