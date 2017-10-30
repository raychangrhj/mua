import { Action } from '@ngrx/store';

import { Test } from '../../../../../test/test.action';

export const COMPLETE_SECTION = '[Navigation] Section Status Update';
export const ACTIVATE_SECTION = '[Navigation] Activate Section';
export const SECTIONS_UPDATE = '[Navigation] Sections Update';

export class NavigationCompleteSectionAction implements Action {
  readonly type = COMPLETE_SECTION;

  constructor(public payload: number) { }
}

export class NavigationActivateSectionAction implements Action {
  readonly type = ACTIVATE_SECTION;

  constructor(public payload: number) { }
}

export class NavigationSectionsUpdateAction implements Action {
  readonly type = SECTIONS_UPDATE;

  constructor(public payload: 'borrower' | 'coBorrower') { }
}

export type ALL
  = Test
  | NavigationCompleteSectionAction
  | NavigationActivateSectionAction
  | NavigationSectionsUpdateAction;
