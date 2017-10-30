import * as reducer from './email.reducer';
import { EmailUpdateAction } from '../../actions/email/email.action';
import { Test } from '../../../../../../../test/test.action';

describe('Email Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 'email';
      const result = reducer.reducer(null, new EmailUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 'init email';
      const payload = 'email';
      const result = reducer.reducer(initState, new EmailUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer('email', new Test());
      expect(result).toEqual('email');
    });
  });
});
