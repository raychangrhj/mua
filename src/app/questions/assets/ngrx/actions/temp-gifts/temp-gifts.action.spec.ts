import * as action from './temp-gifts.action';

describe('TempEmployment Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE_WHO).toEqual('[Temp Gift] Update Who');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_RELATIONSHIP).toEqual('[Temp Gift] Update Relationship');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_AMOUNT).toEqual('[Temp Gift] Update Amount');
  });

  it('should export a constant for type description', () => {
    expect(action.CLEAR).toEqual('[Temp Gift] Clear');
  });

  it('should export the TempGiftWhoUpdateAction', () => {
    expect(action.TempGiftWhoUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempGiftWhoUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'type';
      testObj = new action.TempGiftWhoUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_WHO', () => {
      expect(testObj.type).toEqual(action.UPDATE_WHO);
    });
  });

  it('should export the TempGiftRelationshipUpdateAction', () => {
    expect(action.TempGiftRelationshipUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempGiftRelationshipUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'relationship';
      testObj = new action.TempGiftRelationshipUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_RELATIONSHIP', () => {
      expect(testObj.type).toEqual(action.UPDATE_RELATIONSHIP);
    });
  });

  it('should export the TempGiftAmountUpdateAction', () => {
    expect(action.TempGiftAmountUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempGiftAmountUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 10000;
      testObj = new action.TempGiftAmountUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_AMOUNT', () => {
      expect(testObj.type).toEqual(action.UPDATE_AMOUNT);
    });
  });

  it('should export the TempGiftClearAction', () => {
    expect(action.TempGiftClearAction).toEqual(jasmine.any(Function));
  });

  describe('TempGiftClearAction', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.TempGiftClearAction();
    });

    it('should be a type of CLEAR', () => {
      expect(testObj.type).toEqual(action.CLEAR);
    });
  });
});
