import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

@Injectable()
export class CanActivateQuestionsMortgageIntentConfirmLocation implements CanActivate {
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validConfirmLocation();
  }

  constructor(private routingService: MortgageIntentBuyingRoutingService) { }
}

