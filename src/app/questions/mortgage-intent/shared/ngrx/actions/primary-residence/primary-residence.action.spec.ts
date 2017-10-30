import * as action from '../primary-residence/primary-residence.action';

describe('PrimaryResidence Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Mortgage Intent Primary Residence] Update');
  });

  it('should export an action class', () => {
    expect(action.PrimaryResidenceUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.PrimaryResidenceUpdateAction(state);
    });
    it('should expose a primary residence payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
