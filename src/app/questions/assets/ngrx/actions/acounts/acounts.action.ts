import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { AccountStateObject } from '../../reducers/accounts/accounts.reducer';

export const ADD = '[Account] Add';
export const DELETE = '[Account] Delete';
export const UPDATE = '[Account] Update';

export class AccountAddAction implements Action {
  readonly type = ADD;

  constructor(public payload: AccountStateObject) { }
}

export class AccountDeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: AccountStateObject) { }
}

export class AccountUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(
    public account: AccountStateObject,
    public payload: AccountStateObject
  ) { }
}

export type ALL
  = Test
  | AccountDeleteAction
  | AccountUpdateAction
  | AccountAddAction;
