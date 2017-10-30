import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { AssetsState } from '../../reducers/index.reducer';

export const RESET = '[Assets] Reset';
export const SET = '[Assets] Set';

export class AssetsResetAction implements Action {
  readonly type = RESET;

  constructor() { }
}

export class AssetsSetAction implements Action {
  readonly type = SET;

  constructor(
    public payload: AssetsState
  ) { }
}

export type ALL
  = Test
  | AssetsResetAction
  | AssetsSetAction;
