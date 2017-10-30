import { Injectable } from '@angular/core';

import { RoutingValidatorsService } from '../../../core/routing-validators.service';
import { CustomerRoutingService } from '../../customer/core/customer-routing.service';

@Injectable()
export class MortgageIntentRoutingService {

  private mortgageIntent(): Promise<boolean> {
    return this.customerRoutingService.validConfirm();
  }

  public validMortgageIntent(): Promise<boolean> {
    return Promise.all([
      this.mortgageIntent()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  constructor (
    private customerRoutingService: CustomerRoutingService
  ) { }

}
