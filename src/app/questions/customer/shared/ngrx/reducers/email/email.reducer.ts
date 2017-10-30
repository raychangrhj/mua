import * as EmailActions from '../../actions/email/email.action';

export type Action = EmailActions.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case EmailActions.UPDATE: {
      return (action as EmailActions.EmailUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
