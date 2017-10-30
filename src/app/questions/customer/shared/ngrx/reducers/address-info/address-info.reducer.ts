import * as AddressInfoAction from '../../actions/address-info/address-info.action';

export type Action = AddressInfoAction.ALL;

export function reducer(state: string = null, action: Action) {
  switch (action.type) {
    case AddressInfoAction.UPDATE: {
      return (action as AddressInfoAction.AddressInfoUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
