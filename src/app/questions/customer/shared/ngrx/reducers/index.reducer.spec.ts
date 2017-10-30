import { State } from './index.reducer';
import * as reducer from './index.reducer';
import * as fromDOB from './dob/dob.reducer';
import * as fromType from './type/type.reducer';
import * as fromEmail from './email/email.reducer';
import * as fromName from './name/name.reducer';
import * as fromPhone from './phone/phone.reducer';
import * as fromSSN from './ssn/ssn.reducer';
import * as fromMaritalStatus from './marital-status/marital-status.reducer';
import * as fromAddressInfo from './address-info/address-info.reducer';
import * as fromAddress from './address/address.reducer';

describe('Index Customer Reducer', () => {
  let stateData: State;
  beforeEach(() => {
    stateData = {
      customer: {
        type: 'type',
        email: 'email',
        name: {
          first: 'first',
          last: 'last'
        },
        dob: '2012-02-02',
        phone: {
          number: '555-555-5555',
          type: 'mobile'
        },
        ssn: '111-11-1111',
        maritalStatus: 'married',
        addressInfo: '2012-02-02',
        address: {
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip'
        }
      }
    }
  });

  it('should export a reducers object of all the reducer function', () => {
    expect(reducer.reducers).toEqual({
      name: fromName.reducer,
      type: fromType.reducer,
      email: fromEmail.reducer,
      dob: fromDOB.reducer,
      phone: fromPhone.reducer,
      ssn: fromSSN.reducer,
      maritalStatus: fromMaritalStatus.reducer,
      addressInfo: fromAddressInfo.reducer,
      address: fromAddress.reducer
    });
  });

  it('should export a getCustomerState', () => {
    expect(reducer.getCustomerState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerState(stateData);
    expect(result).toEqual(stateData.customer);
  });

  it('should export a getCustomerTypeState', () => {
    expect(reducer.getCustomerTypeState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerTypeState(stateData);
    expect(result).toEqual(stateData.customer.type);
  });

  it('should export a getCustomerNameState', () => {
    expect(reducer.getCustomerNameState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerNameState(stateData);
    expect(result).toEqual(stateData.customer.name);
  });

  it('should export a getCustomerEmailState', () => {
    expect(reducer.getCustomerEmailState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerEmailState(stateData);
    expect(result).toEqual(stateData.customer.email);
  });

  it('should export a getCustomerDOBState', () => {
    expect(reducer.getCustomerDOBState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerDOBState(stateData);
    expect(result).toEqual(stateData.customer.dob);
  });

  it('should export a getCustomerPhoneState', () => {
    expect(reducer.getCustomerPhoneState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerPhoneState(stateData);
    expect(result).toEqual(stateData.customer.phone);
  });

  it('should export a getCustomerSSNState', () => {
    expect(reducer.getCustomerSSNState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerSSNState(stateData);
    expect(result).toEqual(stateData.customer.ssn);
  });

  it('should export a getCustomerMaritalStatusState', () => {
    expect(reducer.getCustomerMaritalStatusState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerMaritalStatusState(stateData);
    expect(result).toEqual(stateData.customer.maritalStatus);
  });

  it('should export a getCustomerAddressInfoState', () => {
    expect(reducer.getCustomerAddressInfoState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerAddressInfoState(stateData);
    expect(result).toEqual(stateData.customer.addressInfo);
  });

  it('should export a getCustomerAddressState', () => {
    expect(reducer.getCustomerAddressState).toEqual(jasmine.any(Function));
    const result = reducer.getCustomerAddressState(stateData);
    expect(result).toEqual(stateData.customer.address);
  });
});
