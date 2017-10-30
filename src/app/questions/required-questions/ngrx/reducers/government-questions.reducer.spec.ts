import * as reducer from './government-questions.reducer';
import * as actions from '../actions/government-questions.action';
import { Test } from '../../../../../test/test.action';
import { State } from './government-questions.reducer';

describe('Government Questions Reducer', () => {
  let borrowerStateData: State;
  beforeEach(() => {
    let stateData: reducer.GovernmentQuestionsState;
    stateData = JSON.parse(JSON.stringify(reducer.initialGovernmentQuestionsState));
    Object.keys(stateData).forEach(key => {
      if (stateData[key] === null) {
        stateData[key] = true;
      } else {
        Object.keys(stateData[key]).forEach(key2 => {
          if (stateData[key][key2] === null) {
            stateData[key][key2] = true;
          } else if (key2 === 'other') {
            stateData[key][key2] = 'other';
          }
        });
      }
    });

    borrowerStateData = {
      governmentQuestions: stateData
    };
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  it('should return the initial state if the action.type is not caught', () => {
    const result = reducer.reducer(reducer.initialGovernmentQuestionsState, new Test());
    expect(result).toEqual(reducer.initialGovernmentQuestionsState);
  });

  describe('reducer function', () => {
    describe('with UPDATE_OUTSTANDING_JUDGMENTS action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsOutstandingJudgementsUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          outstandingJudgements: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_BANKRUPTCIES action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsBankruptciesUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          bankruptcies: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_FORECLOSURES action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsForeclosuresUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          foreclosures: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_LAWSUITS action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsLawsuitsUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          lawsuits: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_FORECLOSURE_JUDGEMENTS action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsForeclosureJudgementsUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          foreclosureJudgements: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_FEDERAL_DEBT_DELINQUENCIES action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsFederalDebtDelinquenciesUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          federalDebtDelinquencies: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_ALIMONY action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsAlimonyUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          alimony: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_BORROWED_DOWN_PAYMENT action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsBorrowedDownPaymentUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          borrowedDownPayment: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_CO_MAKER_ON_NOTE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsCoMakerOnNoteUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          coMakerOnNote: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_US_CITIZEN action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsUSCitizenUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          usCitizen: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_PERMANENT_RESIDENT_ALIEN action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsPermanentResidentAlienUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          permanentResidentAlien: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_OWNERSHIP_INTEREST action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = true;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsOwnershipInterestUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          ownershipInterest: true
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_ETHNICITY action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          hispanic: true,
          mexican: true,
          puertoRican: true,
          cuban: true,
          otherHispanic: {
            selected: true,
            other: 'other'
          },
          nonHispanic: true,
          optOut: true
        };
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsEthnicityUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          ethnicity: payload
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_RACE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          americanIndian: {
            selected: true,
            tribe: 'other'
          },
          asian: true,
          asianIndian: true,
          chinese: true,
          filipino: true,
          japanese: true,
          korean: true,
          vietnamese: true,
          otherAsian: {
            selected: true,
            other: 'other'
          },
          africanAmerican: true,
          pacificIslander: true,
          nativeHawaiian: true,
          guamanian: true,
          samoan: true,
          otherPacificIslander: {
            selected: true,
            other: 'other'
          },
          white: true,
          optOut: true,
        };
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsRaceUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          race: payload
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_SEX action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          male: true,
          female: true,
          didNotProvide: true
        };
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsSexUpdateAction(payload));
      });

      it('should update the state', () => {
        const outcome = Object.assign({}, reducer.initialGovernmentQuestionsState, {
          sex: payload
        });
        expect(result).toEqual(outcome);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with RESET action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          male: true,
          female: true,
          didNotProvide: true
        };
        initState = reducer.reducer(undefined, new actions.GovernmentQuestionsSexUpdateAction(payload));
        result = reducer.reducer(initState, new actions.GovernmentQuestionsResetAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(reducer.initialGovernmentQuestionsState);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with SET action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = borrowerStateData.governmentQuestions;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsSetAction(payload));
      });

      it('should set the entire state', () => {
        expect(result).toEqual(borrowerStateData.governmentQuestions);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with RESET action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          male: true,
          female: true,
          didNotProvide: true
        };
        initState = reducer.reducer(undefined, new actions.GovernmentQuestionsSexUpdateAction(payload));
        result = reducer.reducer(initState, new actions.GovernmentQuestionsResetAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(reducer.initialGovernmentQuestionsState);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with SET action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = borrowerStateData.governmentQuestions;
        initState = reducer.initialGovernmentQuestionsState;
        result = reducer.reducer(initState, new actions.GovernmentQuestionsSetAction(payload));
      });

      it('should set the entire state', () => {
        expect(result).toEqual(borrowerStateData.governmentQuestions);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });
  });

  it('should export a getGovernmentQuestionsState', () => {
    expect(reducer.getGovernmentQuestionsState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions);
  });

  it('should export a getGovernmentQuestionsOutstandingJudgementsState', () => {
    expect(reducer.getGovernmentQuestionsOutstandingJudgementsState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsOutstandingJudgementsState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.outstandingJudgements);
  });

  it('should export a getGovernmentQuestionsBankruptciesState', () => {
    expect(reducer.getGovernmentQuestionsBankruptciesState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsBankruptciesState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.bankruptcies);
  });

  it('should export a getGovernmentQuestionsForeclosuresState', () => {
    expect(reducer.getGovernmentQuestionsForeclosuresState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsForeclosuresState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.foreclosures);
  });

  it('should export a getGovernmentQuestionsLawsuitsState', () => {
    expect(reducer.getGovernmentQuestionsLawsuitsState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsLawsuitsState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.lawsuits);
  });

  it('should export a getGovernmentQuestionsForeclosureJudgementsState', () => {
    expect(reducer.getGovernmentQuestionsForeclosureJudgementsState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsForeclosureJudgementsState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.foreclosureJudgements);
  });

  it('should export a getGovernmentQuestionsFederalDebtDelinquenciesState', () => {
    expect(reducer.getGovernmentQuestionsFederalDebtDelinquenciesState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsFederalDebtDelinquenciesState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.federalDebtDelinquencies);
  });

  it('should export a getGovernmentQuestionsAlimonyState', () => {
    expect(reducer.getGovernmentQuestionsAlimonyState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsAlimonyState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.alimony);
  });

  it('should export a getGovernmentQuestionsBorrowedDownPaymentState', () => {
    expect(reducer.getGovernmentQuestionsBorrowedDownPaymentState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsBorrowedDownPaymentState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.borrowedDownPayment);
  });

  it('should export a getGovernmentQuestionsCoMakerOnNoteState', () => {
    expect(reducer.getGovernmentQuestionsCoMakerOnNoteState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsCoMakerOnNoteState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.coMakerOnNote);
  });

  it('should export a getGovernmentQuestionsUSCitizenState', () => {
    expect(reducer.getGovernmentQuestionsUSCitizenState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsUSCitizenState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.usCitizen);
  });

  it('should export a getGovernmentQuestionsPermanentResidentAlienState', () => {
    expect(reducer.getGovernmentQuestionsPermanentResidentAlienState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsPermanentResidentAlienState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.permanentResidentAlien);
  });

  it('should export a getGovernmentQuestionsOwnershipInterestState', () => {
    expect(reducer.getGovernmentQuestionsOwnershipInterestState).toEqual(jasmine.any(Function));
    const result = reducer.getGovernmentQuestionsOwnershipInterestState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.ownershipInterest);
  });

  it('should export a getEthnicityState', () => {
    expect(reducer.getEthnicityState).toEqual(jasmine.any(Function));
    const result = reducer.getEthnicityState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.ethnicity);
  });

  it('should export a getRaceState', () => {
    expect(reducer.getRaceState).toEqual(jasmine.any(Function));
    const result = reducer.getRaceState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.race);
  });

  it('should export a getSexState', () => {
    expect(reducer.getSexState).toEqual(jasmine.any(Function));
    const result = reducer.getSexState(borrowerStateData);
    expect(result).toEqual(borrowerStateData.governmentQuestions.sex);
  });
});
