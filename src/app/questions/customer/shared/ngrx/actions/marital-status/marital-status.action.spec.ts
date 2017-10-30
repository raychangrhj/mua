import * as action from '../marital-status/marital-status.action';

describe('MaritalStatus Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Marital Status] Update');
  });

  it('should export an action class', () => {
    expect(action.MaritalStatusUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'phone';
      testObj = new action.MaritalStatusUpdateAction(state);
    });
    it('should expose a MaritalStatusState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
