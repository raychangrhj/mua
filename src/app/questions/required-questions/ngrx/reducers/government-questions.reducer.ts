import * as GovernmentQuestionsActions from '../actions/government-questions.action';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export type Action = GovernmentQuestionsActions.ALL;

export interface State {
  governmentQuestions: GovernmentQuestionsState
}

export interface GovernmentQuestionsState {
  outstandingJudgements: boolean;
  bankruptcies: boolean;
  foreclosures: boolean;
  lawsuits: boolean;
  foreclosureJudgements: boolean;
  federalDebtDelinquencies: boolean;
  alimony: boolean;
  borrowedDownPayment: boolean;
  coMakerOnNote: boolean;
  usCitizen: boolean;
  permanentResidentAlien: boolean;
  ownershipInterest: boolean;
  ethnicity: EthnicityState;
  race: RaceState;
  sex: SexState;
}

export interface SexState {
  male: boolean;
  female: boolean;
  optOut: boolean;
}

export interface EthnicityState {
  hispanic: boolean;
  mexican: boolean;
  puertoRican: boolean;
  cuban: boolean;
  otherHispanic: {
    selected: boolean;
    other: string;
  };
  nonHispanic: boolean;
  optOut: boolean;
}

export interface RaceState {
  americanIndian: {
    selected: boolean;
    tribe: string;
  };
  asian: boolean;
  asianIndian: boolean;
  chinese: boolean;
  filipino: boolean;
  japanese: boolean;
  korean: boolean;
  vietnamese: boolean;
  otherAsian: {
    selected: boolean;
    other: string;
  };
  africanAmerican: boolean;
  pacificIslander: boolean;
  nativeHawaiian: boolean;
  guamanian: boolean;
  samoan: boolean;
  otherPacificIslander: {
    selected: boolean;
    other: string;
  };
  white: boolean;
  optOut: boolean;
}

export const initialGovernmentQuestionsState: GovernmentQuestionsState = {
  outstandingJudgements: null,
  bankruptcies: null,
  foreclosures: null,
  lawsuits: null,
  foreclosureJudgements: null,
  federalDebtDelinquencies: null,
  alimony: null,
  borrowedDownPayment: null,
  coMakerOnNote: null,
  usCitizen: null,
  permanentResidentAlien: null,
  ownershipInterest: null,
  ethnicity: {
    hispanic: null,
    mexican: null,
    puertoRican: null,
    cuban: null,
    otherHispanic: {
      selected: null,
      other: null
    },
    nonHispanic: null,
    optOut: null
  },
  race: {
    americanIndian: {
      selected: null,
      tribe: null
    },
    asian: null,
    asianIndian: null,
    chinese: null,
    filipino: null,
    japanese: null,
    korean: null,
    vietnamese: null,
    otherAsian: {
      selected: null,
      other: null
    },
    africanAmerican: null,
    pacificIslander: null,
    nativeHawaiian: null,
    guamanian: null,
    samoan: null,
    otherPacificIslander: {
      selected: null,
      other: null
    },
    white: null,
    optOut: null,
  },
  sex: {
    male: null,
    female: null,
    optOut: null
  }
};

