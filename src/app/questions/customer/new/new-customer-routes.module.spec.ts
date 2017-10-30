import { Routes } from '@angular/router';

import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';
import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { QuestionsCustomerMaritalStatusComponent } from '../shared/marital-status/marital-status.component';
import { QuestionsCustomerAddressInfoComponent } from '../shared/address-info/address-info.component';
import { QuestionsCustomerAddressComponent } from '../shared/address/address.component';
import { QuestionsNewCustomerSSNComponent } from './ssn/ssn.component';
import { QuestionsNewCustomerDOBComponent } from './dob/dob.component';
import { QuestionsNewCustomerEmailComponent } from './email/email.component';
import { QuestionsNewCustomerPhoneComponent } from './phone/phone.component';
import { QuestionsNewCustomerNameComponent } from './name/name.component';
import { routes } from './new-customer-routes.module';
import {
  getCustomerAddressInfoState,
  getCustomerAddressState,
  getCustomerDOBState,
  getCustomerEmailState,
  getCustomerMaritalStatusState,
  getCustomerNameState,
  getCustomerPhoneState,
  getCustomerSSNState
} from '../shared/ngrx/reducers/index.reducer';
import { CanActivateQuestionsCustomerConfirm } from '../core/confirm/confirm.guard';
import { CanActivateQuestionsCustomerMaritalStatus } from '../core/marital-status/marital-status.guard';
import { CanActivateQuestionsCustomerAddressInfo } from '../core/address-info/address-info.guard';
import { CanActivateQuestionsCustomerAddress } from '../core/address/address.guard';
import { CanActivateQuestionsNewCustomerSSN } from './core/ssn/ssn.guard';
import { CanActivateQuestionsNewCustomerDOB } from './core/dob/dob.guard';
import { CanActivateQuestionsNewCustomerEmail } from './core/email/email.guard';
import { CanActivateQuestionsNewCustomerPhone } from './core/phone/phone.guard';
import { CanActivateQuestionsNewCustomerName } from './core/name/name.guard';
import { ProgressUpdateService } from '../../core/progress-update.service';

describe('AppRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([
      {
        path: '',
        redirectTo: 'name',
        pathMatch: 'full'
      },
      {
        path: 'name',
        // canActivate: [CanActivateQuestionsNewCustomerName],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/phone'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/on-boarding'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerNameComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'phone',
        // canActivate: [CanActivateQuestionsNewCustomerPhone],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/email'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/name'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerPhoneComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'email',
        // canActivate: [CanActivateQuestionsNewCustomerEmail],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/date-of-birth'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/phone'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerEmailComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'date-of-birth',
        // canActivate: [CanActivateQuestionsNewCustomerDOB],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/ssn'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/email'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerDOBComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'ssn',
        // canActivate: [CanActivateQuestionsNewCustomerSSN],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/address'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/date-of-birth'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerSSNComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'address',
        // canActivate: [CanActivateQuestionsCustomerAddress],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/address-information'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/ssn'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerAddressComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'address-information',
        // canActivate: [CanActivateQuestionsCustomerAddressInfo],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/marital-status'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/address'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerAddressInfoComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'marital-status',
        // canActivate: [CanActivateQuestionsCustomerMaritalStatus],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/new-customer/address-information'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerMaritalStatusComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'name/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerNameComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'phone/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerPhoneComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'email/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerEmailComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'date-of-birth/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerDOBComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'ssn/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsNewCustomerSSNComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'address/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerAddressComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'address-information/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerAddressInfoComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'marital-status/edit',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/new-customer/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/new-customer/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsCustomerMaritalStatusComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'confirm',
        // canActivate: [CanActivateQuestionsCustomerConfirm],
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        component: TwoColumnComponent,
        data: {
          sectionId: 10,
          saveAction: ['/mortgage-intent'],
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          },
          answers: [{
            title: 'Primary Borrower Name',
            returnLink: '/new-customer/name/edit',
            selector: getCustomerNameState,
            type: 'name'
          }, {
            title: 'Primary Borrower Phone',
            returnLink: '/new-customer/phone/edit',
            selector: getCustomerPhoneState,
            type: 'phone'
          }, {
            title: 'Primary Borrower Email',
            returnLink: '/new-customer/email/edit',
            selector: getCustomerEmailState
          }, {
            title: 'Primary Borrower DOB',
            returnLink: '/new-customer/date-of-birth/edit',
            selector: getCustomerDOBState
          }, {
            title: 'Primary Borrower SSN',
            returnLink: '/new-customer/ssn/edit',
            selector: getCustomerSSNState,
            type: 'ssn'
          }, {
            title: 'Current Address',
            returnLink: '/new-customer/address/edit',
            selector: getCustomerAddressState,
            type: 'address'
          }, {
            title: 'At Current Address Since',
            returnLink: '/new-customer/address-information/edit',
            selector: getCustomerAddressInfoState
          }, {
            title: 'Marital Status',
            returnLink: '/new-customer/marital-status/edit',
            selector: getCustomerMaritalStatusState,
            type: 'marital-status'
          }]
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsConfirmComponent
        }, includeLazyLoadOfLender]
      }
    ]);
  });
});
