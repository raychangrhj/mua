import * as action from './intent.action';

describe('Intent Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Intent] Update');
  });

  it('should export an action class', () => {
    expect(action.IntentUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = '2012-12-12';
      testObj = new action.IntentUpdateAction(state);
    });
    it('should expose a Intent payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
