import { Action } from '@ngrx/store';

import { Test } from '../../../../../test/test.action';
import { DataStore } from '../../../../../models/service-responses';

export const SUBMIT = '[Application] Submit';

export class ApplicationSubmitAction implements Action {
  readonly type = SUBMIT;

  constructor(public payload: DataStore) {}
}

export type Actions
  = Test
  | ApplicationSubmitAction;
