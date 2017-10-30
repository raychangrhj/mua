import * as reducer from './name.reducer';
import { NameUpdateAction } from '../../actions/name/name.action';
import { Test } from '../../../../../../../test/test.action';

describe('Name Reducer', () => {
  it('should export an initial name state', () => {
    expect(reducer.initialNameState).toEqual({
      first: null,
      last: null
    });
  });

  it('should export a reducer function', () => {
    expect(reducer.reducer).toEqual(jasmine.any(Function));
  });

  describe('reducer function', () => {
    it('should return the payload of a UPDATE action', () => {
      const payload: reducer.NameState = {
        first: 'foo',
        last: 'bar'
      };
      const result = reducer.reducer(null, new NameUpdateAction(payload));
      expect(result).toEqual(payload);
    });

    it('should not mutate the existing state', () => {
      const initState: reducer.NameState = {
        first: 'foo',
        middle: 'middle',
        last: 'bar'
      };
      const payload: reducer.NameState = {
        first: 'foo',
        last: 'bar'
      };
      const result = reducer.reducer(initState, new NameUpdateAction(payload));
      expect(result).not.toBe(initState);
    });

    it('should return the initial state if the action.type is not caught', () => {
      const result = reducer.reducer(reducer.initialNameState, new Test());
      expect(result).toEqual(reducer.initialNameState);
    });
  });
});
