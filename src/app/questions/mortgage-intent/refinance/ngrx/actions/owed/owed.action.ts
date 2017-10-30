import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Owed] Update';

export class OwedUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: number) { }
}

export type ALL
  = Test
  | OwedUpdateAction;
