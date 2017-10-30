import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Customer SSN] Update';

export class SSNUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: string) { }
}

export type ALL
  = Test
  | SSNUpdateAction;
