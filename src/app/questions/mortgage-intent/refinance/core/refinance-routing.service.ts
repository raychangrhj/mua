import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import { RoutingValidatorsService } from '../../../../core/routing-validators.service';
import {
  getMortgagePrimaryResidenceState,
  getMortgagePrimaryUseState,
  getMortgagePropertyLocationState,
  getMortgageTypeState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { PropertyLocationState } from '../../shared/ngrx/reducers/property-location/property-location.reducer';
import {
  getRefinanceAppraisalState,
  getRefinanceIntentState,
  getRefinanceLoanAmountState,
  getRefinanceOweState,
  getRefinancePaymentState
} from '../ngrx/reducers/index.reducer';

@Injectable()
export class MortgageIntentRefinanceRoutingService {

  private mortgageType(): Promise<boolean> {
    return this.store.select(getMortgageTypeState)
      .take(1)
      .toPromise()
      .then(str => {
        return str === 'refinance';
      });
  }

  private intent(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getRefinanceIntentState)
  }

  private loans(): Promise<boolean> {
    // TODO come back to this one...
    return Promise.resolve(true);
    // return this.routingValidatorsService.validate<string>(getLoanIdState)
  }

  private location(): Promise<boolean> {
    return this.routingValidatorsService.validate<PropertyLocationState>(
      getMortgagePropertyLocationState,
      ['street', 'city', 'state', 'zip']
    )
  }

  private owe(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getRefinanceOweState)
  }

  private payments(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getRefinancePaymentState)
  }

  private appraisal(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getRefinanceAppraisalState)
  }

  private loanAmount(): Promise<boolean> {
    return this.routingValidatorsService.validate<number>(getRefinanceLoanAmountState)
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

  public validIntent(): Promise<boolean> {
    return Promise.all([
      this.mortgageType()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validLoans(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validLocation(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validOwe(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPayments(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validAppraisal(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe(),
      this.payments()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validLoanAmount(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe(),
      this.payments(),
      this.appraisal()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPrimaryResidence(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe(),
      this.payments(),
      this.appraisal(),
      this.loanAmount()
    ]).then(RoutingValidatorsService.promiseAll);
  };

  public validPrimaryUse(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe(),
      this.payments(),
      this.appraisal(),
      this.loanAmount(),
      this.primaryResidenceIsFalse()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validConfirm(): Promise<boolean> {
    return Promise.all([
      this.mortgageType(),
      this.intent(),
      this.loans(),
      this.location(),
      this.owe(),
      this.payments(),
      this.appraisal(),
      this.loanAmount(),
      this.primaryResidenceOrPrimaryUse(),
    ]).then(RoutingValidatorsService.promiseAll);
  }

  constructor (
    private routingValidatorsService: RoutingValidatorsService,
    protected store: Store<State>
  ) { }

}
