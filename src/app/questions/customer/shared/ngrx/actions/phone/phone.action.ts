import { Action } from '@ngrx/store';

import { Test } from '../../../../../../../test/test.action';
import { PhoneState } from '../../reducers/phone/phone.reducer';

export const UPDATE = '[Customer Phone] Update';

export class PhoneUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: PhoneState) { }
}

export type ALL
  = Test
  | PhoneUpdateAction;
