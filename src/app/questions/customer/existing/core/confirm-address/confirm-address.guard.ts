import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

@Injectable()
export class CanActivateQuestionsExistingCustomerConfirmAddress implements CanActivate {
  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.routingService.validConfirmAddress();
  }

  constructor(private routingService: CustomerRoutingService) { }
}

