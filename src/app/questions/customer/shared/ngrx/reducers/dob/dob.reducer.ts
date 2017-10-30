import * as DOBActions from '../../actions/dob/dob.action';

export type Action = DOBActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case DOBActions.UPDATE: {
      return (action as DOBActions.DOBUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
