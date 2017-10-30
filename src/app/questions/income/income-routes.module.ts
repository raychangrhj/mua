import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ProgressUpdateService } from '../core/progress-update.service';
import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsIncomeOtherIncomeTypeComponent } from './other/type/type.component';
import { QuestionsIncomeEmploymentDurationComponent } from './employment/duration/employment-duration.component';
import { QuestionsIncomeEmploymentCompanyLocationComponent } from './employment/company-location/company-location.component';
import { QuestionsIncomeEmploymentTitleComponent } from './employment/title/title.component';
import { QuestionsIncomeEmploymentCompanyNameComponent } from './employment/company-name/company-name.component';
import { QuestionsIncomeCurrentEmploymentComponent } from './employment/current-employment.component';
import { QuestionsIncomePreviousEmploymentComponent } from './employment/previous-employment.component';
import { CurrentEmploymentService } from './core/current-employment.service';
import { QuestionsIncomeOtherIncomeComponent } from './other/other-income.component';
import { QuestionsIncomeRentalLocationComponent } from './other/rental-location/rental-location.component';
import { PreviousEmploymentService } from './core/previous-employment.service';
import { CurrentOtherIncomeService } from './core/current-other-income.service';

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
      sectionId: 30,
    },
    children: [
      {
        path: '',
        data: {
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        // canActivate: [],
        component: TwoColumnComponent,
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
          saveAction: ['/income/employment/title'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/employment'
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
          saveAction: ['/income/employment/company-location'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/employment/company-name'
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
          saveAction: ['/income/employment/dates'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/employment/title'
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
          saveAction: ['/income/employment'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/employment/company-location'
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
              saveAction: ['/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/employment'
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
              saveAction: ['/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/employment'
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
              saveAction: ['/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/employment'
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
              saveAction: ['/income/employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/employment'
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
      sectionId: 30,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/income/other-income'],
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
          saveAction: ['/income/previous-employment/title'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/previous-employment'
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
          saveAction: ['/income/previous-employment/company-location'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/previous-employment/company-name'
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
          saveAction: ['/income/previous-employment/dates'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/previous-employment/title'
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
          saveAction: ['/income/previous-employment'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/previous-employment/company-location'
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
              saveAction: ['/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/previous-employment'
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
              saveAction: ['/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/previous-employment'
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
              saveAction: ['/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/previous-employment'
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
              saveAction: ['/income/previous-employment'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/previous-employment'
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
      sectionId: 30,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/assets'],
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
                routerLink: '/income/other-income'
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
          saveAction: ['/income/other-income'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/income/other-income/type'
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
              saveAction: ['/income/other-income'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/other-income'
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
              saveAction: ['/income/other-income'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/income/other-income'
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
          },
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
export class QuestionsIncomeRoutingModule { }
