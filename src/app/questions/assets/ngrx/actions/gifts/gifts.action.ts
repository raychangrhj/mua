import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';
import { GiftStateObject } from '../../reducers/gifts/gifts.reducer';

export const ADD = '[Gift] Add';
export const DELETE = '[Gift] Delete';
export const UPDATE = '[Gift] Update';

export class GiftAddAction implements Action {
  readonly type = ADD;

  constructor(public payload: GiftStateObject) { }
}

export class GiftDeleteAction implements Action {
  readonly type = DELETE;

  constructor(public payload: GiftStateObject) { }
}

export class GiftUpdateAction implements Action {
  readonly type = UPDATE;

  constructor(
    public gift: GiftStateObject,
    public payload: GiftStateObject
  ) { }
}

export type ALL
  = Test
  | GiftDeleteAction
  | GiftUpdateAction
  | GiftAddAction;
