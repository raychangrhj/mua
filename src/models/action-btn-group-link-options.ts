import { QueryParamsHandling } from '@angular/router/src/config';

export interface ActionBtnGroupLinkOptions {
  cancel?: ActionBtnGroupBackLinkObject;
  back?: ActionBtnGroupBackLinkObject;
  next?: string | boolean;
  save?: string | boolean;
  saveAndExit?: ActionBtnGroupSaveAndExitLinkObject | boolean;
}

export interface ActionBtnGroupSaveAndExitLinkObject {
  text?: string;
  link?: ActionBtnGroupLink
}

export interface ActionBtnGroupBackLinkObject {
  text?: string;
  link: ActionBtnGroupLink
}

export interface ActionBtnGroupLink {
  routerLink: any[] | string;
  queryParams?: {[k: string]: any};
  fragment?: string;
  queryParamsHandling?: QueryParamsHandling;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
}
