import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';
import { CustomerState } from '../../reducers/index.reducer';

export const RESET = '[Customer] Reset';
export const SET = '[Customer] Set';

export class CustomerResetAction implements Action {
  readonly type = RESET;

  constructor() { }
}

export class CustomerSetAction implements Action {
  readonly type = SET;

  constructor(
    public payload: CustomerState
  ) { }
}

export type ALL
  = Test
  | CustomerResetAction
  | CustomerSetAction;
