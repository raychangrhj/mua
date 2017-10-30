import * as action from './temp-other.action';

describe('OtherIncome Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE_TYPE).toEqual('[Temp Other Income] Update Type');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_RENTAL_LOCATION).toEqual('[Temp Other Income] Update Rental Location');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_MONTHLY).toEqual('[Temp Other Income] Update Monthly Income');
  });

  it('should export a constant for type description', () => {
    expect(action.CLEAR).toEqual('[Temp Other Income] Clear');
  });

  it('should export the TempOtherIncomeTypeUpdateAction', () => {
    expect(action.TempOtherIncomeTypeUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempOtherIncomeTypeUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        option: 'other',
        explain: 'foo-bar'
      };
      testObj = new action.TempOtherIncomeTypeUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE_TYPE);
    });
  });

  it('should export the TempOtherIncomeRentalLocationUpdateAction', () => {
    expect(action.TempOtherIncomeRentalLocationUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempOtherIncomeRentalLocationUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      testObj = new action.TempOtherIncomeRentalLocationUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE_RENTAL_LOCATION );
    });
  });

  it('should export the TempOtherIncomeMonthlyUpdateAction', () => {
    expect(action.TempOtherIncomeMonthlyUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempOtherIncomeMonthlyUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.TempOtherIncomeMonthlyUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE_MONTHLY );
    });
  });

  it('should export the TempOtherIncomeClearAction', () => {
    expect(action.TempOtherIncomeClearAction).toEqual(jasmine.any(Function));
  });

  describe('TempOtherIncomeClearAction', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.TempOtherIncomeClearAction();
    });

    it('should be a type of CLEAR', () => {
      expect(testObj.type).toEqual(action.CLEAR);
    });
  });
});
