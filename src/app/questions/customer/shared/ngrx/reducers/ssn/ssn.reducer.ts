import * as SSNAction from '../../actions/ssn/ssn.action';

export type Action = SSNAction.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case SSNAction.UPDATE: {
      return (action as SSNAction.SSNUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
