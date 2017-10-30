import * as AddressActions from '../../actions/address/address.action';

export type Action = AddressActions.ALL;

export interface AddressState {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}

export const initialAddressState: AddressState = {
  street: null,
  city: null,
  state: null,
  zip: null
};

export function reducer(state: AddressState = initialAddressState, action: Action) {
  switch (action.type) {
    case AddressActions.UPDATE: {
      return (action as AddressActions.AddressUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
