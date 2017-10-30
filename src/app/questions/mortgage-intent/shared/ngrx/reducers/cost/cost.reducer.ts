import * as CostActions from '../../actions/cost/cost.action';

export type Action = CostActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case CostActions.UPDATE: {
      return (action as CostActions.CostUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
