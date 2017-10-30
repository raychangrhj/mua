import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { AuthenticationPreFill } from '../../../../../../models/service-responses';
import * as fromAuth from '../reducers/authentication.reducer';
import {
  AuthenticationAnswerState,
  QuestionState
} from '../reducers/authentication.reducer';

export const AUTHENTICATE = '[Customer Authentication] Authenticate';
export const QUESTION_UPDATE = '[Customer Authentication] Question Update';
export const BY_DEBIT = '[Customer Authentication] Authenticate By Debit';
export const SUCCESS = '[Customer Authentication] Authenticated';
export const FAILURE = '[Customer Authentication] Failed';
export const ANSWER_SUBMIT = '[Customer Authentication] Answer Submit';

export class AuthenticationAuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: fromAuth.AuthenticationForm) { }
}

export class AuthenticationByDebitAction implements Action {
  readonly type = BY_DEBIT;

  constructor(public payload: fromAuth.AuthenticationDebitForm) { }
}

export class AuthenticationSuccessAction implements Action {
  readonly type = SUCCESS;

  constructor(public payload: AuthenticationPreFill) { }
}

export class AuthenticationFailureAction implements Action {
  readonly type = FAILURE;

  constructor(public payload: fromAuth.AuthenticationErrorState) { }
}

export class AuthenticationQuestionUpdateAction implements Action {
  readonly type = QUESTION_UPDATE;

  constructor(public payload: QuestionState) { }
}

export class AuthenticationAnswerSubmitAction implements Action {
  readonly type = ANSWER_SUBMIT;

  constructor(public payload: AuthenticationAnswerState) { }
}

export type ALL
  = Test
  | AuthenticationQuestionUpdateAction
  | AuthenticationAuthenticateAction
  | AuthenticationAnswerSubmitAction
  | AuthenticationByDebitAction
  | AuthenticationSuccessAction
  | AuthenticationFailureAction;
