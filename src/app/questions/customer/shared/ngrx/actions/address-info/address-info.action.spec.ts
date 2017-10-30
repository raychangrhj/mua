import * as action from '../address-info/address-info.action';

describe('AddressInfo Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Address Info] Update');
  });

  it('should export an action class', () => {
    expect(action.AddressInfoUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = '2012-02-02';
      testObj = new action.AddressInfoUpdateAction(state);
    });
    it('should expose a AddressInfoState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
