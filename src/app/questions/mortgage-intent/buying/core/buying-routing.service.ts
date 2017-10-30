import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import { RoutingValidatorsService } from '../../../../core/routing-validators.service';
import {
  getMortgageCostState,
  getMortgageDownPaymentState,
  getMortgagePrimaryResidenceState,
  getMortgagePrimaryUseState,
  getMortgagePropertyLocationState,
  getMortgageTypeState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { PropertyLocationState } from '../../shared/ngrx/reducers/property-location/property-location.reducer';

@Injectable()
export class MortgageIntentBuyingRoutingService {

  private mortgageType(): Promise<boolean> {
    return this.store.select(getMortgageTypeState)
      .take(1)
      .toPromise()
      .then(str => {
        return str === 'buy';
      });
  }

  private property(): Promise<boolean> {
    return Promise.resolve(true);
  }

  private location(): Promise<boolean> {
    return this.routingValidatorsService.validate<PropertyLocationState>(
      getMortgagePropertyLocationState,
      ['street', 'city', 'state', 'zip']
    )
  }

  private cost(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getMortgageCostState)
  }

  private downPayment(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getMortgageDownPaymentState)
  }

  private primaryResidenceIsFalse(): Promise<boolean> {
    return this.store.select(getMortgagePrimaryResidenceState)
      .take(1)
      .toPromise()
      .then(bool => bool !== undefined && bool !== null && !bool);
  }

  private primaryResidenceOrPrimaryUse(): Promise<boolean> {
    return this.primaryResidenceIsFalse().then(bool => {
      return bool
        ? this.routingValidatorsService.validate<string>(getMortgagePrimaryUseState)
        : true;
    });
  }

  public validProperty(): Promise<boolean> {
    return Promise.all([
      this.mortgageType()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPropertyLocation(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validConfirmLocation(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validCost(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validDownPayment(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location(),
      this.cost()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validConfirmLoanAmount(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location(),
      this.cost(),
      this.downPayment()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPrimaryResidence(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location(),
      this.cost(),
      this.downPayment()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPrimaryUse(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location(),
      this.cost(),
      this.downPayment(),
      this.primaryResidenceIsFalse()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validConfirm(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.property(),
      this.location(),
      this.cost(),
      this.downPayment(),
      this.primaryResidenceOrPrimaryUse(),
    ]).then(RoutingValidatorsService.promiseAll);
  }

  constructor (
    private routingValidatorsService: RoutingValidatorsService,
    protected store: Store<State>
  ) { }

}
