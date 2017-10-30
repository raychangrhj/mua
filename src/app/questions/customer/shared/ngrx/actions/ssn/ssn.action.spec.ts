import * as action from './ssn.action';

describe('SSN Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer SSN] Update');
  });

  it('should export an action class', () => {
    expect(action.SSNUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'ssn';
      testObj = new action.SSNUpdateAction(state);
    });
    it('should expose a SSNState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
