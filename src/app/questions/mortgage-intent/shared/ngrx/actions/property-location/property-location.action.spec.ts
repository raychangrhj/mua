import * as action from './property-location.action';

describe('Property Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Property Location] Update');
  });

  it('should export a constant for type description', () => {
    expect(action.VALIDATE).toEqual('[Mortgage Intent Property Location] Validate');
  });

  it('should export an action class', () => {
    expect(action.PropertyLocationUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      testObj = new action.PropertyLocationUpdateAction(state);
    });
    it('should expose a PropertyLocationState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });

  describe('the Validate action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      testObj = new action.PropertyLocationValidateAction(state);
    });

    it('should expose a PropertyLocationState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.VALIDATE);
    });
  });
});
