import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsNewCustomerSSN } from './ssn.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsNewCustomerSSN', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsNewCustomerSSN,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validSSN'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsNewCustomerSSN], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validSSN', () => {
      service.validSSN.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validSSN).toHaveBeenCalledWith();
        expect(service.validSSN).toHaveBeenCalledTimes(1);
      });

      service.validSSN.calls.reset();
      service.validSSN.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validSSN).toHaveBeenCalledWith();
        expect(service.validSSN).toHaveBeenCalledTimes(1);
      });
    });
  });
});
