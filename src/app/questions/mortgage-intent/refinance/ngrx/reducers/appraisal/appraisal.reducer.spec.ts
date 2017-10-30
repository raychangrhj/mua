import * as reducer from './appraisal.reducer';
import { AppraisalUpdateAction } from '../../actions/appraisal/appraisal.action';
import { Test } from '../../../../../../../test/test.action';

describe('Appraisal Reducer', () => {
  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload = 10000;
      const result = reducer.reducer(null, new AppraisalUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState = 90000;
      const payload = 10000;
      const result = reducer.reducer(initState, new AppraisalUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(10000, new Test());
      expect(result).toEqual(10000);
    });
  });
});
