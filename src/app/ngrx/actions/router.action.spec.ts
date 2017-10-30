import * as action from './router.action';

describe('Router Action', () => {
  it('should export a constant for type description', () => {
    expect(action.GO).toEqual('[Router] Go');
    expect(action.BACK).toEqual('[Router] Back');
    expect(action.FORWARD).toEqual('[Router] Forward');
  });

  it('should export an action class', () => {
    expect(action.Go).toEqual(jasmine.any(Function));
  });

  describe('the Go action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {path: '/foo'};
      testObj = new action.Go(state);
    });
    it('should expose a RouterState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of GO', () => {
      expect(testObj.type).toEqual(action.GO);
    });
  });

  describe('the Back action', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.Back();
    });

    it('should be a type of BACK', () => {
      expect(testObj.type).toEqual(action.BACK);
    });
  });

  describe('the Forward action', () => {
    let testObj;
    beforeEach(() => {
      testObj = new action.Forward();
    });

    it('should be a type of FORWARD', () => {
      expect(testObj.type).toEqual(action.FORWARD);
    });
  });
});
