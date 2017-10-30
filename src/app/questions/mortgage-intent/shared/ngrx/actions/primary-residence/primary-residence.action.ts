import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Primary Residence] Update';

export class PrimaryResidenceUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: boolean) { }
}

export type ALL
  = Test
  | PrimaryResidenceUpdateAction;
