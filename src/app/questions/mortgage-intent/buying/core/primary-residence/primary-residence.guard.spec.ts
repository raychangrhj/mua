import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentPrimaryResidence } from './primary-residence.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentPrimaryResidence', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentPrimaryResidence,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validPrimaryResidence'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentPrimaryResidence], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validPrimaryResidence', () => {
      service.validPrimaryResidence.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validPrimaryResidence).toHaveBeenCalledWith();
        expect(service.validPrimaryResidence).toHaveBeenCalledTimes(1);
      });

      service.validPrimaryResidence.calls.reset();
      service.validPrimaryResidence.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validPrimaryResidence).toHaveBeenCalledWith();
        expect(service.validPrimaryResidence).toHaveBeenCalledTimes(1);
      });
    });
  });
});
