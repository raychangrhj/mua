import * as action from './gifts.action';

describe('Gift Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.ADD).toEqual('[Gift] Add');
  });

  it('should export a constant for type description', () => {
    expect(action.DELETE).toEqual('[Gift] Delete');
  });

  describe('GiftAddAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.GiftAddAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of ADD', () => {
      expect(testObj.type).toEqual(action.ADD);
    });
  });

  it('should export the GiftDeleteAction', () => {
    expect(action.GiftDeleteAction).toEqual(jasmine.any(Function));
  });

  describe('GiftDeleteAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.GiftDeleteAction(state);
    });
    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of DELETE', () => {
      expect(testObj.type).toEqual(action.DELETE);
    });
  });

  it('should export the GiftUpdateAction', () => {
    expect(action.GiftUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GiftUpdateAction', () => {
    let testObj;
    let state;
    let gift;
    beforeEach(() => {
      gift = {
        companyName: 'orgCompany'
      };
      state = {
        companyName: 'company1'
      };
      testObj = new action.GiftUpdateAction(gift, state);
    });

    it('should expose a gift', () => {
      expect(testObj.gift).toEqual(gift);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
