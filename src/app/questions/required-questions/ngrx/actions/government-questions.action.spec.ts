import * as action from './government-questions.action';

describe('GovernmentQuestions Actions', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE_OUTSTANDING_JUDGMENTS).toEqual('[Government Questions] Update Outstanding Judgements');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_BANKRUPTCIES).toEqual('[Government Questions] Update Bankruptcies');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_FORECLOSURES).toEqual('[Government Questions] Update Foreclosures');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_LAWSUITS).toEqual('[Government Questions] Update Lawsuits');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_FORECLOSURE_JUDGEMENTS).toEqual('[Government Questions] Update Foreclosure Judgements');
  });

  it('should export a constant for type description', () => {
    expect(
      action.UPDATE_FEDERAL_DEBT_DELINQUENCIES
    ).toEqual('[Government Questions] Update Federal Debt Delinquencies');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_ALIMONY).toEqual('[Government Questions] Update Alimony');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_BORROWED_DOWN_PAYMENT).toEqual('[Government Questions] Update Borrowed Down Payment');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_CO_MAKER_ON_NOTE).toEqual('[Government Questions] Update Co-maker on Note');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_US_CITIZEN).toEqual('[Government Questions] Update US Citizen');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_PERMANENT_RESIDENT_ALIEN).toEqual('[Government Questions] Update Permanent Resident Alien');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_OWNERSHIP_INTEREST).toEqual('[Government Questions] Update Ownership Interest');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_ETHNICITY).toEqual('[Government Questions] Update Ethnicity');
  });

  it('should export a constant for type description', () => {
    expect(action.UPDATE_SEX).toEqual('[Government Questions] Update Sex');
  });

  it('should export the GovernmentQuestionsOutstandingJudgementsUpdateAction', () => {
    expect(action.GovernmentQuestionsOutstandingJudgementsUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsOutstandingJudgementsUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsOutstandingJudgementsUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_OUTSTANDING_JUDGMENTS', () => {
      expect(testObj.type).toEqual(action.UPDATE_OUTSTANDING_JUDGMENTS);
    });
  });

  it('should export the GovernmentQuestionsBankruptciesUpdateAction', () => {
    expect(action.GovernmentQuestionsBankruptciesUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsBankruptciesUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsBankruptciesUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_BANKRUPTCIES', () => {
      expect(testObj.type).toEqual(action.UPDATE_BANKRUPTCIES);
    });
  });

  it('should export the GovernmentQuestionsForeclosuresUpdateAction', () => {
    expect(action.GovernmentQuestionsForeclosuresUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsForeclosuresUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsForeclosuresUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_FORECLOSURES', () => {
      expect(testObj.type).toEqual(action.UPDATE_FORECLOSURES);
    });
  });

  it('should export the GovernmentQuestionsLawsuitsUpdateAction', () => {
    expect(action.GovernmentQuestionsLawsuitsUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsLawsuitsUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsLawsuitsUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_LAWSUITS', () => {
      expect(testObj.type).toEqual(action.UPDATE_LAWSUITS);
    });
  });

  it('should export the GovernmentQuestionsForeclosureJudgementsUpdateAction', () => {
    expect(action.GovernmentQuestionsForeclosureJudgementsUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsForeclosureJudgementsUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsForeclosureJudgementsUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_FORECLOSURE_JUDGEMENTS', () => {
      expect(testObj.type).toEqual(action.UPDATE_FORECLOSURE_JUDGEMENTS);
    });
  });

  it('should export the GovernmentQuestionsFederalDebtDelinquenciesUpdateAction', () => {
    expect(action.GovernmentQuestionsFederalDebtDelinquenciesUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsFederalDebtDelinquenciesUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsFederalDebtDelinquenciesUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_FEDERAL_DEBT_DELINQUENCIES', () => {
      expect(testObj.type).toEqual(action.UPDATE_FEDERAL_DEBT_DELINQUENCIES);
    });
  });

  it('should export the GovernmentQuestionsAlimonyUpdateAction', () => {
    expect(action.GovernmentQuestionsAlimonyUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsAlimonyUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsAlimonyUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_ALIMONY', () => {
      expect(testObj.type).toEqual(action.UPDATE_ALIMONY);
    });
  });

  it('should export the GovernmentQuestionsBorrowedDownPaymentUpdateAction', () => {
    expect(action.GovernmentQuestionsBorrowedDownPaymentUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsBorrowedDownPaymentUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsBorrowedDownPaymentUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_BORROWED_DOWN_PAYMENT', () => {
      expect(testObj.type).toEqual(action.UPDATE_BORROWED_DOWN_PAYMENT);
    });
  });

  it('should export the GovernmentQuestionsCoMakerOnNoteUpdateAction', () => {
    expect(action.GovernmentQuestionsCoMakerOnNoteUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsCoMakerOnNoteUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsCoMakerOnNoteUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_CO_MAKER_ON_NOTE', () => {
      expect(testObj.type).toEqual(action.UPDATE_CO_MAKER_ON_NOTE);
    });
  });

  it('should export the GovernmentQuestionsUSCitizenUpdateAction', () => {
    expect(action.GovernmentQuestionsUSCitizenUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsUSCitizenUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsUSCitizenUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_US_CITIZEN', () => {
      expect(testObj.type).toEqual(action.UPDATE_US_CITIZEN);
    });
  });

  it('should export the GovernmentQuestionsPermanentResidentAlienUpdateAction', () => {
    expect(action.GovernmentQuestionsPermanentResidentAlienUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsPermanentResidentAlienUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsPermanentResidentAlienUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_PERMANENT_RESIDENT_ALIEN', () => {
      expect(testObj.type).toEqual(action.UPDATE_PERMANENT_RESIDENT_ALIEN);
    });
  });

  it('should export the GovernmentQuestionsOwnershipInterestUpdateAction', () => {
    expect(action.GovernmentQuestionsOwnershipInterestUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsOwnershipInterestUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = false;
      testObj = new action.GovernmentQuestionsOwnershipInterestUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_OWNERSHIP_INTEREST', () => {
      expect(testObj.type).toEqual(action.UPDATE_OWNERSHIP_INTEREST);
    });
  });

  it('should export the GovernmentQuestionsEthnicityUpdateAction', () => {
    expect(action.GovernmentQuestionsEthnicityUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsEthnicityUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        hispanic: false,
        mexican: false,
        puertoRican: false,
        cuban: false,
        otherHispanic: {
          selected: false,
          other: null
        },
        nonHispanic: false,
        optOut: false
      };
      testObj = new action.GovernmentQuestionsEthnicityUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_ETHNICITY', () => {
      expect(testObj.type).toEqual(action.UPDATE_ETHNICITY);
    });
  });

  it('should export the GovernmentQuestionsRaceUpdateAction', () => {
    expect(action.GovernmentQuestionsRaceUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsRaceUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        americanIndian: {
          selected: false,
          tribe: null
        },
        asian: false,
        asianIndian: false,
        chinese: false,
        filipino: false,
        japanese: false,
        korean: false,
        vietnamese: false,
        otherAsian: {
          selected: false,
          other: null
        },
        africanAmerican: false,
        pacificIslander: false,
        nativeHawaiian: false,
        guamanian: false,
        samoan: false,
        otherPacificIslander: {
          selected: false,
          other: null
        },
        white: false,
        optOut: false,
      };
      testObj = new action.GovernmentQuestionsRaceUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_RACE', () => {
      expect(testObj.type).toEqual(action.UPDATE_RACE);
    });
  });

  it('should export the GovernmentQuestionsSexUpdateAction', () => {
    expect(action.GovernmentQuestionsSexUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('GovernmentQuestionsSexUpdateAction', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        male: true,
        female: true,
        didNotProvide: true
      };
      testObj = new action.GovernmentQuestionsSexUpdateAction(state);
    });

    it('should expose a payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE_SEX', () => {
      expect(testObj.type).toEqual(action.UPDATE_SEX);
    });
  });
});
