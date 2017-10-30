import * as action from './reset.action';

describe('Assets Reset Action', () => {
  it('should export a constant for type description', () => {
    expect(action.RESET).toEqual('[Assets] Reset');
  });

  it('should export an action class', () => {
    expect(action.AssetsResetAction).toEqual(jasmine.any(Function));
  });

  describe('the Reset action', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.AssetsResetAction();
    });

    it('should be a type of RESET', () => {
      expect(testObj.type).toEqual(action.RESET);
    });
  });
});
