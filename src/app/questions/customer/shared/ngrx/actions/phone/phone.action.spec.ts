import * as action from './phone.action';
import { PhoneState } from '../../reducers/phone/phone.reducer';

describe('Phone Action', () => {
  it('should export a constant for type description', () => {
    expect(action.UPDATE).toEqual('[Customer Phone] Update');
  });

  it('should export an action class', () => {
    expect(action.PhoneUpdateAction).toEqual(jasmine.any(Function));
  });

  describe('the Update action', () => {
    let testObj;
    let state: PhoneState;
    beforeEach(() => {
      state = {
        number: 'phone',
        type: 'mobile'
      };
      testObj = new action.PhoneUpdateAction(state);
    });
    it('should expose a PhoneState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of UPDATE', () => {
      expect(testObj.type).toEqual(action.UPDATE);
    });
  });
});
