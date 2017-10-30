import * as reducer from './phone.reducer';
import { PhoneUpdateAction } from '../../actions/phone/phone.action';
import { Test } from '../../../../../../../test/test.action';

describe('Email Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = {
        number: 'number',
        type: 'type'
      };
      const result = reducer.reducer(null, new PhoneUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = {
        number: 'init number',
        type: 'init type'
      };
      const payload = {
        number: 'phone',
        type: 'type'
      };
      const result = reducer.reducer(initState, new PhoneUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const state = {
        number: 'number',
        type: 'type'
      };
      const result = reducer.reducer(state, new Test());
      expect(result).toEqual(state);
    });
  });
});
