import { ActionBtnGroupLinkOptions } from './action-btn-group-link-options';
import { ConfirmAnswer } from './confirm-answer';

export interface DefaultRouteData {
  saveAction?: any[];
  actionBtnGroupLinkOptions?: ActionBtnGroupLinkOptions,
}

export interface ConfirmRouteData extends DefaultRouteData {
  answers: ConfirmAnswer[];
}
