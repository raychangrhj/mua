import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

@Injectable()
export class CanActivateQuestionsMortgageIntentPrimaryResidence implements CanActivate {
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validPrimaryResidence();
  }

  constructor(private routingService: MortgageIntentBuyingRoutingService) { }
}

