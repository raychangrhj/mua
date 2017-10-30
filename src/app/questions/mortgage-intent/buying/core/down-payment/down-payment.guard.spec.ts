import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentDownPayment } from './down-payment.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentDownPayment', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentDownPayment,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validDownPayment'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentDownPayment], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validDownPayment', () => {
      service.validDownPayment.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validDownPayment).toHaveBeenCalledWith();
        expect(service.validDownPayment).toHaveBeenCalledTimes(1);
      });

      service.validDownPayment.calls.reset();
      service.validDownPayment.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validDownPayment).toHaveBeenCalledWith();
        expect(service.validDownPayment).toHaveBeenCalledTimes(1);
      });
    });
  });
});
