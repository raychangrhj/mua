import * as action from './authentication.action';
import { AuthenticationPreFill } from '../../../../../../models/service-responses';

describe('Authentication Authenticate Action', () => {
  it('should export a constant for type description', () => {
    expect(action.AUTHENTICATE).toEqual('[Customer Authentication] Authenticate');
  });

  it('should export an action class', () => {
    expect(action.AuthenticationAuthenticateAction).toEqual(jasmine.any(Function));
  });

  describe('the Authenticate action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        username: 'username',
        password: 'password'
      };
      testObj = new action.AuthenticationAuthenticateAction(state);
    });
    it('should expose a AuthenticationState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of AUTHENTICATE', () => {
      expect(testObj.type).toEqual(action.AUTHENTICATE);
    });
  });

  it('should export an action class', () => {
    expect(action.AuthenticationByDebitAction).toEqual(jasmine.any(Function));
  });

  describe('the Authenticate By Debit action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        cardNumber: 'cardNumber',
        pinNumber: 'pinNumber'
      };
      testObj = new action.AuthenticationByDebitAction(state);
    });
    it('should expose a AuthenticationState payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of BY_DEBIT', () => {
      expect(testObj.type).toEqual(action.BY_DEBIT);
    });
  });

  describe('the Authentication Complete action', () => {
    let testObj;
    let state: AuthenticationPreFill;
    beforeEach(() => {
      state = {
        customer: {
          name: {
            first: 'firstName',
            last: 'lastName'
          },
          email: 'email',
          dob: 'dob',
          phone: {
            type: 'mobile',
            number: 'phone number'
          },
          ssn: 'ssn',
          address: {
            street: 'street',
            city: 'city',
            state: 'state',
            zip: 'zip'
          },
          rcifId: 'rcifId',
        }
      };
      testObj = new action.AuthenticationSuccessAction(state);
    });
    it('should expose a AuthenticationComplete payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of SUCCESS', () => {
      expect(testObj.type).toEqual(action.SUCCESS);
    });
  });

  describe('the Authentication Failed action', () => {
    let testObj;
    let state;
    beforeEach(() => {
      state = {
        type: 'question',
        description: 'Required security question must be answered',
        question: {
          description: 'What is your favorite color?'
        }
      };
      testObj = new action.AuthenticationFailureAction(state);
    });
    it('should expose a AuthenticationFailed payload', () => {
      expect(testObj.payload).toEqual(state);
    });

    it('should be a type of FAILURE', () => {
      expect(testObj.type).toEqual(action.FAILURE);
    });
  });
});
