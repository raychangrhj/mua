import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Intent] Update';

export class IntentUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: string) { }
}

export type ALL
  = Test
  | IntentUpdateAction;
