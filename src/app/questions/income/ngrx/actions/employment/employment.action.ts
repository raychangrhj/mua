import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { EmploymentStateObject } from '../../reducers/employment/employement.reducer';

export const ADD = '[Employment] Add';
export const DELETE = '[Employment] Delete';
export const UPDATE = '[Employment] Update';

export class EmploymentAddAction implements Action {
  readonly type = ADD;

  constructor(public payload: EmploymentStateObject) { }
}

export class EmploymentDeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: EmploymentStateObject) { }
}

export class EmploymentUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(
    public employment: EmploymentStateObject,
    public payload: EmploymentStateObject
  ) { }
}

export type ALL
  = Test
  | EmploymentDeleteAction
  | EmploymentUpdateAction
  | EmploymentAddAction;
