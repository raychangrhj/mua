import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Type] Update';

export class MortgageTypeUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: string) { }
}

export type ALL
  = Test
  | MortgageTypeUpdateAction;
