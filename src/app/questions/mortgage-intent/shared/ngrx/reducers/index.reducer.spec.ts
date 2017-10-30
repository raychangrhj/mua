import { State } from './index.reducer';
import * as reducer from './index.reducer';
import * as fromPrimaryResidence from './primary-residence/primary-residence.reducer';
import * as fromPrimaryUse from './primary-use/primary-use.reducer';
import * as fromPropertyLocation from './property-location/property-location.reducer';
import * as fromMortgageType from './mortgage-type/mortgage-type.reducer';
import * as fromCost from './cost/cost.reducer';
import * as fromDownPayment from './down-payment/down-payment.reducer';

describe('Index Buying Reducer', () => {
  let stateData: State;
  beforeEach(() => {
    stateData = {
      mortgageIntent: {
        propertyLocation: {
          street: 'street',
          city: 'city',
          county: 'county',
          state: 'state',
          zip: 'zip'
        },
        primaryUse: 'second-home',
        primaryResidence: false,
        mortgageType: 'buying',
        cost: 200000,
        downPayment: 2000
      }
    }
  });

  it('should export a reducers object of all the reducer function', () => {
    expect(reducer.reducers).toEqual({
      propertyLocation: fromPropertyLocation.reducer,
      primaryUse: fromPrimaryUse.reducer,
      primaryResidence: fromPrimaryResidence.reducer,
      mortgageType: fromMortgageType.reducer,
      cost: fromCost.reducer,
      downPayment: fromDownPayment.reducer,
    });
  });

  it('should export a getMortgageIntentState', () => {
    expect(reducer.getMortgageIntentState).toEqual(jasmine.any(Function));
    const result = reducer.getMortgageIntentState(stateData);
    expect(result).toEqual(stateData.mortgageIntent);
  });

  it('should export a getMortgagePropertyLocationState', () => {
    expect(reducer.getMortgagePropertyLocationState).toEqual(jasmine.any(Function));
    const result = reducer.getMortgagePropertyLocationState(stateData);
    expect(result).toEqual(stateData.mortgageIntent.propertyLocation);
  });

  it('should export a getMortgagePrimaryUseState', () => {
    expect(reducer.getMortgagePrimaryUseState).toEqual(jasmine.any(Function));
    const result = reducer.getMortgagePrimaryUseState(stateData);
    expect(result).toEqual(stateData.mortgageIntent.primaryUse);
  });

  it('should export a getMortgagePrimaryResidenceState', () => {
    expect(reducer.getMortgagePrimaryResidenceState).toEqual(jasmine.any(Function));
    const result = reducer.getMortgagePrimaryResidenceState(stateData);
    expect(result).toEqual(stateData.mortgageIntent.primaryResidence);
  });

  it('should export a getMortgageTypeState', () => {
    expect(reducer.getMortgageTypeState).toEqual(jasmine.any(Function));
    const result = reducer.getMortgageTypeState(stateData);
    expect(result).toEqual(stateData.mortgageIntent.mortgageType);
  });

  it('should export a getMortgageIntendedUseState', () => {
    expect(reducer.getMortgageIntendedUseState).toEqual(jasmine.any(Function));
  });

  describe('getMortgageIntendedUseState', () => {
    it('should return "Primary Residence" whenever primaryResidence is true', () => {
      stateData.mortgageIntent.primaryResidence = true;
      expect(reducer.getMortgageIntendedUseState(stateData)).toEqual('Primary Residence');
    });

    it('should return "2nd Home/Vacation" whenever primaryResidence is false and primaryUse is "second-home"', () => {
      stateData.mortgageIntent.primaryResidence = false;
      stateData.mortgageIntent.primaryUse = 'second-home';
      expect(reducer.getMortgageIntendedUseState(stateData)).toEqual('2nd Home/Vacation');
    });

    it('should return "Investment/Rental" whenever primaryResidence is false and primaryUse is "investment"', () => {
      stateData.mortgageIntent.primaryResidence = false;
      stateData.mortgageIntent.primaryUse = 'investment';
      expect(reducer.getMortgageIntendedUseState(stateData)).toEqual('Investment/Rental');
    });

    it('should return null whenever primaryResidence and primaryUse are null', () => {
      stateData.mortgageIntent.primaryResidence = null;
      stateData.mortgageIntent.primaryUse = null;
      expect(reducer.getMortgageIntendedUseState(stateData)).toEqual(null);
    });
  });
});
