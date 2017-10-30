import { Action } from '@ngrx/store';

import { Test } from '../../../test/test.action';

export const UPDATE_ID = '[Application Id] Update';
export const UPDATE_RCIF_ID = '[Application RCIF Id] Update';
export const UPDATE_SECTION_ID = '[Application Section Id] Update';
export const UPDATE_SUBTYPE = '[Application SubType] Update';
export const UPDATE_LOAN_PURPOSE = '[Application Loan Type] Update';
export const UPDATE_LOAN_OFFICER_ID = '[Application Loan Officer Id] Update';

export class ApplicationIdUpdateAction implements Action {
  readonly type = UPDATE_ID;

  constructor(public payload: string) {}
}

export class ApplicationRcifIdUpdateAction implements Action {
  readonly type = UPDATE_RCIF_ID;

  constructor(public payload: string) {}
}

export class ApplicationSectionIdUpdateAction implements Action {
  readonly type = UPDATE_SECTION_ID;

  constructor(public payload: number) {}
}

export class ApplicationSubTypeUpdateAction implements Action {
  readonly type = UPDATE_SUBTYPE;

  constructor(public payload: number) {}
}

export class ApplicationLoanPurposeUpdateAction implements Action {
  readonly type = UPDATE_LOAN_PURPOSE;

  constructor(public payload: number) {}
}

export class ApplicationLoanOfficerIdUpdateAction implements Action {
  readonly type = UPDATE_LOAN_OFFICER_ID;

  constructor(public payload: number) {}
}

export type ALL
  = Test
  | ApplicationIdUpdateAction
  | ApplicationRcifIdUpdateAction
  | ApplicationSectionIdUpdateAction
  | ApplicationSubTypeUpdateAction
  | ApplicationLoanPurposeUpdateAction
  | ApplicationLoanOfficerIdUpdateAction;
