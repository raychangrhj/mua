import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Buying Cost] Update';

export class CostUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: number) { }
}

export type ALL
  = Test
  | CostUpdateAction;
