import * as PropertyActions from '../../actions/property-location/property-location.action';

export type Action = PropertyActions.ALL;

export interface PropertyLocationState {
  street: string;
  unit?: string;
  city: string;
  county: string;
  state: string;
  zip: string;
}

export const initialPropertyState: PropertyLocationState = {
  street: null,
  unit: null,
  city: null,
  county: null,
  state: null,
  zip: null
};

export function reducer(state: PropertyLocationState = initialPropertyState, action: Action) {
  switch (action.type) {
    case PropertyActions.UPDATE: {
      return (action as PropertyActions.PropertyLocationUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
