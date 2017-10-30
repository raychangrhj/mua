import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

@Injectable()
export class CanActivateQuestionsMortgageIntentOwe implements CanActivate {
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validOwe();
  }

  constructor(private routingService: MortgageIntentRefinanceRoutingService) { }
}

