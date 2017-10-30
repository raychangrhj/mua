import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsCustomerMaritalStatus } from './marital-status.guard';
import { CustomerRoutingService } from '../customer-routing.service';

describe('CanActivateQuestionsCustomerMaritalStatus', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsCustomerMaritalStatus,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validMaritalStatus'])
        }
      ]
    });
  });

  beforeEach(inject([CustomerRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsCustomerMaritalStatus], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validMaritalStatus', () => {
      service.validMaritalStatus.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validMaritalStatus).toHaveBeenCalledWith();
        expect(service.validMaritalStatus).toHaveBeenCalledTimes(1);
      });

      service.validMaritalStatus.calls.reset();
      service.validMaritalStatus.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validMaritalStatus).toHaveBeenCalledWith();
        expect(service.validMaritalStatus).toHaveBeenCalledTimes(1);
      });
    });
  });
});
