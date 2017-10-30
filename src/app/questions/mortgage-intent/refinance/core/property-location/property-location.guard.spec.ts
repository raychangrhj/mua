import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentLocation } from './property-location.guard';
import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

describe('CanActivateQuestionsMortgageIntentLocation', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentLocation,
        {
          provide: MortgageIntentRefinanceRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validLocation'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentLocation], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validLocation', () => {
      service.validLocation.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validLocation).toHaveBeenCalledWith();
        expect(service.validLocation).toHaveBeenCalledTimes(1);
      });

      service.validLocation.calls.reset();
      service.validLocation.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validLocation).toHaveBeenCalledWith();
        expect(service.validLocation).toHaveBeenCalledTimes(1);
      });
    });
  });
});
