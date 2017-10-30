import * as NavigationActions from '../actions/navigation.action';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export type Action = NavigationActions.ALL;

export interface NavigationState {
  sections: NavigationSectionState[]
}

export interface NavigationSectionState {
  id: number;
  title: string;
  baseLink: string[];
  complete: boolean;
  active: boolean;
  required: boolean;
}

export const initialNavigationState: NavigationState = {
  sections: [
    {
      id: 10,
      title: 'Personal Information',
      baseLink: ['/welcome'],
      complete: false,
      active: true,
      required: true
    }, {
      id: 20,
      title: 'Loan Details',
      baseLink: ['/mortgage-intent'],
      complete: false,
      active: false,
      required: true
    }, {
      id: 30,
      title: 'Primary Borrower Income',
      baseLink: ['/income'],
      complete: false,
      active: false,
      required: true
    }, {
      id: 40,
      title: 'Primary Borrower Assets',
      baseLink: ['/assets'],
      complete: false,
      active: false,
      required: true
    }, {
      id: 50,
      title: 'Questions we must ask',
      baseLink: ['/required-questions'],
      complete: false,
      active: false,
      required: true
    }, {
      id: 60,
      title: 'Co-Borrower Personal Information',
      baseLink: ['/co-borrower/welcome'],
      complete: false,
      active: false,
      required: false
    }, {
      id: 80,
      title: 'Co-Borrower Income',
      baseLink: ['/co-borrower/income'],
      complete: false,
      active: false,
      required: false
    }, {
      id: 90,
      title: 'Co-Borrower Assets',
      baseLink: ['/co-borrower/assets'],
      complete: false,
      active: false,
      required: false
    }, {
      id: 100,
      title: 'Co-Borrower questions we must ask',
      baseLink: ['/co-borrower/required-questions'],
      complete: false,
      active: false,
      required: false
    }, {
      id: 200,
      title: 'Co-Borrower Inquiry',
      baseLink: ['/co-borrower-inquiry'],
      complete: false,
      active: false,
      required: true
    }, {
      id: 300,
      title: 'Application Complete',
      baseLink: ['/confirm-submission'],
      complete: false,
      active: false,
      required: true
    }
  ]
};

export function reducer(state: NavigationState = initialNavigationState, action: Action) {
  switch (action.type) {
    case NavigationActions.COMPLETE_SECTION: {
      const payload = (action as NavigationActions.NavigationCompleteSectionAction).payload;
      const sections = [];
      state.sections.forEach((section: NavigationSectionState) => {
        sections.push(section.id === payload
          ? Object.assign({}, section, { complete: true })
          : section
        );
      });
      return { sections };
    }

    case NavigationActions.ACTIVATE_SECTION: {
      const payload = (action as NavigationActions.NavigationActivateSectionAction).payload;
      const sections = [];
      state.sections.forEach((section: NavigationSectionState) => {
        sections.push(section.id === payload
          ? Object.assign({}, section, { active: true })
          : Object.assign({}, section, { active: false })
        );
      });
      return { sections };
    }

    case NavigationActions.SECTIONS_UPDATE: {
      const payload = (action as NavigationActions.NavigationSectionsUpdateAction).payload;
      const sections = [];

      state.sections.forEach(currentSection => {
        const section = Object.assign({}, currentSection);
        if (section.id === 60 || section.id === 80 || section.id === 90 || section.id === 100) {
          // co-borrower sections
          section.required = payload !== 'borrower';
        } else {
          // borrower sections
          section.required = payload === 'borrower';
        }
        sections.push(section);
      });

      return { sections }
    }

    default: {
      return state;
    }
  }
}

export const getNavigationState = createFeatureSelector<NavigationState>('navigation');

export const getNavigationSectionsState = createSelector(
  getNavigationState,
  (state: NavigationState) => state && state.sections
);

export const getNavigationActiveSectionState = createSelector(
  getNavigationSectionsState,
  (sections: NavigationSectionState[]) => sections.find(section => section.active)
);

export const getNavigationActiveSectionTitleState = createSelector(
  getNavigationSectionsState,
  (sections: NavigationSectionState[]) => {
    const active = sections.find(section => section.active);
    return active && active.title ? active.title : null;
  }
);

export const getNavigationActiveSectionIdState = createSelector(
  getNavigationSectionsState,
  (sections: NavigationSectionState[]) => {
    const active = sections.find(section => section.active);
    return active && active.id || null;
  }
);

export const getNavigationPillsState = createSelector(
  getNavigationSectionsState,
  (sections: NavigationSectionState[]) => {
    const result = [];
    sections
      .filter(section => section.required)
      .forEach(section => result.push(section.complete ? 'solid' : 'empty'));
    return result;
  }
);
