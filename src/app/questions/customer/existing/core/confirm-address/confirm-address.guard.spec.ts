import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsExistingCustomerConfirmAddress } from './confirm-address.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsExistingCustomerConfirmAddress', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsExistingCustomerConfirmAddress,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validConfirmAddress'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsExistingCustomerConfirmAddress], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validConfirmAddress', () => {
      service.validConfirmAddress.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validConfirmAddress).toHaveBeenCalledWith();
        expect(service.validConfirmAddress).toHaveBeenCalledTimes(1);
      });

      service.validConfirmAddress.calls.reset();
      service.validConfirmAddress.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validConfirmAddress).toHaveBeenCalledWith();
        expect(service.validConfirmAddress).toHaveBeenCalledTimes(1);
      });
    });
  });
});
