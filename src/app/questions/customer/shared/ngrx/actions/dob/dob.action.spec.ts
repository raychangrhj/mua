import * as action from './dob.action';

describe('DOB Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer DOB] Update');
  });

  it('should export an action class', () => {
    expect(action.DOBUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = '2012-12-12';
      testObj = new action.DOBUpdateAction(state);
    });
    it('should expose a DOBState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
