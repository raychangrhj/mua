import { State } from './index.reducer';
import * as reducer from './index.reducer';
import * as fromIntent from '../reducers/intent/intent.reducer';
import * as fromOwe from '../reducers/owed/owed.reducer';
import * as fromPayment from '../reducers/payments/payment.reducer';
import * as fromAppraisal from '../reducers/appraisal/appraisal.reducer';
import * as fromLoanAmount from '../reducers/loan-amount/loan-amount.reducer';

describe('Index Refinance Reducer', () => {
  let stateData: State;
  beforeEach(() => {
    stateData = {
      refinance: {
        intent: 'intent',
        owe: 111,
        payment: 222,
        appraisal: 333,
        loanAmount: 444
      }
    }
  });

  it('should export a reducers object of all the reducer function', () => {
    expect(reducer.reducers).toEqual({
      intent: fromIntent.reducer,
      owe: fromOwe.reducer,
      payment: fromPayment.reducer,
      appraisal: fromAppraisal.reducer,
      loanAmount: fromLoanAmount.reducer
    });
  });

  it('should export a getRefinanceState', () => {
    expect(reducer.getRefinanceState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinanceState(stateData);
    expect(result).toEqual(stateData.refinance);
  });

  it('should export a getRefinanceIntentState', () => {
    expect(reducer.getRefinanceIntentState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinanceIntentState(stateData);
    expect(result).toEqual(stateData.refinance.intent);
  });

  it('should export a getRefinanceOweState', () => {
    expect(reducer.getRefinanceOweState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinanceOweState(stateData);
    expect(result).toEqual(stateData.refinance.owe);
  });

  it('should export a getRefinancePaymentState', () => {
    expect(reducer.getRefinancePaymentState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinancePaymentState(stateData);
    expect(result).toEqual(stateData.refinance.payment);
  });

  it('should export a getRefinanceAppraisalState', () => {
    expect(reducer.getRefinanceAppraisalState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinanceAppraisalState(stateData);
    expect(result).toEqual(stateData.refinance.appraisal);
  });

  it('should export a getRefinanceLoanAmountState', () => {
    expect(reducer.getRefinanceLoanAmountState).toEqual(jasmine.any(Function));
    const result = reducer.getRefinanceLoanAmountState(stateData);
    expect(result).toEqual(stateData.refinance.loanAmount);
  });
});
