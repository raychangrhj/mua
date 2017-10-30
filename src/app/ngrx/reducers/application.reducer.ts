import * as ApplicationActions from '../actions/application.action';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export type Action = ApplicationActions.ALL;

export interface ApplicationState {
  id: string;
  rcifId?: string;
  sectionId: number;
  subType: number;
  loanPurpose: number;
  loanOfficerId: number;
}

export const initialApplicationState: ApplicationState = {
  id: null,
  rcifId: null,
  sectionId: null,
  subType: 1,
  loanPurpose: 1,
  loanOfficerId: null
};

export function applicationReducer(state: ApplicationState = initialApplicationState, action: Action) {
  switch (action.type) {
    case ApplicationActions.UPDATE_ID: {
      return Object.assign({}, state, {
        id: (action as ApplicationActions.ApplicationIdUpdateAction).payload
      });
    }

    case ApplicationActions.UPDATE_RCIF_ID: {
      return Object.assign({}, state, {
        rcifId: (action as ApplicationActions.ApplicationRcifIdUpdateAction).payload
      });
    }

    case ApplicationActions.UPDATE_SECTION_ID: {
      return Object.assign({}, state, {
        sectionId: (action as ApplicationActions.ApplicationSectionIdUpdateAction).payload
      });
    }

    case ApplicationActions.UPDATE_SUBTYPE: {
      return Object.assign({}, state, {
        subType: (action as ApplicationActions.ApplicationSubTypeUpdateAction).payload
      });
    }

    case ApplicationActions.UPDATE_LOAN_PURPOSE: {
      return Object.assign({}, state, {
        loanPurpose: (action as ApplicationActions.ApplicationLoanPurposeUpdateAction).payload
      });
    }

    case ApplicationActions.UPDATE_LOAN_OFFICER_ID: {
      return Object.assign({}, state, {
        loanOfficerId: (action as ApplicationActions.ApplicationLoanOfficerIdUpdateAction).payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getApplicationState = createFeatureSelector<ApplicationState>('application');

export const getApplicationIdState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.id
);
export const getApplicationRcifIdState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.rcifId
);
export const getApplicationSectionIdState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.sectionId
);
export const getApplicationSubTypeState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.subType
);
export const getApplicationLoanPurposeState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.loanPurpose
);
export const getApplicationLoanOfficerIdState = createSelector(
  getApplicationState,
  (state: ApplicationState) => state && state.loanOfficerId
);
