import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { QuestionsNewCustomerNameComponent } from '../../customer/new/name/name.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsNewCustomerPhoneComponent } from '../../customer/new/phone/phone.component';
import { QuestionsNewCustomerEmailComponent } from '../../customer/new/email/email.component';
import { QuestionsCustomerAddressComponent } from '../../customer/shared/address/address.component';
import { QuestionsCustomerAddressInfoComponent } from '../../customer/shared/address-info/address-info.component';
import { ProgressUpdateService } from '../../core/progress-update.service';
import {
  getCustomerAddressInfoState,
  getCustomerAddressState,
  getCustomerDOBState,
  getCustomerEmailState,
  getCustomerMaritalStatusState,
  getCustomerNameState,
  getCustomerPhoneState,
  getCustomerSSNState
} from '../../customer/shared/ngrx/reducers/index.reducer';
import { QuestionsNewCustomerDOBComponent } from '../../customer/new/dob/dob.component';
import { QuestionsNewCustomerSSNComponent } from '../../customer/new/ssn/ssn.component';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';
import { QuestionsCustomerMaritalStatusComponent } from '../../customer/shared/marital-status/marital-status.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'name'
}, {
  path: 'name',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/phone'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: ['/co-borrower/welcome']
        }
      },
      next: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerNameComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'phone',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/email'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: ['/co-borrower/personal-information/name']
        }
      },
      next: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerPhoneComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'email',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/date-of-birth'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: ['/co-borrower/personal-information/phone']
        }
      },
      next: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerEmailComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'date-of-birth',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/ssn'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: '/co-borrower/personal-information/email'
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
}, {
  path: 'ssn',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/address'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: '/co-borrower/personal-information/date-of-birth'
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
}, {
  path: 'address',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    isCoBorrowerPage: true,
    saveAction: ['/co-borrower/personal-information/address-information'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: ['/co-borrower/personal-information/date-of-birth']
        }
      },
      next: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsCustomerAddressComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'address-information',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    isCoBorrowerPage: true,
    saveAction: ['/co-borrower/personal-information/marital-status'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: ['/co-borrower/personal-information/email']
        }
      },
      next: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsCustomerAddressInfoComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'marital-status',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      back: {
        link: {
          routerLink: '/co-borrower/personal-information/address-information'
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
}, {
  path: 'name/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: ['/co-borrower/personal-information/confirm']
        }
      },
      save: true,
      saveAndExit: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerNameComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'phone/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: ['/co-borrower/personal-information/confirm']
        }
      },
      save: true,
      saveAndExit: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerPhoneComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'email/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: ['/co-borrower/personal-information/confirm']
        }
      },
      save: true,
      saveAndExit: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsNewCustomerEmailComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'date-of-birth/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: '/co-borrower/personal-information/confirm'
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
}, {
  path: 'ssn/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: '/co-borrower/personal-information/confirm'
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
}, {
  path: 'address/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: ['/co-borrower/personal-information/confirm']
        }
      },
      save: true,
      saveAndExit: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsCustomerAddressComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'address-information/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: ['/co-borrower/personal-information/confirm']
        }
      },
      save: true,
      saveAndExit: true
    }
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsCustomerAddressInfoComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'marital-status/edit',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/personal-information/confirm'],
    actionBtnGroupLinkOptions: {
      cancel: {
        link: {
          routerLink: '/co-borrower/personal-information/confirm'
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
}, {
  path: 'confirm',
  resolve: {
    progressUpdate: ProgressUpdateService
  },
  component: TwoColumnComponent,
  data: {
    sectionId: 60,
    saveAction: ['/co-borrower/income'],
    actionBtnGroupLinkOptions: {
      saveAndExit: true
    },
    answers: [{
      title: 'Co-Borrower Name',
      returnLink: '/co-borrower/personal-information/name/edit',
      selector: getCustomerNameState,
      type: 'name'
    }, {
      title: 'Co-Borrower Phone',
      returnLink: '/co-borrower/personal-information/phone/edit',
      selector: getCustomerPhoneState,
      type: 'phone'
    }, {
      title: 'Co-Borrower Email',
      returnLink: '/co-borrower/personal-information/email/edit',
      selector: getCustomerEmailState
    }, {
      title: 'Co-Borrower DOB',
      returnLink: '/co-borrower/personal-information/date-of-birth/edit',
      selector: getCustomerDOBState
    }, {
      title: 'Co-Borrower SSN',
      returnLink: '/co-borrower/personal-information/ssn/edit',
      selector: getCustomerSSNState,
      type: 'ssn'
    }, {
      title: 'Current Address',
      returnLink: '/co-borrower/personal-information/address/edit',
      selector: getCustomerAddressState,
      type: 'address'
    }, {
      title: 'At Current Address Since',
      returnLink: '/co-borrower/personal-information/address-information/edit',
      selector: getCustomerAddressInfoState
    }, {
      title: 'Marital Status',
      returnLink: '/co-borrower/personal-information/marital-status/edit',
      selector: getCustomerMaritalStatusState,
      type: 'marital-status'
    }]
  },
  children: [{
    path: '',
    outlet: 'content',
    component: QuestionsConfirmComponent
  }, includeLazyLoadOfLender]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsCoBorrowerPersonalInformationRoutingModule { }
