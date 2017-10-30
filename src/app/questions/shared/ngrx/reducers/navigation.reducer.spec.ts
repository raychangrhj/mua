import * as reducer from './navigation.reducer';

import { Test } from '../../../../../test/test.action';
import {
  NavigationActivateSectionAction,
  NavigationCompleteSectionAction
} from '../actions/navigation.action';

describe('Navigation Reducer', () => {
  it('should export an initial navigation state', () => {
    expect(reducer.initialNavigationState).toEqual({
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
    });
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a COMPLETE_SECTION action', () => {
      const payload = 10;
      const result = reducer.reducer(undefined, new NavigationCompleteSectionAction(payload));
      const equals = JSON.parse(JSON.stringify(reducer.initialNavigationState));
      equals.sections[0].complete = true;
      expect(result).toEqual(equals);
    });

    it('should not mutate the existing state', () => {
      const initState = reducer.initialNavigationState;
      let payload = 10;
      let result = reducer.reducer(initState, new NavigationCompleteSectionAction(payload));
      expect(result).not.toBe(initState);

      payload = 20;
      result = reducer.reducer(initState, new NavigationActivateSectionAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the payload of a ACTIVATE_SECTION action', () => {
      const payload = 20;
      const result = reducer.reducer(undefined, new NavigationActivateSectionAction(payload));
      const equals = JSON.parse(JSON.stringify(reducer.initialNavigationState));
      equals.sections[0].complete = false;
      equals.sections[0].active = false;
      equals.sections[1].active = true;

      expect(result).toEqual(equals);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(reducer.initialNavigationState, new Test());
      expect(result).toEqual(reducer.initialNavigationState);
    });
  });

  it('should export a getNavigationState', () => {
    expect(reducer.getNavigationState).toEqual(jasmine.any(Function));
    const result = reducer.getNavigationState({
      navigation: reducer.initialNavigationState
    });
    expect(result).toEqual(reducer.initialNavigationState);
  });

  it('should export a getNavigationSectionsState', () => {
    expect(reducer.getNavigationSectionsState).toEqual(jasmine.any(Function));
    const result = reducer.getNavigationSectionsState({
      navigation: reducer.initialNavigationState
    });
    expect(result).toEqual(reducer.initialNavigationState.sections);
  });

  it('should export a getNavigationActiveSectionState', () => {
    expect(reducer.getNavigationActiveSectionState).toEqual(jasmine.any(Function));
    const result = reducer.getNavigationActiveSectionState({
      navigation: reducer.initialNavigationState
    });
    expect(result).toEqual(reducer.initialNavigationState.sections[0]);
  });

  it('should export a getNavigationPillsState', () => {
    expect(reducer.getNavigationPillsState).toEqual(jasmine.any(Function));
    const navigation = JSON.parse(JSON.stringify(reducer.initialNavigationState));
    navigation.sections = navigation.sections.filter(section => section.required);
    navigation.sections[0].complete = true;
    const result = reducer.getNavigationPillsState({
      navigation
    });
    const end = [];
    navigation.sections.forEach(section => {
      end.push(section.complete ? 'solid' : 'empty');
    });
    expect(result).toEqual(end);
  });

  it('should export a getNavigationActiveSectionTitleState', () => {
    expect(reducer.getNavigationActiveSectionTitleState).toEqual(jasmine.any(Function));
    const result = reducer.getNavigationActiveSectionTitleState({
      navigation: reducer.initialNavigationState
    });
    expect(result).toEqual(reducer.initialNavigationState.sections[0].title);

    expect(reducer.getNavigationActiveSectionTitleState).toEqual(jasmine.any(Function));
    const result2 = reducer.getNavigationActiveSectionTitleState({
      navigation: {
        sections: [reducer.initialNavigationState.sections[2]]
      }
    });
    expect(result2).toEqual(null);
  });
});
