import * as action from './email.action';

describe('Email Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Email] Update');
  });

  it('should export an action class', () => {
    expect(action.EmailUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'email';
      testObj = new action.EmailUpdateAction(state);
    });
    it('should expose a EmailState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
