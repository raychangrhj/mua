import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import {
  OtherIncomeRentalLocationState,
  OtherIncomeTypeState
} from '../../reducers/other/other.reducer';

export const UPDATE_TYPE = '[Temp Other Income] Update Type';
export const UPDATE_RENTAL_LOCATION = '[Temp Other Income] Update Rental Location';
export const UPDATE_MONTHLY = '[Temp Other Income] Update Monthly Income';
export const CLEAR = '[Temp Other Income] Clear';

export class TempOtherIncomeTypeUpdateAction implements Action {
  readonly type = UPDATE_TYPE;

  constructor(
    public payload: OtherIncomeTypeState
  ) { }
}

export class TempOtherIncomeRentalLocationUpdateAction implements Action {
  readonly type = UPDATE_RENTAL_LOCATION;

  constructor(
    public payload: OtherIncomeRentalLocationState
  ) { }
}

export class TempOtherIncomeMonthlyUpdateAction implements Action {
  readonly type = UPDATE_MONTHLY;

  constructor(
    public payload: number
  ) { }
}

export class TempOtherIncomeClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export type ALL
  = Test
  | TempOtherIncomeRentalLocationUpdateAction
  | TempOtherIncomeMonthlyUpdateAction
  | TempOtherIncomeTypeUpdateAction
  | TempOtherIncomeClearAction;
