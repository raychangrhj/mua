import * as action from './employment.action';

describe('Employment Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.ADD).toEqual('[Employment] Add');
  });

  it('should export a constant for type description', () => {
    expect(action.DELETE).toEqual('[Employment] Delete');
  });

  describe('EmploymentAddAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.EmploymentAddAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of ADD', () => {
      expect(testObj.type).toEqual(action.ADD);
    });
  });

  it('should export the EmploymentDeleteAction', () => {
    expect(action.EmploymentDeleteAction).toEqual(jasmine.any(Function));
  });

  describe('EmploymentDeleteAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 'company1'
      };
      testObj = new action.EmploymentDeleteAction(state);
    });
    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of DELETE', () => {
      expect(testObj.type).toEqual(action.DELETE);
    });
  });

  it('should export the EmploymentUpdateAction', () => {
    expect(action.EmploymentUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('EmploymentUpdateAction', () => {
    let testObj;
    let state;
    let employment;
    beforeEach(() => {
      employment = {
        companyName: 'orgCompany'
      };
      state = {
        companyName: 'company1'
      };
      testObj = new action.EmploymentUpdateAction(employment, state);
    });

    it('should expose a employment', () => {
      expect(testObj.employment).toEqual(employment);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
