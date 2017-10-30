import * as action from './other.action';

describe('OtherIncome Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.ADD).toEqual('[Other Income] Add');
  });

  it('should export a constant for type description', () => {
    expect(action.DELETE).toEqual('[Other Income] Delete');
  });

  it('should export the OtherIncomeAddAction', () => {
    expect(action.OtherIncomeAddAction).toEqual(jasmine.any(Function));
  });

  describe('OtherIncomeAddAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        option: 'rental'
      };
      testObj = new action.OtherIncomeAddAction(state);
    });
    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.ADD);
    });
  });

  it('should export the OtherIncomeDeleteAction', () => {
    expect(action.OtherIncomeDeleteAction).toEqual(jasmine.any(Function));
  });

  describe('OtherIncomeDeleteAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        option: 'rental'
      };
      testObj = new action.OtherIncomeDeleteAction(state);
    });
    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.DELETE);
    });
  });
});
