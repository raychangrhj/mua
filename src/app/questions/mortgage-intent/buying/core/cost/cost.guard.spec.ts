import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentCost } from './cost.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentCost', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentCost,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validCost'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentCost], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validCost', () => {
      service.validCost.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validCost).toHaveBeenCalledWith();
        expect(service.validCost).toHaveBeenCalledTimes(1);
      });

      service.validCost.calls.reset();
      service.validCost.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validCost).toHaveBeenCalledWith();
        expect(service.validCost).toHaveBeenCalledTimes(1);
      });
    });
  });
});
