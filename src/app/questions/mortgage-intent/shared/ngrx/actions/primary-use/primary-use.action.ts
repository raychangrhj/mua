import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Primary Use] Update';

export class PrimaryUseUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: string) { }
}

export type ALL
  = Test
  | PrimaryUseUpdateAction;
