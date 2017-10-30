import * as action from './name.action';

describe('Name Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Name] Update');
  });

  it('should export an action class', () => {
    expect(action.NameUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        first: 'first',
        middle: 'middle',
        last: 'last',
        suffix: 'suffix'
      };
      testObj = new action.NameUpdateAction(state);
    });
    it('should expose a NameState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
