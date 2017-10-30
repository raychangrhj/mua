import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsNewCustomerPhone } from './phone.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsNewCustomerPhone', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsNewCustomerPhone,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validPhone'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsNewCustomerPhone], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validPhone', () => {
      service.validPhone.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validPhone).toHaveBeenCalledWith();
        expect(service.validPhone).toHaveBeenCalledTimes(1);
      });

      service.validPhone.calls.reset();
      service.validPhone.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validPhone).toHaveBeenCalledWith();
        expect(service.validPhone).toHaveBeenCalledTimes(1);
      });
    });
  });
});
