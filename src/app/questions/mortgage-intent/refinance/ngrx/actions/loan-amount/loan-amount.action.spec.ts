import * as action from '../loan-amount/loan-amount.action';

describe('Loan Amount Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Loan Amount] Update');
  });

  it('should export an action class', () => {
    expect(action.LoanAmountUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.LoanAmountUpdateAction(state);
    });
    it('should expose a loan amount payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
