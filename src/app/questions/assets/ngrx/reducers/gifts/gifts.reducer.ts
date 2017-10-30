import * as GiftActions from '../../actions/gifts/gifts.action';

export type Action = GiftActions.ALL;

export interface GiftStateObject {
  id?: number;
  who?: string;
  relationship?: string;
  amount?: number;
}

export const initialGiftStateObject: GiftStateObject = {
  who: null,
  relationship: null,
  amount: null
};

export function reducer(state: GiftStateObject[] = [], action: Action) {
  switch (action.type) {
    case GiftActions.ADD: {
      return [
        (action as GiftActions.GiftAddAction).payload,
        ...state,
      ];
    }

    case GiftActions.DELETE: {
      const payload = (action as GiftActions.GiftDeleteAction).payload;
      const index = state.findIndex(item => Object.is(item, payload));
      return index > -1
        ? [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
        : state;
    }

    case GiftActions.UPDATE: {
      const payload = (action as GiftActions.GiftUpdateAction).payload;
      const gift = (action as GiftActions.GiftUpdateAction).gift;
      const index = state.findIndex(item => Object.is(item, gift));
      return index > -1
        ? [
          ...state.slice(0, index),
          payload,
          ...state.slice(index + 1)
        ]
        : state;
    }

    default: {
      return state;
    }
  }
}
