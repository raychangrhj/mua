import * as action from './reset.action';

describe('Customer Reset Action', () => {
  it('should export a constant for type description', () => {
    expect(action.RESET).toEqual('[Customer] Reset');
  });

  it('should export an action class', () => {
    expect(action.CustomerResetAction).toEqual(jasmine.any(Function));
  });

  describe('the Reset action', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.CustomerResetAction();
    });

    it('should be a type of RESET', () => {
      expect(testObj.type).toEqual(action.RESET);
    });
  });
});
