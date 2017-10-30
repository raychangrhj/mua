import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

@Injectable()
export class CanActivateQuestionsMortgageIntentCost implements CanActivate {
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validCost();
  }

  constructor(private routingService: MortgageIntentBuyingRoutingService) { }
}

