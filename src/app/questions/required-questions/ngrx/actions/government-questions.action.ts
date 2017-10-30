import { Action } from '@ngrx/store';
import { Test } from '../../../../../test/test.action';
import {
  EthnicityState,
  GovernmentQuestionsState,
  RaceState,
  SexState
} from '../reducers/government-questions.reducer';

export const UPDATE_OUTSTANDING_JUDGMENTS = '[Government Questions] Update Outstanding Judgements';
export const UPDATE_BANKRUPTCIES = '[Government Questions] Update Bankruptcies';
export const UPDATE_FORECLOSURES = '[Government Questions] Update Foreclosures';
export const UPDATE_LAWSUITS = '[Government Questions] Update Lawsuits';
export const UPDATE_FORECLOSURE_JUDGEMENTS = '[Government Questions] Update Foreclosure Judgements';
export const UPDATE_FEDERAL_DEBT_DELINQUENCIES = '[Government Questions] Update Federal Debt Delinquencies';
export const UPDATE_ALIMONY = '[Government Questions] Update Alimony';
export const UPDATE_BORROWED_DOWN_PAYMENT = '[Government Questions] Update Borrowed Down Payment';
export const UPDATE_CO_MAKER_ON_NOTE = '[Government Questions] Update Co-maker on Note';
export const UPDATE_US_CITIZEN = '[Government Questions] Update US Citizen';
export const UPDATE_PERMANENT_RESIDENT_ALIEN = '[Government Questions] Update Permanent Resident Alien';
export const UPDATE_OWNERSHIP_INTEREST = '[Government Questions] Update Ownership Interest';
export const UPDATE_ETHNICITY = '[Government Questions] Update Ethnicity';
export const UPDATE_RACE = '[Government Questions] Update Race';
export const UPDATE_SEX = '[Government Questions] Update Sex';
export const RESET = '[Government Questions] Reset';
export const SET = '[Government Questions] Set';

export class GovernmentQuestionsOutstandingJudgementsUpdateAction implements Action {
  readonly type = UPDATE_OUTSTANDING_JUDGMENTS;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsBankruptciesUpdateAction implements Action {
  readonly type = UPDATE_BANKRUPTCIES;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsForeclosuresUpdateAction implements Action {
  readonly type = UPDATE_FORECLOSURES;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsLawsuitsUpdateAction implements Action {
  readonly type = UPDATE_LAWSUITS;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsForeclosureJudgementsUpdateAction implements Action {
  readonly type = UPDATE_FORECLOSURE_JUDGEMENTS;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsFederalDebtDelinquenciesUpdateAction implements Action {
  readonly type = UPDATE_FEDERAL_DEBT_DELINQUENCIES;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsAlimonyUpdateAction implements Action {
  readonly type = UPDATE_ALIMONY;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsBorrowedDownPaymentUpdateAction implements Action {
  readonly type = UPDATE_BORROWED_DOWN_PAYMENT;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsCoMakerOnNoteUpdateAction implements Action {
  readonly type = UPDATE_CO_MAKER_ON_NOTE;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsUSCitizenUpdateAction implements Action {
  readonly type = UPDATE_US_CITIZEN;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsPermanentResidentAlienUpdateAction implements Action {
  readonly type = UPDATE_PERMANENT_RESIDENT_ALIEN;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsOwnershipInterestUpdateAction implements Action {
  readonly type = UPDATE_OWNERSHIP_INTEREST;

  constructor(public payload: boolean) { }
}

export class GovernmentQuestionsEthnicityUpdateAction implements Action {
  readonly type = UPDATE_ETHNICITY;

  constructor(public payload: EthnicityState) { }
}

export class GovernmentQuestionsRaceUpdateAction implements Action {
  readonly type = UPDATE_RACE;

  constructor(public payload: RaceState) { }
}

export class GovernmentQuestionsSexUpdateAction implements Action {
  readonly type = UPDATE_SEX;

  constructor(public payload: SexState) { }
}

export class GovernmentQuestionsResetAction implements Action {
  readonly type = RESET;

  constructor() { }
}

export class GovernmentQuestionsSetAction implements Action {
  readonly type = SET;

  constructor(
    public payload: GovernmentQuestionsState
  ) { }
}

export type ALL
  = Test
  | GovernmentQuestionsFederalDebtDelinquenciesUpdateAction
  | GovernmentQuestionsPermanentResidentAlienUpdateAction
  | GovernmentQuestionsOutstandingJudgementsUpdateAction
  | GovernmentQuestionsForeclosureJudgementsUpdateAction
  | GovernmentQuestionsBorrowedDownPaymentUpdateAction
  | GovernmentQuestionsOwnershipInterestUpdateAction
  | GovernmentQuestionsCoMakerOnNoteUpdateAction
  | GovernmentQuestionsBankruptciesUpdateAction
  | GovernmentQuestionsForeclosuresUpdateAction
  | GovernmentQuestionsUSCitizenUpdateAction
  | GovernmentQuestionsEthnicityUpdateAction
  | GovernmentQuestionsLawsuitsUpdateAction
  | GovernmentQuestionsAlimonyUpdateAction
  | GovernmentQuestionsRaceUpdateAction
  | GovernmentQuestionsSexUpdateAction
  | GovernmentQuestionsResetAction
  | GovernmentQuestionsSetAction;
