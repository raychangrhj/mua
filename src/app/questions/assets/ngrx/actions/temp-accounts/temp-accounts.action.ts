import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';

export const UPDATE_BANK_NAME = '[Temp Account] Update Bank Name';
export const UPDATE_TYPE = '[Temp Account] Update Type';
export const UPDATE_BALANCE = '[Temp Account] Update Balance';
export const CLEAR = '[Temp Account] Clear';

export class TempAccountBankNameUpdateAction implements Action {
  readonly type = UPDATE_BANK_NAME;

  constructor(
    public payload: string
  ) { }
}

export class TempAccountUpdateTypeUpdateAction implements Action {
  readonly type = UPDATE_TYPE;

  constructor(
    public payload: string
  ) { }
}

export class TempAccountUpdateBalanceUpdateAction implements Action {
  readonly type = UPDATE_BALANCE;

  constructor(
    public payload: number
  ) { }
}

export class TempAccountClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export type ALL
  = Test
  | TempAccountUpdateBalanceUpdateAction
  | TempAccountUpdateTypeUpdateAction
  | TempAccountBankNameUpdateAction
  | TempAccountClearAction;
