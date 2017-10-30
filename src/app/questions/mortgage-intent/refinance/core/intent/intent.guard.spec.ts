import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentIntent } from './intent.guard';
import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

describe('CanActivateQuestionsMortgageIntentIntent', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentIntent,
        {
          provide: MortgageIntentRefinanceRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validIntent'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentIntent], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validIntent', () => {
      service.validIntent.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validIntent).toHaveBeenCalledWith();
        expect(service.validIntent).toHaveBeenCalledTimes(1);
      });

      service.validIntent.calls.reset();
      service.validIntent.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validIntent).toHaveBeenCalledWith();
        expect(service.validIntent).toHaveBeenCalledTimes(1);
      });
    });
  });
});
