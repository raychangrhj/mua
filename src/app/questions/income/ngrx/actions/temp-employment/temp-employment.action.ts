import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import {
  EmploymentDatesState,
  EmploymentLocationState
} from '../../reducers/temp-employment/temp-employement.reducer';

export const UPDATE_NAME = '[Temp Employment] Update Company Name';
export const UPDATE_TITLE = '[Temp Employment] Update Title';
export const UPDATE_LOCATION = '[Temp Employment] Update Location';
export const UPDATE_INCOME = '[Temp Employment] Update Income';
export const UPDATE_DATES = '[Temp Employment] Update Start/End Date';
export const UPDATE_ONLY_JOB = '[Temp Employment] Update Only Job';
export const UPDATE_PRIMARY_JOB = '[Temp Employment] Update Primary Job';
export const CLEAR = '[Temp Employment] Clear';

export class TempEmploymentCompanyNameUpdateAction implements Action {
  readonly type = UPDATE_NAME;

  constructor(
    public payload: string
  ) { }
}

export class TempEmploymentJobTitleUpdateAction implements Action {
  readonly type = UPDATE_TITLE;

  constructor(
    public payload: string
  ) { }
}

export class TempEmploymentLocationUpdateAction implements Action {
  readonly type = UPDATE_LOCATION;

  constructor(
    public payload: EmploymentLocationState
  ) { }
}

export class TempEmploymentIncomeUpdateAction implements Action {
  readonly type = UPDATE_INCOME;

  constructor(
    public payload: number
  ) { }
}

export class TempEmploymentDatesUpdateAction implements Action {
  readonly type = UPDATE_DATES;

  constructor(
    public payload: EmploymentDatesState
  ) { }
}

export class TempEmploymentOnlyJobUpdateAction implements Action {
  readonly type = UPDATE_ONLY_JOB;

  constructor(
    public payload: boolean
  ) { }
}

export class TempEmploymentClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export class TempEmploymentPrimaryJobUpdateAction implements Action {
  readonly type = UPDATE_PRIMARY_JOB;

  constructor(
    public payload: boolean
  ) { }
}

export type ALL
  = Test
  | TempEmploymentCompanyNameUpdateAction
  | TempEmploymentPrimaryJobUpdateAction
  | TempEmploymentJobTitleUpdateAction
  | TempEmploymentLocationUpdateAction
  | TempEmploymentOnlyJobUpdateAction
  | TempEmploymentIncomeUpdateAction
  | TempEmploymentDatesUpdateAction
  | TempEmploymentClearAction;
