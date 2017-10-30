import * as LoanAmountActions from '../../actions/loan-amount/loan-amount.action';

export type Action = LoanAmountActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case LoanAmountActions.UPDATE: {
      return (action as LoanAmountActions.LoanAmountUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
