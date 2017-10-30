import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { reducers } from '../ngrx/reducers/index.reducer';
import { reducers as mortgageIntentReducers } from '../../shared/ngrx/reducers/index.reducer';
import { RoutingValidatorsService } from '../../../../core/routing-validators.service';
import { MortgageTypeUpdateAction } from '../../shared/ngrx/actions/mortgage-type/mortgage-type.action';
import { PropertyLocationUpdateAction } from '../../shared/ngrx/actions/property-location/property-location.action';
import { PrimaryResidenceUpdateAction } from '../../shared/ngrx/actions/primary-residence/primary-residence.action';
import { PrimaryUseUpdateAction } from '../../shared/ngrx/actions/primary-use/primary-use.action';
import { MortgageIntentRefinanceRoutingService } from './refinance-routing.service';
import { IntentUpdateAction } from '../ngrx/actions/intent/intent.action';
import { OwedUpdateAction } from '../ngrx/actions/owed/owed.action';
import { PaymentUpdateAction } from '../ngrx/actions/payments/payment.action';
import { AppraisalUpdateAction } from '../ngrx/actions/appraisal/appraisal.action';
import { LoanAmountUpdateAction } from '../ngrx/actions/loan-amount/loan-amount.action';

describe('MortgageIntentRefinanceRoutingService', () => {
  let store;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          refinance: combineReducers(reducers),
          mortgageIntent: combineReducers(mortgageIntentReducers)
        })
      ],
      providers: [
        MortgageIntentRefinanceRoutingService,
        RoutingValidatorsService,
      ]
    });
  });

  beforeEach(inject([Store], (_store_) => {
    store = _store_;
  }));

  beforeEach(inject([MortgageIntentRefinanceRoutingService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the validIntent method', () => {
    expect(service.validIntent).toEqual(jasmine.any(Function));
  });

  describe('validIntent', () => {
    it('should return true, data store has: mortgageType === "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));

      service.validIntent().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));

      service.validIntent().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validLoans method', () => {
    expect(service.validLoans).toEqual(jasmine.any(Function));
  });

  describe('validLoans', () => {
    it('should return true, data store has: mortgageType === "refinance" and intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));

      service.validLoans().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));

      service.validLoans().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));

      service.validLoans().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validLocation method', () => {
    expect(service.validLocation).toEqual(jasmine.any(Function));
  });

  describe('validLocation', () => {
    it('should return true, data store has: mortgageType === "refinance", intent and loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists

      service.validLocation().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists

      service.validLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists

      service.validLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));

      service.validLocation().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validOwe method', () => {
    expect(service.validOwe).toEqual(jasmine.any(Function));
  });

  describe('validOwe', () => {
    it('should return true, data store has: mortgageType === "refinance", intent, loans and address', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validOwe().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validOwe().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validOwe().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validOwe().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists

      service.validOwe().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPayments method', () => {
    expect(service.validPayments).toEqual(jasmine.any(Function));
  });

  describe('validPayments', () => {
    it('should return true, data store has: mortgageType === "refinance", intent, loans, address and owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));

      service.validPayments().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));

      service.validPayments().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));

      service.validPayments().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));

      service.validPayments().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));

      service.validPayments().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));

      service.validPayments().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validAppraisal method', () => {
    expect(service.validAppraisal).toEqual(jasmine.any(Function));
  });

  describe('validAppraisal', () => {
    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'and payments', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));

      service.validAppraisal().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validLoanAmount method', () => {
    expect(service.validLoanAmount).toEqual(jasmine.any(Function));
  });

  describe('validLoanAmount', () => {
    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'payments, ' +
      'and appraisal', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: appraisal', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));

      service.validLoanAmount().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPrimaryResidence method', () => {
    expect(service.validPrimaryResidence).toEqual(jasmine.any(Function));
  });

  describe('validPrimaryResidence', () => {
    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'payments, ' +
      'appraisal, ' +
      'and loan amount', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: appraisal', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: loan amount', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));

      service.validPrimaryResidence().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });

  it('should have the validPrimaryUse method', () => {
    expect(service.validPrimaryUse).toEqual(jasmine.any(Function));
  });

  describe('validPrimaryUse', () => {
    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'payments, ' +
      'appraisal, ' +
      'loan amount, ' +
      'and primary residence is false', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: appraisal', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: loan amount', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: primary residence', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));

      service.validPrimaryUse().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, primary residence is true', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
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
    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'payments, ' +
      'appraisal, ' +
      'loan amount, ' +
      'and primary residence is true or primary use is set', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(true));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return true, data store has:' +
      'mortgageType === "refinance", ' +
      'intent, ' +
      'loans, ' +
      'address, ' +
      'owe, ' +
      'payments, ' +
      'appraisal, ' +
      'loan amount, ' +
      'and primary residence is true or primary use is set', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(true);
      });
    });

    it('should return false, data store has: mortgageType !== "refinance"', () => {
      store.dispatch(new MortgageTypeUpdateAction('not_refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: intent', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    xit('should return false, data store missing: loans', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: street, city, state, zip', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: owe', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: payment', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: appraisal', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: loan amount', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));
      store.dispatch(new PrimaryUseUpdateAction('2nd-home'));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });

    it('should return false, data store missing: primary residence', () => {
      store.dispatch(new MortgageTypeUpdateAction('refinance'));
      store.dispatch(new IntentUpdateAction('lower-payment'));
      // TODO add in loans whenever it exists
      store.dispatch(new PropertyLocationUpdateAction({
        street: 'street',
        county: 'county',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }));
      store.dispatch(new OwedUpdateAction(100000));
      store.dispatch(new PaymentUpdateAction(1500));
      store.dispatch(new AppraisalUpdateAction(150000));
      store.dispatch(new LoanAmountUpdateAction(200000));
      store.dispatch(new PrimaryResidenceUpdateAction(false));

      service.validConfirm().then(bool => {
        expect(bool).toEqual(false);
      });
    });
  });
});
