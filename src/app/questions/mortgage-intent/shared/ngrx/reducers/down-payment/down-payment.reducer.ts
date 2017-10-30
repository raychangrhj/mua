import * as DownPaymentActions from '../../actions/down-payment/down-payment.action';

export type Action = DownPaymentActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case DownPaymentActions.UPDATE: {
      return (action as DownPaymentActions.DownPaymentUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
