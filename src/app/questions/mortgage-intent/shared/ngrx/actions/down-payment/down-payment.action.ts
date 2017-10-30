import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Buying Down Payment] Update';

export class DownPaymentUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: number) { }
}

export type ALL
  = Test
  | DownPaymentUpdateAction;
