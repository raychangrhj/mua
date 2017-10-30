import {
  TestBed,
  inject
} from '@angular/core/testing';

import { CanActivateQuestionsMortgageIntentAppraisal } from './appraisal.guard';
import { MortgageIntentRefinanceRoutingService } from '../refinance-routing.service';

describe('CanActivateQuestionsMortgageIntentAppraisal', () => {
  let guard;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateQuestionsMortgageIntentAppraisal,
        {
          provide: MortgageIntentRefinanceRoutingService,
          useValue: jasmine.createSpyObj('routingService', ['validAppraisal'])
        }
      ]
    });
  });

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  beforeEach(inject([CanActivateQuestionsMortgageIntentAppraisal], (_guard_) => {
    guard = _guard_;
  }));

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should have the canActivate method', () => {
    expect(guard.canActivate).toEqual(jasmine.any(Function));
  });

  describe('canActivate', () => {
    it('should return routingService.validAppraisal', () => {
      service.validAppraisal.and.returnValue(Promise.resolve(true));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(true);
        expect(service.validAppraisal).toHaveBeenCalledWith();
        expect(service.validAppraisal).toHaveBeenCalledTimes(1);
      });

      service.validAppraisal.calls.reset();
      service.validAppraisal.and.returnValue(Promise.resolve(false));
      guard.canActivate().then(bool => {
        expect(bool).toEqual(false);
        expect(service.validAppraisal).toHaveBeenCalledWith();
        expect(service.validAppraisal).toHaveBeenCalledTimes(1);
      });
    });
  });
});
