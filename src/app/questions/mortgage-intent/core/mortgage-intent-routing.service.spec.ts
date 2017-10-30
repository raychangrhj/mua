import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { MortgageIntentRoutingService } from './mortgage-intent-routing.service';
import { RoutingValidatorsService } from '../../../core/routing-validators.service';
import { CustomerRoutingService } from '../../customer/core/customer-routing.service';
import { reducers } from '../shared/ngrx/reducers/index.reducer';

describe('MortgageIntentBuyingRoutingService', () => {
  let store;
  let service;
  let customerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          mortgageIntent: combineReducers(reducers),
        })
      ],
      providers: [
        MortgageIntentRoutingService,
        RoutingValidatorsService,
        {
          provide: CustomerRoutingService,
          useValue: jasmine.createSpyObj('CustomerRoutingService', ['validConfirm'])
        }
      ]
    });
  });

  beforeEach(inject([Store], (_store_) => {
    store = _store_;
  }));

  beforeEach(inject([MortgageIntentRoutingService, CustomerRoutingService], (_service_, _customerService_) => {
    service = _service_;
    customerService = _customerService_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the validMortgageIntent method', () => {
    expect(service.validMortgageIntent).toEqual(jasmine.any(Function));
  });

  describe('validMortgageIntent', () => {
    it('should return true if validConfirm from customerRoutingService returns true', () => {
      customerService.validConfirm.and.returnValue(Promise.resolve(true));

      service.validMortgageIntent().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false if validConfirm from customerRoutingService returns false', () => {
      customerService.validConfirm.and.returnValue(Promise.resolve(false));

      service.validMortgageIntent().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });
});
