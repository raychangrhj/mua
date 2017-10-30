import * as action from './temp-accounts.action';

describe('TempEmployment Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE_BANK_NAME).toEqual('[Temp Account] Update Bank Name');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_TYPE).toEqual('[Temp Account] Update Type');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_BALANCE).toEqual('[Temp Account] Update Balance');
  });

  it('should export a constant for type description', () => {
    expect(action.CLEAR).toEqual('[Temp Account] Clear');
  });

  it('should export the TempAccountBankNameUpdateAction', () => {
    expect(action.TempAccountBankNameUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempAccountBankNameUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'bank name';
      testObj = new action.TempAccountBankNameUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_BANK_NAME', () => {
      expect(testObj.type).toEqual(action.UPDATE_BANK_NAME);
    });
  });

  it('should export the TempAccountUpdateTypeUpdateAction', () => {
    expect(action.TempAccountUpdateTypeUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempAccountUpdateTypeUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'type';
      testObj = new action.TempAccountUpdateTypeUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_TYPE', () => {
      expect(testObj.type).toEqual(action.UPDATE_TYPE);
    });
  });

  it('should export the TempAccountUpdateBalanceUpdateAction', () => {
    expect(action.TempAccountUpdateBalanceUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempAccountUpdateBalanceUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.TempAccountUpdateBalanceUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_BALANCE', () => {
      expect(testObj.type).toEqual(action.UPDATE_BALANCE);
    });
  });

  it('should export the TempAccountClearAction', () => {
    expect(action.TempAccountClearAction).toEqual(jasmine.any(Function));
  });

  describe('TempAccountClearAction', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.TempAccountClearAction();
    });

    it('should be a type of CLEAR', () => {
      expect(testObj.type).toEqual(action.CLEAR);
    });
  });
});
