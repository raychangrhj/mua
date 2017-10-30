import { Action } from '@ngrx/store';

import { AddressState } from '../../reducers/address/address.reducer';
import { Test } from '../../../../../../../test/test.action';

export const UPDATE = '[Customer Address] Update';

export class AddressUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: AddressState) { }
}

export type ALL
  = Test
  | AddressUpdateAction;
