import * as OwedActions from '../../actions/owed/owed.action';

export type Action = OwedActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case OwedActions.UPDATE: {
      return (action as OwedActions.OwedUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
