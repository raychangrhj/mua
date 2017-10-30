import * as action from '../payments/payment.action';

describe('Payment Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Payment] Update');
  });

  it('should export an action class', () => {
    expect(action.PaymentUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.PaymentUpdateAction(state);
    });
    it('should expose a payment payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
