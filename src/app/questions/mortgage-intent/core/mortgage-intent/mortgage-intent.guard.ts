import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MortgageIntentRoutingService } from '../mortgage-intent-routing.service';

@Injectable()
export class CanActivateQuestionsMortgageIntent implements CanActivate {
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validMortgageIntent();
  }

  constructor(private routingService: MortgageIntentRoutingService) { }
}

