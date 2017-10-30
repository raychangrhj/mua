import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Customer Marital Status] Update';

export class MaritalStatusUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: string) { }
}

export type ALL
  = Test
  | MaritalStatusUpdateAction;
