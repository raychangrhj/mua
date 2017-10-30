import { Action } from '@ngrx/store';

import { Test } from '../../../../../../test/test.action';

export const UPDATE_WHO = '[Temp Gift] Update Who';
export const UPDATE_RELATIONSHIP = '[Temp Gift] Update Relationship';
export const UPDATE_AMOUNT = '[Temp Gift] Update Amount';
export const CLEAR = '[Temp Gift] Clear';

export class TempGiftWhoUpdateAction implements Action {
  readonly type = UPDATE_WHO;

  constructor(
    public payload: string
  ) { }
}

export class TempGiftRelationshipUpdateAction implements Action {
  readonly type = UPDATE_RELATIONSHIP;

  constructor(
    public payload: string
  ) { }
}

export class TempGiftAmountUpdateAction implements Action {
  readonly type = UPDATE_AMOUNT;

  constructor(
    public payload: number
  ) { }
}

export class TempGiftClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export type ALL
  = Test
  | TempGiftRelationshipUpdateAction
  | TempGiftAmountUpdateAction
  | TempGiftWhoUpdateAction
  | TempGiftClearAction;
