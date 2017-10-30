import * as action from '../primary-use/primary-use.action';

describe('PrimaryUse Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Primary Use] Update');
  });

  it('should export an action class', () => {
    expect(action.PrimaryUseUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'vacation';
      testObj = new action.PrimaryUseUpdateAction(state);
    });
    it('should expose a primary use payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
