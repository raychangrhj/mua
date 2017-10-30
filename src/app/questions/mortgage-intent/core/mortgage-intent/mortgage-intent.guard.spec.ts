import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntent } from './mortgage-intent.guard';
import { MortgageIntentRoutingService } from '../mortgage-intent-routing.service';

describe('CanActivateQuestionsMortgageIntent', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntent,
        {
          provide: MortgageIntentRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validMortgageIntent'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntent], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validAddress', () => {
      service.validMortgageIntent.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validMortgageIntent).toHaveBeenCalledWith();
        expect(service.validMortgageIntent).toHaveBeenCalledTimes(1);
      });

      service.validMortgageIntent.calls.reset();
      service.validMortgageIntent.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validMortgageIntent).toHaveBeenCalledWith();
        expect(service.validMortgageIntent).toHaveBeenCalledTimes(1);
      });
    });
  });
});
