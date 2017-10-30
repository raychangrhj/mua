import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentPrimaryUse } from './primary-use.guard';
import { MortgageIntentBuyingRoutingService } from '../buying-routing.service';

describe('CanActivateQuestionsMortgageIntentPrimaryUse', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentPrimaryUse,
        {
          provide: MortgageIntentBuyingRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validPrimaryUse'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentPrimaryUse], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validPrimaryUse', () => {
      service.validPrimaryUse.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validPrimaryUse).toHaveBeenCalledWith();
        expect(service.validPrimaryUse).toHaveBeenCalledTimes(1);
      });

      service.validPrimaryUse.calls.reset();
      service.validPrimaryUse.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validPrimaryUse).toHaveBeenCalledWith();
        expect(service.validPrimaryUse).toHaveBeenCalledTimes(1);
      });
    });
  });
});
