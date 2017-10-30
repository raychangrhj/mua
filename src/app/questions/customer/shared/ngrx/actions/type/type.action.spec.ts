import * as action from './type.action';

describe('Type Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Type] Update');
  });

  it('should export an action class', () => {
    expect(action.TypeUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'existing';
      testObj = new action.TypeUpdateAction(state);
    });
    it('should expose a string payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
