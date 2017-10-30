import * as action from './temp-employment.action';

describe('TempEmployment Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE_NAME).toEqual('[Temp Employment] Update Company Name');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_TITLE).toEqual('[Temp Employment] Update Title');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_LOCATION).toEqual('[Temp Employment] Update Location');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_INCOME).toEqual('[Temp Employment] Update Income');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_DATES).toEqual('[Temp Employment] Update Start/End Date');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_ONLY_JOB).toEqual('[Temp Employment] Update Only Job');
  });

  it('should export a constant for type description', () => {
    expect(action.CLEAR).toEqual('[Temp Employment] Clear');
  });

  it('should export the TempEmploymentCompanyNameUpdateAction', () => {
    expect(action.TempEmploymentCompanyNameUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentCompanyNameUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        companyName: 1
      };
      testObj = new action.TempEmploymentCompanyNameUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_NAME', () => {
      expect(testObj.type).toEqual(action.UPDATE_NAME);
    });
  });

  it('should export the TempEmploymentJobTitleUpdateAction', () => {
    expect(action.TempEmploymentJobTitleUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentJobTitleUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 'employee';
      testObj = new action.TempEmploymentJobTitleUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_TITLE', () => {
      expect(testObj.type).toEqual(action.UPDATE_TITLE);
    });
  });

  it('should export the TempEmploymentLocationUpdateAction', () => {
    expect(action.TempEmploymentLocationUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentLocationUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      testObj = new action.TempEmploymentLocationUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_LOCATION', () => {
      expect(testObj.type).toEqual(action.UPDATE_LOCATION);
    });
  });

  it('should export the TempEmploymentIncomeUpdateAction', () => {
    expect(action.TempEmploymentIncomeUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentIncomeUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = 1000;
      testObj = new action.TempEmploymentIncomeUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_LOCATION', () => {
      expect(testObj.type).toEqual(action.UPDATE_INCOME);
    });
  });

  it('should export the TempEmploymentDatesUpdateAction', () => {
    expect(action.TempEmploymentDatesUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentDatesUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        startDate: 'start',
        endDate: 'end'
      };
      testObj = new action.TempEmploymentDatesUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_LOCATION', () => {
      expect(testObj.type).toEqual(action.UPDATE_DATES);
    });
  });

  it('should export the TempEmploymentCurrentlyEmployedUpdateAction', () => {
    expect(action.TempEmploymentOnlyJobUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('TempEmploymentOnlyJobUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.TempEmploymentOnlyJobUpdateAction(state);
    });
    it('should expose a payload and initial type', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_LOCATION', () => {
      expect(testObj.type).toEqual(action.UPDATE_ONLY_JOB);
    });
  });
});
