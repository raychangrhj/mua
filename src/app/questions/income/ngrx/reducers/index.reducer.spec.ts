import { State } from './index.reducer';
import * as reducer from './index.reducer';
import * as fromOther from './other/other.reducer';
import * as fromTempOther from './temp-other/temp-other.reducer';
import * as fromEmployment from './employment/employement.reducer';
import * as fromTempEmployment from './temp-employment/temp-employement.reducer';

describe('Index Income Reducer', () => {
  let stateData: State;
  beforeEach(() => {
    stateData = {
      income: {
        other: [{
          type: {
            option: 'work'
          }
        }, {
          type: {
            option: 'not_work'
          }
        }],
        employment: [{
          companyName: 'company_0',
          dates: {
            startDate: 'current',
            endDate: 'current'
          }
        }, {
          companyName: 'company_1',
          dates: {
            startDate: 'not_current',
            endDate: 'not_current'
          }
        }],
        tempOther: {
          type: {
            option: 'work'
          }
        },
        tempEmployment: {
          companyName: 'temp_company',
          title: 'temp_title',
          location: {
            street: 'temp_street',
            city: 'temp_city',
            state: 'temp_state',
            zip: 'temp_zip'
          },
          dates: {
            startDate: 'temp_start',
            endDate: 'temp_end'
          }
        }
      }
    };
  });

  it('should export a reducers object of all the reducer function', () => {
    expect(reducer.reducers).toEqual({
      other: fromOther.reducer,
      employment: fromEmployment.reducer,
      tempOther: fromTempOther.reducer,
      tempEmployment: fromTempEmployment.reducer
    });
  });

  it('should export a getIncomeState', () => {
    expect(reducer.getIncomeState).toEqual(jasmine.any(Function));
    const result = reducer.getIncomeState(stateData);
    expect(result).toEqual(stateData.income);
  });

  it('should export a getOtherIncomesState', () => {
    expect(reducer.getOtherIncomesState).toEqual(jasmine.any(Function));
    const result = reducer.getOtherIncomesState(stateData);
    expect(result).toEqual(stateData.income.other);
  });

  it('should export a getCurrentEmploymentState', () => {
    expect(reducer.getCurrentEmploymentState).toEqual(jasmine.any(Function));
    const result = reducer.getCurrentEmploymentState(stateData);
    expect(result).toEqual([stateData.income.employment[0]]);
  });

  it('should export a getPrevEmploymentState', () => {
    expect(reducer.getPrevEmploymentState).toEqual(jasmine.any(Function));
    const result = reducer.getPrevEmploymentState(stateData);
    expect(result).toEqual([stateData.income.employment[1]]);
  });

  it('should export a getTempEmploymentState', () => {
    expect(reducer.getTempEmploymentState).toEqual(jasmine.any(Function));
    const result = reducer.getTempEmploymentState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment);
  });

  it('should export a getTempOtherIncomesState', () => {
    expect(reducer.getTempOtherIncomesState).toEqual(jasmine.any(Function));
    const result = reducer.getTempOtherIncomesState(stateData);
    expect(result).toEqual(stateData.income.tempOther);
  });

  it('should export a getTempCompanyNameState', () => {
    expect(reducer.getTempCompanyNameState).toEqual(jasmine.any(Function));
    const result = reducer.getTempCompanyNameState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment.companyName);
  });

  it('should export a getTempCompanyLocationState', () => {
    expect(reducer.getTempCompanyLocationState).toEqual(jasmine.any(Function));
    const result = reducer.getTempCompanyLocationState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment.location);
  });

  it('should export a getTempJobIncomeState', () => {
    expect(reducer.getTempJobIncomeState).toEqual(jasmine.any(Function));
    const result = reducer.getTempJobIncomeState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment.income);
  });

  it('should export a getTempJobTitleState', () => {
    expect(reducer.getTempJobTitleState).toEqual(jasmine.any(Function));
    const result = reducer.getTempJobTitleState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment.title);
  });

  it('should export a getTempJobDatesState', () => {
    expect(reducer.getTempJobDatesState).toEqual(jasmine.any(Function));
    const result = reducer.getTempJobDatesState(stateData);
    expect(result).toEqual(stateData.income.tempEmployment.dates);
  });
});
