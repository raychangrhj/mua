import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsCustomerAddressInfo } from './address-info.guard';
import { CustomerRoutingService } from '../customer-routing.service';

describe('CanActivateQuestionsCustomerAddressInfo', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsCustomerAddressInfo,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validAddressInfo'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsCustomerAddressInfo], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validAddressInfo', () => {
      service.validAddressInfo.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validAddressInfo).toHaveBeenCalledWith();
        expect(service.validAddressInfo).toHaveBeenCalledTimes(1);
      });

      service.validAddressInfo.calls.reset();
      service.validAddressInfo.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validAddressInfo).toHaveBeenCalledWith();
        expect(service.validAddressInfo).toHaveBeenCalledTimes(1);
      });
    });
  });
});
