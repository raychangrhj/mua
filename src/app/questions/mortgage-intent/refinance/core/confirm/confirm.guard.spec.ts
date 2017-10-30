import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentConfirm } from './confirm.guard';
import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

describe('CanActivateQuestionsMortgageIntentConfirm', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentConfirm,
        {
          provide: MortgageIntentRefinanceRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validConfirm'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentConfirm], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validConfirm', () => {
      service.validConfirm.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validConfirm).toHaveBeenCalledWith();
        expect(service.validConfirm).toHaveBeenCalledTimes(1);
      });

      service.validConfirm.calls.reset();
      service.validConfirm.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validConfirm).toHaveBeenCalledWith();
        expect(service.validConfirm).toHaveBeenCalledTimes(1);
      });
    });
  });
});
