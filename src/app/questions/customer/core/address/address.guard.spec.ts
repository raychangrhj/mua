import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsCustomerAddress } from './address.guard';
import { CustomerRoutingService } from '../customer-routing.service';

describe('CanActivateQuestionsCustomerAddressInfo', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsCustomerAddress,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validAddress'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsCustomerAddress], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validAddress', () => {
      service.validAddress.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validAddress).toHaveBeenCalledWith();
        expect(service.validAddress).toHaveBeenCalledTimes(1);
      });

      service.validAddress.calls.reset();
      service.validAddress.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validAddress).toHaveBeenCalledWith();
        expect(service.validAddress).toHaveBeenCalledTimes(1);
      });
    });
  });
});
