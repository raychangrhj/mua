import { Action } from '@ngrx/store';

import { PropertyLocationState } from '../../reducers/property-location/property-location.reducer';
import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Mortgage Intent Property Location] Update';
export const VALIDATE = '[Mortgage Intent Property Location] Validate';

export class PropertyLocationUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: PropertyLocationState) { }
}

export class PropertyLocationValidateAction implements Action {
  readonly type = VALIDATE;

  constructor(public payload: PropertyLocationState) { }
}

export type ALL
  = Test
  | PropertyLocationUpdateAction;
