import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsNewCustomerEmail } from './email.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsNewCustomerEmail', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsNewCustomerEmail,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validEmail'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsNewCustomerEmail], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validEmail', () => {
      service.validEmail.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validEmail).toHaveBeenCalledWith();
        expect(service.validEmail).toHaveBeenCalledTimes(1);
      });

      service.validEmail.calls.reset();
      service.validEmail.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validEmail).toHaveBeenCalledWith();
        expect(service.validEmail).toHaveBeenCalledTimes(1);
      });
    });
  });
});
