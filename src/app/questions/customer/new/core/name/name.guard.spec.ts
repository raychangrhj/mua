import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsNewCustomerName } from './name.guard';
import { CustomerRoutingService } from '../../../core/customer-routing.service';

describe('CanActivateQuestionsNewCustomerName', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsNewCustomerName,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validName'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsNewCustomerName], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validName', () => {
      service.validName.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validName).toHaveBeenCalledWith();
        expect(service.validName).toHaveBeenCalledTimes(1);
      });

      service.validName.calls.reset();
      service.validName.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validName).toHaveBeenCalledWith();
        expect(service.validName).toHaveBeenCalledTimes(1);
      });
    });
  });
});
