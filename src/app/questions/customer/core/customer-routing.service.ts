import { Injectable } from '@angular/core';

import {
  getCustomerAddressInfoState,
  getCustomerAddressState,
  getCustomerDOBState,
  getCustomerEmailState,
  getCustomerMaritalStatusState,
  getCustomerNameState,
  getCustomerPhoneState,
  getCustomerSSNState
} from '../shared/ngrx/reducers/index.reducer';
import { NameState } from '../shared/ngrx/reducers/name/name.reducer';
import { RoutingValidatorsService } from '../../../core/routing-validators.service';
import { AddressState } from '../shared/ngrx/reducers/address/address.reducer';
import { PhoneState } from '../shared/ngrx/reducers/phone/phone.reducer';

@Injectable()
export class CustomerRoutingService {

  private name(): Promise<boolean> {
    return this.routingValidatorsService.validate<NameState>(
      getCustomerNameState,
      ['first', 'last']
    );
  }

  private phone(): Promise<boolean> {
    return this.routingValidatorsService.validate<PhoneState>(
      getCustomerPhoneState,
      ['number', 'type']
    );
  }

  private email(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getCustomerEmailState);
  }

  private dob(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getCustomerDOBState);
  }

  private ssn(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getCustomerSSNState);
  }

  private address(): Promise<boolean> {
    return this.routingValidatorsService.validate<AddressState>(
      getCustomerAddressState,
      ['street', 'city', 'state', 'zip']
    );
  }

  private addressInfo(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getCustomerAddressInfoState);
  }

  private maritalStatus(): Promise<boolean> {
    return this.routingValidatorsService.validate<string>(getCustomerMaritalStatusState);
  }

  public validName(): Promise<boolean> {
    return Promise.all([
      true
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validPhone(): Promise<boolean> {
    return Promise.all([
      this.name()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validEmail(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  public validDOB(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validSSN(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validAddress(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob(),
      this.ssn()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validAddressInfo(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob(),
      this.ssn(),
      this.address()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validMaritalStatus(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob(),
      this.ssn(),
      this.address(),
      this.addressInfo()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validConfirm(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob(),
      this.ssn(),
      this.address(),
      this.addressInfo(),
      this.maritalStatus()
    ]).then(RoutingValidatorsService.promiseAll)
  }

  public validConfirmAddress(): Promise<boolean> {
    return Promise.all([
      this.name(),
      this.phone(),
      this.email(),
      this.dob(),
      this.ssn()
    ]).then(RoutingValidatorsService.promiseAll);
  }

  constructor (private routingValidatorsService: RoutingValidatorsService) { }

}
