import * as IntentActions from '../../actions/intent/intent.action';

export type Action = IntentActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case IntentActions.UPDATE: {
      return (action as IntentActions.IntentUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
