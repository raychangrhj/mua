import { NameState } from '../app/questions/customer/shared/ngrx/reducers/name/name.reducer';
import { AddressState } from '../app/questions/customer/shared/ngrx/reducers/address/address.reducer';
import { CustomerState } from '../app/questions/customer/shared/ngrx/reducers/index.reducer';
import { MortgageIntentState } from '../app/questions/mortgage-intent/shared/ngrx/reducers/index.reducer';
import { RefinanceState } from '../app/questions/mortgage-intent/refinance/ngrx/reducers/index.reducer';
import { IncomeState } from '../app/questions/income/ngrx/reducers/index.reducer';
import { AssetsState } from '../app/questions/assets/ngrx/reducers/index.reducer';
import { GovernmentQuestionsState } from '../app/questions/required-questions/ngrx/reducers/government-questions.reducer';
import { ApplicationState } from '../app/ngrx/reducers/application.reducer';
import { NavigationState } from '../app/questions/shared/ngrx/reducers/navigation.reducer';
import { PhoneState } from '../app/questions/customer/shared/ngrx/reducers/phone/phone.reducer';

interface CustomerResponse {
  name: NameState;
  email: string;
  dob: string;
  phone: PhoneState;
  ssn: string;
  address: AddressState;
  rcifId: string;
}

export interface GetFootPrintByStateCodeResponse {
  didTransactionSucceed: boolean;
  data: {
    stateId: string;
    stateName: string;
    inMarket: boolean;
    preApproved: boolean;
    thirtyYearOnly: boolean;
    createDate: string;
    exceptionInfo: any;
  };
}

export interface AuthenticationResponse {
  didAccountAuthenticateSuccessfully: boolean;
  data: {
    id: string;
    questionId: string;
    sessionId: string;
    question: string;
    version: string;
    email: string;
    temp: string;
    isLockedOut: boolean;
    resultMessage: string;
    errorData: any;
  };
}

export interface AuthenticationPreFill {
  customer: CustomerResponse
}

export interface AuthenticationPreFillResponse {
  didAccountAuthenticateSuccessfully: boolean;
  data: AuthenticationPreFill
}

export interface LoanOfficerManagerResponse {
  didTransactionSucceed: boolean;
  data: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    loanOfficerId: string;
    associateId: string;
    managerFirstName: string;
    managerLastName: string;
    managerFullName: string;
    managerEmail: string;
    managerAssociateId: string;
    exceptionInfo: string;
  };
}

export interface DataStore {
  navigation?: NavigationState;
  application?: ApplicationState;
  customer?: CustomerState;
  mortgageIntent?: MortgageIntentState;
  refinance?: RefinanceState;
  income?: IncomeState;
  assets?: AssetsState;
  governmentQuestions?: GovernmentQuestionsState;
}
