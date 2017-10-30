import * as action from './down-payment.action';

describe('Down Payment Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Buying Down Payment] Update');
  });

  it('should export an action class', () => {
    expect(action.DownPaymentUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.DownPaymentUpdateAction(state);
    });
    it('should expose a down payment payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
