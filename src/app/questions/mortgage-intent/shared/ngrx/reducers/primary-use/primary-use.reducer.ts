import * as PrimaryUseAction from '../../actions/primary-use/primary-use.action';

export type Action = PrimaryUseAction.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case PrimaryUseAction.UPDATE: {
      return (action as PrimaryUseAction.PrimaryUseUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
