import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentProperty } from './property.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentProperty', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentProperty,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validProperty'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentProperty], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validProperty', () => {
      service.validProperty.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validProperty).toHaveBeenCalledWith();
        expect(service.validProperty).toHaveBeenCalledTimes(1);
      });

      service.validProperty.calls.reset();
      service.validProperty.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validProperty).toHaveBeenCalledWith();
        expect(service.validProperty).toHaveBeenCalledTimes(1);
      });
    });
  });
});
