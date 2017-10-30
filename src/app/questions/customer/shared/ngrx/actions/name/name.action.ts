import { Action } from '@ngrx/store';

import { NameState } from '../../reducers/name/name.reducer';
import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Customer Name] Update';

export class NameUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: NameState) { }
}

export type ALL
  = Test
  | NameUpdateAction;
