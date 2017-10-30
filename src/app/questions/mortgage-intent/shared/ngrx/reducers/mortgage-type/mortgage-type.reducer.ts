import * as MortgageTypeActions from '../../actions/mortgage-type/mortgage-type.action';

export type Action = MortgageTypeActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case MortgageTypeActions.UPDATE: {
      return (action as MortgageTypeActions.MortgageTypeUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
