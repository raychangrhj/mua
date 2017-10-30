import * as action from './acounts.action';

describe('Account Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.ADD).toEqual('[Account] Add');
  });

  it('should export a constant for type description', () => {
    expect(action.DELETE).toEqual('[Account] Delete');
  });

  describe('AccountAddAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.AccountAddAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of ADD', () => {
      expect(testObj.type).toEqual(action.ADD);
    });
  });

  it('should export the AccountDeleteAction', () => {
    expect(action.AccountDeleteAction).toEqual(jasmine.any(Function));
  });

  describe('AccountDeleteAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.AccountDeleteAction(state);
    });
    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of DELETE', () => {
      expect(testObj.type).toEqual(action.DELETE);
    });
  });

  it('should export the AccountUpdateAction', () => {
    expect(action.AccountUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('AccountUpdateAction', () => {
    let testObj;
    let state;
    let account;
    beforeEach(() => {
      account = {
        companyName: 'orgCompany'
      };
      state = {
        companyName: 'company1'
      };
      testObj = new action.AccountUpdateAction(account, state);
    });

    it('should expose a account', () => {
      expect(testObj.account).toEqual(account);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
