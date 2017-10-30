import * as reducer from './temp-employement.reducer';
import * as actions from '../../actions/temp-employment/temp-employment.action';
import { Test } from '../../../../../../test/test.action';
import {
  EmploymentStateObject,
  initialEmploymentStateObject
} from '../employment/employement.reducer';

describe('Employment Reducer', () => {
  let stateData: EmploymentStateObject;
  beforeEach(() => {
    stateData = {
      companyName: 'companyName',
      title: 'title',
      location: {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      },
      dates: {
        startDate: '2016',
        endDate: '2020'
      }
    }
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  it('should return the initial state if the action.type is not caught', () => {
    const result = reducer.reducer({
      companyName: 'foo'
    }, new Test());
    expect(result).toEqual({
      companyName: 'foo'
    });
  });

  describe('reducer function', () => {
    describe('with UPDATE_NAME action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'panda';
        initState = {
          companyName: '0'
        };
        result = reducer.reducer(initState, new actions.TempEmploymentCompanyNameUpdateAction(payload));
      });

      it('should add/update the companyName payload to state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          companyName: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_TITLE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 'panda';
        initState = {
          companyName: '0'
        };
        result = reducer.reducer(initState, new actions.TempEmploymentJobTitleUpdateAction(payload));
      });

      it('should add/update the job title payload to the state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          title: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_LOCATION action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip'
        };
        initState = {
          companyName: '0'
        };
        result = reducer.reducer(initState, new actions.TempEmploymentLocationUpdateAction(payload));
      });

      it('should add/update the company location payload to state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          location: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_INCOME action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = 10000;
        initState = {
          companyName: '0'
        };
        result = reducer.reducer(initState, new actions.TempEmploymentIncomeUpdateAction(payload));
      });

      it('should add/update the monthly income payload to state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          income: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with UPDATE_DATES action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          startDate: '2010-10-10',
          endDate: null
        };
        initState = {
          companyName: '0'
        };
        result = reducer.reducer(initState, new actions.TempEmploymentDatesUpdateAction(payload));
      });

      it('should add/update the start/end dates payload to state', () => {
        expect(result).toEqual(Object.assign({}, initState, {
          dates: payload
        }));
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with CLEAR action type', () => {
      let result;
      let initState;
      beforeEach(() => {
        initState = stateData;
        result = reducer.reducer(initState, new actions.TempEmploymentClearAction());
      });

      it('should reset the state', () => {
        expect(result).toEqual(initialEmploymentStateObject);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });
  });

  it('should export a getter for the company name', () => {
    expect(reducer.getTempCompanyName).toEqual(jasmine.any(Function));
    expect(reducer.getTempCompanyName(stateData)).toEqual(stateData.companyName);
  });

  it('should export a getter for the company location', () => {
    expect(reducer.getTempCompanyLocation).toEqual(jasmine.any(Function));
    expect(reducer.getTempCompanyLocation(stateData)).toEqual(stateData.location);
  });

  it('should export a getter for the job income', () => {
    expect(reducer.getTempJobIncome).toEqual(jasmine.any(Function));
    expect(reducer.getTempJobIncome(stateData)).toEqual(stateData.income);
  });

  it('should export a getter for the job title', () => {
    expect(reducer.getTempJobTitle).toEqual(jasmine.any(Function));
    expect(reducer.getTempJobTitle(stateData)).toEqual(stateData.title);
  });

  it('should export a getter for the job dates', () => {
    expect(reducer.getTempJobDates).toEqual(jasmine.any(Function));
    expect(reducer.getTempJobDates(stateData)).toEqual(stateData.dates);
  });
});
