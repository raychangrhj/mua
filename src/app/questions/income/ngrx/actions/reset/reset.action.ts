import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { IncomeState } from '../../reducers/index.reducer';

export const RESET = '[Income] Reset';
export const SET = '[Income] Set';

export class IncomeResetAction implements Action {
  readonly type = RESET;

  constructor() { }
}

export class IncomeSetAction implements Action {
  readonly type = SET;

  constructor(
    public payload: IncomeState
  ) { }
}

export type ALL
  = Test
  | IncomeResetAction
  | IncomeSetAction;