export function reducer(state: GovernmentQuestionsState = initialGovernmentQuestionsState, action: Action) {
  switch (action.type) {
    case GovernmentQuestionsActions.UPDATE_OUTSTANDING_JUDGMENTS: {
      return Object.assign({}, state, {
        outstandingJudgements: (action as GovernmentQuestionsActions.GovernmentQuestionsOutstandingJudgementsUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_BANKRUPTCIES: {
      return Object.assign({}, state, {
        bankruptcies: (action as GovernmentQuestionsActions.GovernmentQuestionsBankruptciesUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_FORECLOSURES: {
      return Object.assign({}, state, {
        foreclosures: (action as GovernmentQuestionsActions.GovernmentQuestionsForeclosuresUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_LAWSUITS: {
      return Object.assign({}, state, {
        lawsuits: (action as GovernmentQuestionsActions.GovernmentQuestionsLawsuitsUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_FORECLOSURE_JUDGEMENTS: {
      return Object.assign({}, state, {
        foreclosureJudgements: (action as GovernmentQuestionsActions.GovernmentQuestionsForeclosureJudgementsUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_FEDERAL_DEBT_DELINQUENCIES: {
      return Object.assign({}, state, {
        federalDebtDelinquencies: (action as GovernmentQuestionsActions.GovernmentQuestionsFederalDebtDelinquenciesUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_ALIMONY: {
      return Object.assign({}, state, {
        alimony: (action as GovernmentQuestionsActions.GovernmentQuestionsAlimonyUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_BORROWED_DOWN_PAYMENT: {
      return Object.assign({}, state, {
        borrowedDownPayment: (action as GovernmentQuestionsActions.GovernmentQuestionsBorrowedDownPaymentUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_CO_MAKER_ON_NOTE: {
      return Object.assign({}, state, {
        coMakerOnNote: (action as GovernmentQuestionsActions.GovernmentQuestionsCoMakerOnNoteUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_US_CITIZEN: {
      return Object.assign({}, state, {
        usCitizen: (action as GovernmentQuestionsActions.GovernmentQuestionsUSCitizenUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_PERMANENT_RESIDENT_ALIEN: {
      return Object.assign({}, state, {
        permanentResidentAlien: (action as GovernmentQuestionsActions.GovernmentQuestionsPermanentResidentAlienUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_OWNERSHIP_INTEREST: {
      return Object.assign({}, state, {
        ownershipInterest: (action as GovernmentQuestionsActions.GovernmentQuestionsOwnershipInterestUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_ETHNICITY: {
      return Object.assign({}, state, {
        ethnicity: (action as GovernmentQuestionsActions.GovernmentQuestionsEthnicityUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_RACE: {
      return Object.assign({}, state, {
        race: (action as GovernmentQuestionsActions.GovernmentQuestionsRaceUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.UPDATE_SEX: {
      return Object.assign({}, state, {
        sex: (action as GovernmentQuestionsActions.GovernmentQuestionsSexUpdateAction).payload
      });
    }
    case GovernmentQuestionsActions.RESET: {
      return initialGovernmentQuestionsState;
    }
    case GovernmentQuestionsActions.SET: {
      return (action as GovernmentQuestionsActions.GovernmentQuestionsSetAction).payload;
    }
    default: {
      return state;
    }
  }
}

export const getGovernmentQuestionsState = createFeatureSelector<GovernmentQuestionsState>('governmentQuestions');

export const getGovernmentQuestionsOutstandingJudgementsState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.outstandingJudgements
);
export const getGovernmentQuestionsBankruptciesState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.bankruptcies
);
export const getGovernmentQuestionsForeclosuresState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.foreclosures
);
export const getGovernmentQuestionsLawsuitsState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.lawsuits
);
export const getGovernmentQuestionsForeclosureJudgementsState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.foreclosureJudgements
);
export const getGovernmentQuestionsFederalDebtDelinquenciesState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.federalDebtDelinquencies
);
export const getGovernmentQuestionsAlimonyState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.alimony
);
export const getGovernmentQuestionsBorrowedDownPaymentState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.borrowedDownPayment
);
export const getGovernmentQuestionsCoMakerOnNoteState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.coMakerOnNote
);
export const getGovernmentQuestionsUSCitizenState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.usCitizen
);
export const getGovernmentQuestionsPermanentResidentAlienState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.permanentResidentAlien
);
export const getGovernmentQuestionsOwnershipInterestState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.ownershipInterest
);
export const getEthnicityState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.ethnicity
);
export const getRaceState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.race
);
export const getSexState = createSelector(
  getGovernmentQuestionsState,
  (state: GovernmentQuestionsState) => state && state.sex
);
