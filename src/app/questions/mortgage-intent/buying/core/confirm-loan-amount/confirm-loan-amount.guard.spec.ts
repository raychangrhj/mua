import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentConfirmLoanAmount } from './confirm-loan-amount.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentConfirmLoanAmount', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentConfirmLoanAmount,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validConfirmLoanAmount'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentConfirmLoanAmount], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validConfirmLoanAmount', () => {
      service.validConfirmLoanAmount.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validConfirmLoanAmount).toHaveBeenCalledWith();
        expect(service.validConfirmLoanAmount).toHaveBeenCalledTimes(1);
      });

      service.validConfirmLoanAmount.calls.reset();
      service.validConfirmLoanAmount.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validConfirmLoanAmount).toHaveBeenCalledWith();
        expect(service.validConfirmLoanAmount).toHaveBeenCalledTimes(1);
      });
    });
  });
});
