import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { MortgageIntentBuyingRoutingService } from './buying-routing.service';
import { reducers as mortgageIntentReducers } from '../../shared/ngrx/reducers/index.reducer';
import { RoutingValidatorsService } from '../../../../core/routing-validators.service';
import { MortgageTypeUpdateAction } from '../../shared/ngrx/actions/mortgage-type/mortgage-type.action';
import { PropertyLocationUpdateAction } from '../../shared/ngrx/actions/property-location/property-location.action';
import { CostUpdateAction } from '../../shared/ngrx/actions/cost/cost.action';
import { DownPaymentUpdateAction } from '../../shared/ngrx/actions/down-payment/down-payment.action';
import { PrimaryResidenceUpdateAction } from '../../shared/ngrx/actions/primary-residence/primary-residence.action';
import { PrimaryUseUpdateAction } from '../../shared/ngrx/actions/primary-use/primary-use.action';

describe('MortgageIntentBuyingRoutingService', () => {
  let store;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          mortgageIntent: combineReducers(mortgageIntentReducers)
        })
      ],
      providers: [
        MortgageIntentBuyingRoutingService,
        RoutingValidatorsService,
      ]
    });
  });

  beforeEach(inject([Store], (_store_) => {
    store = _store_;
  }));

  beforeEach(inject([MortgageIntentBuyingRoutingService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the validProperty method', () => {
    expect(service.validProperty).toEqual(jasmine.any(Function));
  });

  describe('validProperty', () => {
    it('should return true, data store has: mortgageType === "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));

      service.validProperty().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));

      service.validProperty().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPropertyLocation method', () => {
    expect(service.validPropertyLocation).toEqual(jasmine.any(Function));
  });

  describe('validPropertyLocation', () => {
    it('should return true, data store has: mortgageType === "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));

      service.validPropertyLocation().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));

      service.validPropertyLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validConfirmLocation method', () => {
    expect(service.validProperty).toEqual(jasmine.any(Function));
  });

  describe('validConfirmLocation', () => {
    it('should return true, data store has: mortgageType === "buy", street, city, state, and zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validConfirmLocation().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validConfirmLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));

      service.validConfirmLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validCost method', () => {
    expect(service.validCost).toEqual(jasmine.any(Function));
  });

  describe('validCost', () => {
    it('should return true, data store has: mortgageType === "buy", street, city, state, and zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));

      service.validCost().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));

      service.validCost().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));

      service.validCost().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validDownPayment method', () => {
    expect(service.validDownPayment).toEqual(jasmine.any(Function));
  });

  describe('validDownPayment', () => {
    it('should return true, data store has: mortgageType === "buy", street, city, state, zip, and cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));

      service.validDownPayment().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));

      service.validDownPayment().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new CostUpdateAction(100000));

      service.validDownPayment().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));

      service.validDownPayment().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validConfirmLoanAmount method', () => {
    expect(service.validConfirmLoanAmount).toEqual(jasmine.any(Function));
  });

  describe('validConfirmLoanAmount', () => {
    it('should return true, data store has: mortgageType === "buy", street, city, state, zip, cost, and down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validConfirmLoanAmount().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validConfirmLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validConfirmLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validConfirmLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));

      service.validConfirmLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPrimaryResidence method', () => {
    expect(service.validPrimaryResidence).toEqual(jasmine.any(Function));
  });

  describe('validPrimaryResidence', () => {
    it('should return true, data store has: mortgageType === "buy", street, city, state, zip, cost, and down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPrimaryUse method', () => {
    expect(service.validPrimaryUse).toEqual(jasmine.any(Function));
  });

  describe('validPrimaryUse', () => {
    it('should return true, data store has: ' +
      'mortgageType === "buy", ' +
      'street, city, state, zip, ' +
      'cost, ' +
      'down payment, ' +
      'and primary residence === false', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: primaryResidence', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store has primaryResidence set to true', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(true));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validConfirm method', () => {
    expect(service.validConfirm).toEqual(jasmine.any(Function));
  });

  describe('validConfirm', () => {
    it('should return true, data store has: ' +
      'mortgageType === "buy", ' +
      'street, city, state, zip, ' +
      'cost, ' +
      'down payment, ' +
      'and either primary residence or primary use', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(true));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return true, data store has: ' +
      'mortgageType === "buy", ' +
      'street, city, state, zip, ' +
      'cost, ' +
      'down payment, ' +
      'and either primary residence or primary use', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "buy"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: cost', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: down payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: primaryUse', () => {
      store.dispatch(new MortgageTypeUpdateAction('buy'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        city: 'city',
        state: 'state',
        county: 'county',
        zip: 'zip'
      }));
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(10000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });
});
