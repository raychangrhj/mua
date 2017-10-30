import { Action } from '@ngrx/store';

import {
  OtherIncomeStateObject,
} from '../../reducers/other/other.reducer';
import { Test } from '../../../../../../test/test.action';

export const ADD = '[Other Income] Add';
export const DELETE = '[Other Income] Delete';
export const UPDATE = '[Other Income] Update';

export class OtherIncomeAddAction implements Action {
  readonly type = ADD;

  constructor(public payload: OtherIncomeStateObject) { }
}

export class OtherIncomeDeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: OtherIncomeStateObject) {
  }
}

export class OtherIncomeUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(
    public otherIncome: OtherIncomeStateObject,
    public payload: OtherIncomeStateObject
  ) {
  }
}

export type ALL
  = Test
  | OtherIncomeDeleteAction
  | OtherIncomeUpdateAction
  | OtherIncomeAddAction;
