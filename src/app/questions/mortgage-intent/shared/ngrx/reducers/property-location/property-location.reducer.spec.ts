import * as reducer from './property-location.reducer';
import { PropertyLocationUpdateAction } from '../../actions/property-location/property-location.action';
import { Test } from '../../../../../../../test/test.action';

describe('Property Reducer', () => {
  it('should export an initial name state', () => {
    expect(reducer.initialPropertyState).toEqual({
      street: null,
      city: null,
      unit: null,
      county: null,
      state: null,
      zip: null
    });
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload: reducer.PropertyLocationState = {
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const result = reducer.reducer(null, new PropertyLocationUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState: reducer.PropertyLocationState = {
        street: 'street',
        county: 'county',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const payload: reducer.PropertyLocationState = {
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      const result = reducer.reducer(initState, new PropertyLocationUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(reducer.initialPropertyState, new Test());
      expect(result).toEqual(reducer.initialPropertyState);
    });
  });
});
