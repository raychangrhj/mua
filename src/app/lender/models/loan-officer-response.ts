export interface LoanOfficer {
  associateId: string;
  firstName: string;
  middleName: string;
  middleInitial: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  jobTitleId: number;
  jobTitle: string;
  hasWebsite: boolean;
  nmlsNumber: string;
  distance: number;
  isNonProducingManager: boolean;
  branchId: string;
  isSpanishSpeaking: boolean;
  resultMessage: string;
  exceptionInfo: any;
  loanOfficerId: number;
  isAssociateActive: boolean;
  modifiedDate: string;
  createdDate: string;
  leaveDate: string;
  returnDate: string;
  isOutOfOffice: boolean;
  website: {
    websiteID: string;
    websiteName: string;
    professionalBackground: string;
    education: string;
    communityInvolvement: string;
    chairmansClub: string;
    additionalInformation: string;
  };
  primaryLocation: {
    locationId: number;
    locationName: string;
    address1: string;
    address2: string;
    suite: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
    country: string;
    branchID: number;
    inRotation: boolean;
    isPrimaryLocation: boolean;
    longitude: number;
    latitude: number;
    locationTypeID: number;
    locationType: string;
    phoneNumber: {
      officePhone: string;
      officePhoneExt: number;
      faxNumber: string;
      faxNumberExt: number;
      tollFreeNumber: string;
      tollFreeNumberExt: number;
      cellPhone: string;
    };
  };
  phoneNumbers: {
    officePhone: string;
    officePhoneExt: number;
    faxNumber: string;
    faxNumberExt: number;
    tollFreeNumber: string;
    tollFreeNumberExt: number;
    cellPhone: string;
  };
  picture: {
    pictureId: number;
    mimeType: string;
    pictureData: string;
  };
}

export interface LoanOfficerResponse {
  didTransactionSucceed: boolean;
  data: {
    mortgageLoanOfficerData: LoanOfficer
  }
}
