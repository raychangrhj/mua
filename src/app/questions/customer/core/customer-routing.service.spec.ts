import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { CustomerRoutingService } from './customer-routing.service';
import { reducers } from '../shared/ngrx/reducers/index.reducer';
import { NameUpdateAction } from '../shared/ngrx/actions/name/name.action';
import { PhoneUpdateAction } from '../shared/ngrx/actions/phone/phone.action';
import { EmailUpdateAction } from '../shared/ngrx/actions/email/email.action';
import { DOBUpdateAction } from '../shared/ngrx/actions/dob/dob.action';
import { SSNUpdateAction } from '../shared/ngrx/actions/ssn/ssn.action';
import { RoutingValidatorsService } from '../../../core/routing-validators.service';
import { AddressUpdateAction } from '../shared/ngrx/actions/address/address.action';
import { AddressInfoUpdateAction } from '../shared/ngrx/actions/address-info/address-info.action';
import { MaritalStatusUpdateAction } from '../shared/ngrx/actions/marital-status/marital-status.action';

describe('CustomerRoutingService', () => {
  let store;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          customer: combineReducers(reducers),
        })
      ],
      providers: [
        CustomerRoutingService,
        RoutingValidatorsService
      ]
    });
  });

  beforeEach(inject([Store], (_store_) => {
    store = _store_;
  }));

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the validName method', () => {
    expect(service.validName).toEqual(jasmine.any(Function));
  });

  describe('validName', () => {
    it('should return true', () => {
      service.validName().then(bool => {
        expect(bool).toEqual(true);
      });
    });
  });

  it('should have the validPhone method', () => {
    expect(service.validPhone).toEqual(jasmine.any(Function));
  });

  describe('validPhone', () => {
    it('should return true, data store has: first & last name', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));

      service.validPhone().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      service.validPhone().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validEmail method', () => {
    expect(service.validEmail).toEqual(jasmine.any(Function));
  });

  describe('validEmail', () => {
    it('should return true, data store has: first & last name, and phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));

      service.validEmail().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));

      service.validEmail().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));

      service.validEmail().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validDOB method', () => {
    expect(service.validDOB).toEqual(jasmine.any(Function));
  });

  describe('validDOB', () => {
    it('should return true, data store has: first & last name, phone, and email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));

      service.validDOB().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));

      service.validDOB().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));

      service.validDOB().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));

      service.validDOB().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validSSN method', () => {
    expect(service.validSSN).toEqual(jasmine.any(Function));
  });

  describe('validSSN', () => {
    it('should return true, data store has: first & last name, phone, email, and DOB', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validSSN().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validSSN().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validSSN().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validSSN().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));

      service.validSSN().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validAddress method', () => {
    expect(service.validAddress).toEqual(jasmine.any(Function));
  });

  describe('validAddress', () => {
    it('should return true, data store has: first & last name, phone, email, DOB, and SSN', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: ssn', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validConfirmAddress method', () => {
    expect(service.validConfirmAddress).toEqual(jasmine.any(Function));
  });

  describe('validConfirmAddress', () => {
    it('should return true, data store has: first & last name, phone, email, DOB, and SSN', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: ssn', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));

      service.validConfirmAddress().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validAddressInfo method', () => {
    expect(service.validAddressInfo).toEqual(jasmine.any(Function));
  });

  describe('validAddressInfo', () => {
    it('should return true, data store has: first & last name, phone, email, DOB, and SSN', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: ssn', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: address', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));

      service.validAddressInfo().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validMaritalStatus method', () => {
    expect(service.validMaritalStatus).toEqual(jasmine.any(Function));
  });

  describe('validMaritalStatus', () => {
    it('should return true, data store has: first & last name, phone, email, DOB, and SSN', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: ssn', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: address', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: addressInfo', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validMaritalStatus().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validConfirm method', () => {
    expect(service.validConfirm).toEqual(jasmine.any(Function));
  });

  describe('validConfirm', () => {
    it('should return true, data store has: first & last name, phone, email, DOB, and SSN', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store missing: first & last name', () => {
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: phone', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: email', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: dob', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: ssn', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: address', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: addressInfo', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new MaritalStatusUpdateAction('married'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: marital status', () => {
      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      store.dispatch(new PhoneUpdateAction({
        number: '555-555-5555',
        type: 'cell'
      }));
      store.dispatch(new EmailUpdateAction('calvin@cox.com'));
      store.dispatch(new DOBUpdateAction('2010-10-10'));
      store.dispatch(new SSNUpdateAction('555-55-5555'));
      store.dispatch(new AddressUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new AddressInfoUpdateAction('2010-10'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });
});
