import * as action from './mortgage-type.action';

describe('Mortgage Type Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Type] Update');
  });

  it('should export an action class', () => {
    expect(action.MortgageTypeUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'buying';
      testObj = new action.MortgageTypeUpdateAction(state);
    });
    it('should expose a AddressState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
