import { TestBed, inject } from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { RoutingValidatorsService } from './routing-validators.service';
import {
  getCustomerDOBState,
  getCustomerNameState,
  getCustomerPhoneState,
  reducers as customerReducers
} from '../questions/customer/shared/ngrx/reducers/index.reducer';
import { NameUpdateAction } from '../questions/customer/shared/ngrx/actions/name/name.action';
import { DOBUpdateAction } from '../questions/customer/shared/ngrx/actions/dob/dob.action';
import { reducers } from '../questions/mortgage-intent/shared/ngrx/reducers/index.reducer';

describe('RoutingValidatorsService', () => {
  let service;
  let store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          customer: combineReducers(customerReducers),
          mortgageIntent: combineReducers(reducers)
        })
      ],
      providers: [RoutingValidatorsService]
    });
  });

  beforeEach(inject([Store], (_store_) => {
    store = _store_;
  }));

  beforeEach(inject([RoutingValidatorsService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a static promiseAll method', () => {
    expect(RoutingValidatorsService.promiseAll).toEqual(jasmine.any(Function));
  });

  describe('promiseAll Method', () => {
    it('should return true if every boolean in the passed in array is true', () => {
      expect(RoutingValidatorsService.promiseAll([true, true, true, true, true])).toEqual(true);
    });

    it('should return false if any boolean in the passed in array is false', () => {
      expect(RoutingValidatorsService.promiseAll([true, true, true, false, true])).toEqual(false);
      expect(RoutingValidatorsService.promiseAll([true, true, false, false, true])).toEqual(false);
      expect(RoutingValidatorsService.promiseAll([false, true, true, true, true])).toEqual(false);
      expect(RoutingValidatorsService.promiseAll([false, true, true, true, false])).toEqual(false);
    });
  });

  it('should have a validate method', () => {
    expect(service.validate).toEqual(jasmine.any(Function));
  });

  describe('validate method with a primitive selector', () => {
    it('should return a promise based boolean of the given selector', () => {
      service.validate(getCustomerDOBState).then(bool => {
        expect(bool).toEqual(false);
      });

      store.dispatch(new DOBUpdateAction('10/10/10'));
      service.validate(getCustomerPhoneState).then(bool => {
        expect(bool).toEqual(true);
      });
    });
  });

  describe('validate method with an object selector', () => {
    it('should return a promise based boolean of the given selector and keys', () => {
      service.validate(getCustomerNameState, ['first', 'last']).then(bool => {
        expect(bool).toEqual(false);
      });

      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: 'last'
      }));
      service.validate(getCustomerNameState, ['first', 'last']).then(bool => {
        expect(bool).toEqual(true);
      });

      store.dispatch(new NameUpdateAction({
        first: 'first',
        last: null
      }));
      service.validate(getCustomerNameState, ['first', 'last']).then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });
});
