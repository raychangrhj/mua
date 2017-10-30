import * as AppraisalActions from '../../actions/appraisal/appraisal.action';

export type Action = AppraisalActions.ALL;

export function reducer(state: number = null, action: Action) {
  switch (action.type) {
    case AppraisalActions.UPDATE: {
      return (action as AppraisalActions.AppraisalUpdateAction).payload;
    }

    default: {
      return state;
    }
  }
}
