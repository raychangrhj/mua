import * as MaritalStatusActions from '../../actions/marital-status/marital-status.action';

export type Action = MaritalStatusActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case MaritalStatusActions.UPDATE: {
      return (action as MaritalStatusActions.MaritalStatusUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
