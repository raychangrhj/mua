import * as reducer from './employement.reducer';
import * as actions from '../../actions/employment/employment.action';
import { Test } from '../../../../../../test/test.action';

describe('Employment Reducer', () => {
  let stateData: reducer.EmploymentStateObject;
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
    const result = reducer.reducer([{
      companyName: 'foo'
    }], new Test());
    expect(result).toEqual([{
      companyName: 'foo'
    }]);
  });

  describe('reducer function', () => {
    describe('with ADD action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          companyName: 'company1'
        };
        initState = [{
          companyName: 'company0'
        }];
        result = reducer.reducer(initState, new actions.EmploymentAddAction(payload));
      });

      it('should add the payload to the end of the employments array', () => {
        expect(result).toEqual([
          payload,
          initState[0],
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });
    });

    describe('with DELETE action type', () => {
      let payload;
      let result;
      let initState;
      beforeEach(() => {
        payload = {
          companyName: '1'
        };
        initState = [{
          companyName: '0'
        }, payload, {
          companyName: '2'
        }];
        result = reducer.reducer(initState, new actions.EmploymentDeleteAction(payload));
      });

      it('should remove the payload from the employments array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the state if the payload is not in the list', () => {
        result = reducer.reducer(initState, new actions.EmploymentDeleteAction({
          companyName: 'foo'
        }));
        expect(result).toEqual(initState);
      });
    });

    describe('with UPDATE action type', () => {
      let payload;
      let initialEmployment;
      let result;
      let initState;
      beforeEach(() => {
        initialEmployment = {
          companyName: 'not_1'
        };
        payload = {
          companyName: '1'
        };
        initState = [{
          companyName: '0'
        }, initialEmployment, {
          companyName: '2'
        }];
        result = reducer.reducer(initState, new actions.EmploymentUpdateAction(initialEmployment, payload));
      });

      it('should update the employment in the array by memory reference', () => {
        expect(result).toEqual([
          initState[0],
          payload,
          initState[2]
        ]);
      });

      it('should not mutate the existing state', () => {
        expect(result).not.toBe(initState);
      });

      it('should return the state if the payload is not in the list', () => {
        result = reducer.reducer(initState, new actions.EmploymentUpdateAction({
          companyName: 'something that does not exist'
        }, {
          companyName: 'some update'
        }));
        expect(result).toEqual(initState);
      });
    });
  });
});
