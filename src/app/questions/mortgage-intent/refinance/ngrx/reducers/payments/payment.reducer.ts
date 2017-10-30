import * as PaymentActions from '../../actions/payments/payment.action';

export type Action = PaymentActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case PaymentActions.UPDATE: {
      return (action as PaymentActions.PaymentUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
