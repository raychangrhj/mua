import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsIncomeCurrentEmploymentComponent } from '../../income/employment/current-employment.component';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsIncomeEmploymentCompanyNameComponent } from '../../income/employment/company-name/company-name.component';
import { QuestionsIncomeEmploymentTitleComponent } from '../../income/employment/title/title.component';
import { QuestionsIncomeEmploymentCompanyLocationComponent } from '../../income/employment/company-location/company-location.component';
import { QuestionsIncomeEmploymentDurationComponent } from '../../income/employment/duration/employment-duration.component';
import { CurrentEmploymentService } from '../../income/core/current-employment.service';
import { QuestionsIncomePreviousEmploymentComponent } from '../../income/employment/previous-employment.component';
import { PreviousEmploymentService } from '../../income/core/previous-employment.service';
import { QuestionsIncomeOtherIncomeComponent } from '../../income/other/other-income.component';
import { QuestionsIncomeOtherIncomeTypeComponent } from '../../income/other/type/type.component';
import { QuestionsIncomeRentalLocationComponent } from '../../income/other/rental-location/rental-location.component';
import { CurrentOtherIncomeService } from '../../income/core/current-other-income.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employment',
    pathMatch: 'full'
  },
  {
    path: 'employment',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 80,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeCurrentEmploymentComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'company-name',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/employment/title'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/employment'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentCompanyNameComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'title',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/employment/company-location'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/employment/company-name'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentTitleComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'company-location',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/employment/dates'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/employment/title'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentCompanyLocationComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'dates',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/employment'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/employment/company-location'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentDurationComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: ':index',
        children: [
          {
            path: '',
            redirectTo: 'company-name/edit',
            pathMatch: 'full'
          },
          {
            path: 'company-name/edit',
            resolve: {
              currentEmployment: CurrentEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentCompanyNameComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'title/edit',
            resolve: {
              currentEmployment: CurrentEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentTitleComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'company-location/edit',
            resolve: {
              currentEmployment: CurrentEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentCompanyLocationComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'dates/edit',
            resolve: {
              currentEmployment: CurrentEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentDurationComponent
            }, includeLazyLoadOfLender]
          }
        ]
      }
    ]
  },
  {
    path: 'previous-employment',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 80,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/other-income'],
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomePreviousEmploymentComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'company-name',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/previous-employment/title'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/previous-employment'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentCompanyNameComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'title',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/previous-employment/company-location'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/previous-employment/company-name'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentTitleComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'company-location',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/previous-employment/dates'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/previous-employment/title'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentCompanyLocationComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'dates',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/previous-employment'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/previous-employment/company-location'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeEmploymentDurationComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: ':index',
        children: [
          {
            path: 'company-name/edit',
            resolve: {
              currentEmployment: PreviousEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/previous-employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentCompanyNameComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'title/edit',
            resolve: {
              currentEmployment: PreviousEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/previous-employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentTitleComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'company-location/edit',
            resolve: {
              currentEmployment: PreviousEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/previous-employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentCompanyLocationComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'dates/edit',
            resolve: {
              currentEmployment: PreviousEmploymentService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/previous-employment'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeEmploymentDurationComponent
            }, includeLazyLoadOfLender]
          }
        ]
      }
    ]
  },
  {
    path: 'other-income',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 80,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets'],
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeOtherIncomeComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'type',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/other-income'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeOtherIncomeTypeComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'rental-location',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/income/other-income'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/income/other-income/type'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsIncomeRentalLocationComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: ':index',
        children: [
          {
            path: 'type/edit',
            resolve: {
              currentOtherIncome: CurrentOtherIncomeService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/other-income'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/other-income'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeOtherIncomeTypeComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'rental-location/edit',
            resolve: {
              currentOtherIncome: CurrentOtherIncomeService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/income/other-income'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/income/other-income'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsIncomeRentalLocationComponent
            }, includeLazyLoadOfLender]
          }
        ]
      }
    ]
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
export class QuestionsCoBorrowerIncomeRoutingModule { }
