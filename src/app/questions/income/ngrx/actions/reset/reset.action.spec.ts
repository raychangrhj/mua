import * as action from './reset.action';

describe('Income Reset Action', () => {
  it('should export a constant for type description', () => {
    expect(action.RESET).toEqual('[Income] Reset');
  });

  it('should export an action class', () => {
    expect(action.IncomeResetAction).toEqual(jasmine.any(Function));
  });

  describe('the Reset action', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.IncomeResetAction();
    });

    it('should be a type of RESET', () => {
      expect(testObj.type).toEqual(action.RESET);
    });
  });
});
