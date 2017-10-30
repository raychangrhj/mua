import * as action from '../appraisal/appraisal.action';

describe('Appraisal Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Appraisal] Update');
  });

  it('should export an action class', () => {
    expect(action.AppraisalUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.AppraisalUpdateAction(state);
    });
    it('should expose an appraisal payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
