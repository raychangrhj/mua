import * as action from '../owed/owed.action';

describe('Owed Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Owed] Update');
  });

  it('should export an action class', () => {
    expect(action.OwedUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.OwedUpdateAction(state);
    });
    it('should expose a owe payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
