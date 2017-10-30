import * as PhoneActions from '../../actions/phone/phone.action';

export type Action = PhoneActions.ALL;

export interface PhoneState {
  type: string;
  number: string;
}

export const initialPhoneState = {
  type: null,
  number: null
};

export function reducer(state: PhoneState = initialPhoneState, action: Action) {
  switch (action.type) {
    case PhoneActions.UPDATE: {
      return (action as PhoneActions.PhoneUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
