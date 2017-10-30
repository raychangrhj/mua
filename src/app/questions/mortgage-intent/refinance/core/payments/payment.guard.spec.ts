import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentPayments } from './payment.guard';
import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

describe('CanActivateQuestionsMortgageIntentPayments', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentPayments,
        {
          provide: MortgageIntentRefinanceRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validPayments'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentPayments], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validPayments', () => {
      service.validPayments.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validPayments).toHaveBeenCalledWith();
        expect(service.validPayments).toHaveBeenCalledTimes(1);
      });

      service.validPayments.calls.reset();
      service.validPayments.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validPayments).toHaveBeenCalledWith();
        expect(service.validPayments).toHaveBeenCalledTimes(1);
      });
    });
  });
});
