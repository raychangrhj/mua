import * as action from './navigation.action';

describe('Navigation Action', () => {
  it('should export a constant for type description', () => {
    expect(action.COMPLETE_SECTION).toEqual('[Navigation] Section Status Update');
  });

  it('should export an action class', () => {
    expect(action.NavigationCompleteSectionAction).toEqual(jasmine.any(Function));
  });

  describe('the COMPLETE_SECTION action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 20;
      testObj = new action.NavigationCompleteSectionAction(state);
    });
    it('should expose a NavigationSectionState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of COMPLETE_SECTION', () => {
      expect(testObj.type).toEqual(action.COMPLETE_SECTION);
    });
  });

  it('should export an action class', () => {
    expect(action.NavigationActivateSectionAction).toEqual(jasmine.any(Function));
  });

  describe('the ACTIVATE_SECTION action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 50;
      testObj = new action.NavigationActivateSectionAction(state);
    });
    it('should expose a NavigationActivateSectionAction payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of ACTIVATE_SECTION', () => {
      expect(testObj.type).toEqual(action.ACTIVATE_SECTION);
    });
  });
});
