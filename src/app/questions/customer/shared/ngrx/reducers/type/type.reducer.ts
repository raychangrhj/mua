import * as TypeActions from '../../actions/type/type.action';

export type Action = TypeActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case TypeActions.UPDATE: {
      return (action as TypeActions.TypeUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
