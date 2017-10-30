import * as PrimaryResidenceActions from '../../actions/primary-residence/primary-residence.action';

export type Action = PrimaryResidenceActions.ALL;

export function reducer(state: boolean = null, action: Action) {
  switch (action.type) {
    case PrimaryResidenceActions.UPDATE: {
      return (action as PrimaryResidenceActions.PrimaryResidenceUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
