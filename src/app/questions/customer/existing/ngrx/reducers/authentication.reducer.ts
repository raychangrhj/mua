import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as AuthActions from '../actions/authentication.action';

interface BaseAuthenticationState {
  sessionId: string;
  version: string;
  email: string;
}

export type Action = AuthActions.ALL;

export interface AuthenticationState {
  authenticated: boolean;
  error: AuthenticationErrorState;
  question: QuestionState;
}

export interface AuthenticationErrorState {
  type: string;
  description: string;
}

export interface QuestionState extends BaseAuthenticationState {
  description: string;
  id: string;
  questionId: string;
}

export interface AuthenticationAnswerState extends BaseAuthenticationState {
  answer: string;
  questionId: string;
  id: string;
}

export const initialAuthenticationState: AuthenticationState = {
  authenticated: false,
  error: null,
  question: {
    id: null,
    questionId: null,
    description: null,
    sessionId: null,
    version: null,
    email: null,
  }
};

export interface AuthenticationForm {
  username: string;
  password: string;
}

export interface AuthenticationDebitForm {
  cardNumber: string;
  pinNumber: string;
}

export function reducer(state: AuthenticationState = initialAuthenticationState, action: Action) {
  switch (action.type) {
    case AuthActions.FAILURE: {
      return {
        authenticated: false,
        error: (action as AuthActions.AuthenticationFailureAction).payload,
        question: initialAuthenticationState.question
      };
    }

    case AuthActions.SUCCESS: {
      return {
        authenticated: true,
        error: null,
        question: state && state.question ? Object.assign({}, state.question) : initialAuthenticationState.question
      };
    }

    case AuthActions.QUESTION_UPDATE: {
      return Object.assign({}, state, {
        question: (action as AuthActions.AuthenticationQuestionUpdateAction).payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const getAuthenticatedState = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state && state.authenticated
);
export const getAuthenticationErrorState = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state && state.error
);
export const getAuthenticationQuestionState = createSelector(
  getAuthenticationState,
  (state: AuthenticationState) => state && state.question
);
