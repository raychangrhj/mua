import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { QuestionsExistingCustomerHowToContinueComponent } from './how-to-continue/how-to-continue.component';
import { QuestionsExistingCustomerAtmCardComponent } from './atm-card/atm-card.component';
import { QuestionsExistingCustomerLogInComponent } from './log-in/log-in.component';
import { QuestionsExistingCustomerSecurityQuestionsComponent } from './security-questions/security-questions.component';
import { QuestionsExistingCustomerConfirmAddressComponent } from './confirm-address/confirm-address.component';
import { QuestionsCustomerAddressComponent } from '../shared/address/address.component';
import { QuestionsCustomerAddressInfoComponent } from '../shared/address-info/address-info.component';
import { QuestionsCustomerMaritalStatusComponent } from '../shared/marital-status/marital-status.component';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';
import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { CanActivateQuestionsExistingCustomerConfirmAddress } from './core/confirm-address/confirm-address.guard';
import { CanActivateQuestionsCustomerAddress } from '../core/address/address.guard';
import { CanActivateQuestionsCustomerAddressInfo } from '../core/address-info/address-info.guard';
import { CanActivateQuestionsCustomerMaritalStatus } from '../core/marital-status/marital-status.guard';
import { CanActivateQuestionsCustomerConfirm } from '../core/confirm/confirm.guard';
import {
  getCustomerAddressInfoState,
  getCustomerAddressState,
  getCustomerDOBState,
  getCustomerEmailState,
  getCustomerMaritalStatusState,
  getCustomerNameState,
  getCustomerPhoneState,
  getCustomerSSNState,
} from '../shared/ngrx/reducers/index.reducer';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsNewCustomerNameComponent } from '../new/name/name.component';
import { QuestionsNewCustomerPhoneComponent } from '../new/phone/phone.component';
import { QuestionsNewCustomerEmailComponent } from '../new/email/email.component';
import { QuestionsNewCustomerDOBComponent } from '../new/dob/dob.component';
import { QuestionsNewCustomerSSNComponent } from '../new/ssn/ssn.component';

export const routes: Routes = [
  {
    path: '',
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 10,
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/on-boarding'
          }
        },
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsExistingCustomerHowToContinueComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'atm',
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 10,
      saveAction: ['/existing-customer/confirm-address'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/existing-customer'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsExistingCustomerAtmCardComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'online-banking',
    children: [
      {
        path: '',
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 10,
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/existing-customer'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsExistingCustomerLogInComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'security-question',
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 10,
          saveAction: ['/existing-customer/confirm-address'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/existing-customer'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsExistingCustomerSecurityQuestionsComponent
        }, includeLazyLoadOfLender]
      }
    ]
  },
  {
    path: 'confirm-address',
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    // canActivate: [CanActivateQuestionsExistingCustomerConfirmAddress],
    data: {
      sectionId: 10,
      saveAction: ['/existing-customer/address-information'],
      actionBtnGroupLinkOptions: {
        cancel: {
          text: 'No',
          link: {
            routerLink: '/existing-customer/address'
          }
        },
        save: 'Yes',
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsExistingCustomerConfirmAddressComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'address',
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    // canActivate: [CanActivateQuestionsCustomerAddress],
    data: {
      sectionId: 10,
      saveAction: ['/existing-customer/address-information'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/existing-customer'
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
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    // canActivate: [CanActivateQuestionsCustomerAddressInfo],
    data: {
      sectionId: 10,
      saveAction: ['/existing-customer/marital-status'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/existing-customer/address'
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
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    // canActivate: [CanActivateQuestionsCustomerMaritalStatus],
    data: {
      sectionId: 10,
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/existing-customer/address-information'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
      saveAction: ['/existing-customer/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/existing-customer/confirm'
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
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 10,
      saveAction: ['/mortgage-intent'],
      actionBtnGroupLinkOptions: {
        saveAndExit: true
      },
      answers: [{
        title: 'Primary Borrower Name',
        returnLink: '/existing-customer/name/edit',
        selector: getCustomerNameState,
        type: 'name'
      }, {
        title: 'Primary Borrower Phone',
        returnLink: '/existing-customer/phone/edit',
        selector: getCustomerPhoneState,
        type: 'phone'
      }, {
        title: 'Primary Borrower Email',
        returnLink: '/existing-customer/email/edit',
        selector: getCustomerEmailState
      }, {
        title: 'Primary Borrower DOB',
        returnLink: '/existing-customer/date-of-birth/edit',
        selector: getCustomerDOBState
      }, {
        title: 'Primary Borrower SSN',
        returnLink: '/existing-customer/ssn/edit',
        selector: getCustomerSSNState,
        type: 'ssn'
      }, {
        title: 'Current Address',
        returnLink: '/existing-customer/address/edit',
        selector: getCustomerAddressState,
        type: 'address'
      }, {
        title: 'At Current Address Since',
        returnLink: '/existing-customer/address-information/edit',
        selector: getCustomerAddressInfoState
      }, {
        title: 'Marital Status',
        returnLink: '/existing-customer/marital-status/edit',
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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsExistingCustomerRoutingModule {
}
