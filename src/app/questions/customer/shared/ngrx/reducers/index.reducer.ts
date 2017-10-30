import {
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromName from './name/name.reducer';
import * as fromEmail from './email/email.reducer';
import * as fromDOB from './dob/dob.reducer';
import * as fromPhone from './phone/phone.reducer';
import * as fromSSN from './ssn/ssn.reducer';
import * as fromMaritalStatus from './marital-status/marital-status.reducer';
import * as fromAddressInfo from './address-info/address-info.reducer';
import * as fromAddress from './address/address.reducer';
import * as fromType from './type/type.reducer';
import * as fromReset from '../actions/reset/reset.action';

export interface CustomerState {
  type: string;
  name: fromName.NameState;
  email: string;
  dob: string;
  phone: fromPhone.PhoneState;
  ssn: string;
  maritalStatus: string;
  addressInfo: string;
  address: fromAddress.AddressState;
}

export interface State {
  customer: CustomerState;
}

export const reducers = {
  type: fromType.reducer,
  name: fromName.reducer,
  email: fromEmail.reducer,
  dob: fromDOB.reducer,
  phone: fromPhone.reducer,
  ssn: fromSSN.reducer,
  maritalStatus: fromMaritalStatus.reducer,
  addressInfo: fromAddressInfo.reducer,
  address: fromAddress.reducer
};

export const initialCustomerState: CustomerState = {
  type: null,
  name: fromName.initialNameState,
  email: null,
  dob: null,
  phone: null,
  ssn: null,
  maritalStatus: null,
  addressInfo: null,
  address: fromAddress.initialAddressState
};

export function customerReducer(state: CustomerState = initialCustomerState, action: fromReset.ALL) {
  switch (action.type) {
    case fromReset.RESET: {
      return initialCustomerState
    }

    case fromReset.SET: {
      return (action as fromReset.CustomerSetAction).payload
    }

    default: {
      return combineReducers(reducers)(state, action);
    }
  }
}

export const getCustomerState = createFeatureSelector<CustomerState>('customer');

export const getCustomerTypeState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.type
);
export const getCustomerNameState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.name
);
export const getCustomerEmailState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.email
);
export const getCustomerDOBState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.dob
);
export const getCustomerPhoneState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.phone
);
export const getCustomerSSNState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.ssn
);
export const getCustomerMaritalStatusState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.maritalStatus
);
export const getCustomerAddressInfoState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.addressInfo
);
export const getCustomerAddressState = createSelector(
  getCustomerState,
  (state: CustomerState) => state && state.address
);
