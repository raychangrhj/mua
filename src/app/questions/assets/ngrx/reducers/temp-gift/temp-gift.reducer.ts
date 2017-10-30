import * as TempGiftActions from '../../actions/temp-gifts/temp-gifts.action';
import {
  initialGiftStateObject,
  GiftStateObject
} from '../gifts/gifts.reducer';

export type Action = TempGiftActions.ALL;

export function reducer(state: GiftStateObject = initialGiftStateObject, action: Action) {
  switch (action.type) {
    case TempGiftActions.UPDATE_WHO: {
      const payload = (action as TempGiftActions.TempGiftWhoUpdateAction).payload;
      return Object.assign({}, state, {
        who: payload
      });
    }

    case TempGiftActions.UPDATE_RELATIONSHIP: {
      const payload = (action as TempGiftActions.TempGiftRelationshipUpdateAction).payload;
      return Object.assign({}, state, {
        relationship: payload
      });
    }

    case TempGiftActions.UPDATE_AMOUNT: {
      const payload = (action as TempGiftActions.TempGiftAmountUpdateAction).payload;
      return Object.assign({}, state, {
        amount: payload
      });
    }

    case TempGiftActions.CLEAR: {
      return initialGiftStateObject;
    }

    default: {
      return state;
    }
  }
}

export const getTempWho = (state: GiftStateObject) => state && state.who;
export const getTempRelationship = (state: GiftStateObject) => state && state.relationship;
export const getTempAmount = (state: GiftStateObject) => state && state.amount;
