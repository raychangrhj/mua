import * as NameActions from '../../actions/name/name.action';

export type Action = NameActions.ALL;

export interface NameState {
  first: string;
  middle?: string;
  last: string;
  suffix?: string;
}

export const initialNameState: NameState = {
  first: null,
  last: null
};

export function reducer(state: NameState = initialNameState, action: Action) {
  switch (action.type) {
    case NameActions.UPDATE: {
      return (action as NameActions.NameUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
