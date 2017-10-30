import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsNewCustomerDOB } from './dob.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsNewCustomerSSN', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsNewCustomerDOB,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validDOB'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsNewCustomerDOB], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validDOB', () => {
      service.validDOB.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validDOB).toHaveBeenCalledWith();
        expect(service.validDOB).toHaveBeenCalledTimes(1);
      });

      service.validDOB.calls.reset();
      service.validDOB.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validDOB).toHaveBeenCalledWith();
        expect(service.validDOB).toHaveBeenCalledTimes(1);
      });
    });
  });
});
