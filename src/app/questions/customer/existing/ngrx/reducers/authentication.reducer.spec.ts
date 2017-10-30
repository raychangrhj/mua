import * as reducer from './authentication.reducer';
import {
  AuthenticationSuccessAction,
  AuthenticationFailureAction
} from '../actions/authentication.action';
import { Test } from '../../../../../../test/test.action';
import { AuthenticationPreFill } from '../../../../../../models/service-responses';
import {
  initialAuthenticationState,
  QuestionState
} from './authentication.reducer';

describe('Authentication Reducer', () => {
  let payload;
  let initState;
  beforeEach(() => {
    payload = {
      authenticated: false,
      error: {
        type: 'some error type',
        description: 'Some error description'
      },
      question: initialAuthenticationState.question
    };

    initState = {
      authenticated: false,
      error: {
        type: 'init type',
        description: 'init description'
      },
      question: ({
        description: 'things'
      } as QuestionState)
    };
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a FAILURE action', () => {
      const result = reducer.reducer(null, new AuthenticationFailureAction(payload.error));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const result = reducer.reducer(initState, new AuthenticationFailureAction(payload.error));
      expect(result).not.toBe(initState);
    });

    it('should return the payload of a SUCCESS action', () => {
      const result = reducer.reducer(null, new AuthenticationSuccessAction(({} as AuthenticationPreFill)));
      expect(result).toEqual({
        authenticated: true,
        error: null,
        question: initialAuthenticationState.question
      });
    });

    it('should not mutate the existing state', () => {
      const result = reducer.reducer(initState, new AuthenticationSuccessAction(({} as AuthenticationPreFill)));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(initState, new Test());
      expect(result).toEqual(initState);
    });
  });

  it('should export a getAuthenticationState', () => {
    expect(reducer.getAuthenticationState).toEqual(jasmine.any(Function));
    const result = reducer.getAuthenticationState({
      authentication: initState
    });
    expect(result).toEqual(initState);
  });

  it('should export a getAuthenticatedState', () => {
    expect(reducer.getAuthenticatedState).toEqual(jasmine.any(Function));
    const result = reducer.getAuthenticatedState({
      authentication: initState
    });
    expect(result).toEqual(initState.authenticated);
  });

  it('should export a getAuthenticationErrorState', () => {
    expect(reducer.getAuthenticationErrorState).toEqual(jasmine.any(Function));
    const result = reducer.getAuthenticationErrorState({
      authentication: initState
    });
    expect(result).toEqual(initState.error);
  });
});
