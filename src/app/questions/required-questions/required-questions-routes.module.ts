import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ProgressUpdateService } from '../core/progress-update.service';
import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { QuestionsRequiredQuestionsIntroComponent } from './intro/intro.component';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsRequiredQuestionsOutstandingJudgementsComponent } from './outstanding-judgements/outstanding-judgements.component';
import { QuestionsRequiredQuestionsBankruptciesComponent } from './bankruptcies/bankruptcies.component';
import { QuestionsRequiredQuestionsForeclosuresComponent } from './foreclosures/foreclosures.component';
import {
  QuestionsRequiredQuestionsLawsuitsComponent
} from './lawsuits/lawsuits.component';
import { QuestionsRequiredQuestionsForeclosureJudgementsComponent } from './foreclosure-judgements/foreclosure-judgements.component';
import {
  QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent
} from './federal-debt-delinquencies/federal-debt-delinquencies.component';
import { QuestionsRequiredQuestionsAlimonyComponent } from './alimony/alimony.component';
import { QuestionsRequiredQuestionsBorrowedDownPaymentComponent } from './borrowed-down-payment/borrowed-down-payment.component';
import { QuestionsRequiredQuestionsCoMakerOnNoteComponent } from './co-maker-on-note/co-maker-on-note.component';
import { QuestionsRequiredQuestionsUsCitizenComponent } from './us-citizen/us-citizen.component';
import { QuestionsRequiredQuestionsPermanentResidentAlienComponent } from './permanent-resident-alien/permanent-resident-alien.component';
import { QuestionsRequiredQuestionsOwnershipInterestComponent } from './ownership-interest/ownership-interest.component';
import { QuestionsRequiredQuestionsMonitoringComponent } from './monitoring/monitoring.component';
import { QuestionsRequiredQuestionsEthnicityComponent } from './ethnicity/ethnicity.component';
import { QuestionsRequiredQuestionsRaceComponent } from './race/race.component';
import { QuestionsRequiredQuestionsSexComponent } from './sex/sex.component';
import { QuestionsConfirmComponent } from '../shared/confirm/confirm.component';
import {
  getEthnicityState,
  getGovernmentQuestionsAlimonyState,
  getGovernmentQuestionsBankruptciesState,
  getGovernmentQuestionsBorrowedDownPaymentState,
  getGovernmentQuestionsCoMakerOnNoteState,
  getGovernmentQuestionsFederalDebtDelinquenciesState,
  getGovernmentQuestionsForeclosureJudgementsState,
  getGovernmentQuestionsForeclosuresState,
  getGovernmentQuestionsLawsuitsState,
  getGovernmentQuestionsOutstandingJudgementsState,
  getGovernmentQuestionsOwnershipInterestState,
  getGovernmentQuestionsPermanentResidentAlienState,
  getGovernmentQuestionsUSCitizenState,
  getRaceState,
  getSexState
} from './ngrx/reducers/government-questions.reducer';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/judgements'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/assets/gift'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsIntroComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'judgements',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/bankruptcies'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/intro'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsOutstandingJudgementsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'bankruptcies',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/foreclosures'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/judgements'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsBankruptciesComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'foreclosures',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/lawsuits'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/bankruptcies'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsForeclosuresComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'lawsuits',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/loan-obligations'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/foreclosures'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsLawsuitsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'loan-obligations',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/federal-delinquencies'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/lawsuits'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsForeclosureJudgementsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'federal-delinquencies',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/child-support'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/loan-obligations'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'child-support',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/borrowed-down-payment'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/federal-delinquencies'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsAlimonyComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'borrowed-down-payment',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/co-maker-on-note'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/child-support'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsBorrowedDownPaymentComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'co-maker-on-note',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/us-citizen'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/borrowed-down-payment'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsCoMakerOnNoteComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'us-citizen',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/permanent-resident-alien'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/co-maker-on-note'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsUsCitizenComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'permanent-resident-alien',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/ownership-interest'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/us-citizen'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsPermanentResidentAlienComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'ownership-interest',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/government-monitoring'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/permanent-resident-alien'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsOwnershipInterestComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'government-monitoring',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/ethnicity'],
      actionBtnGroupLinkOptions: {
        back: false,
        next: false,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsMonitoringComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'ethnicity',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/race'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/government-monitoring'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsEthnicityComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'race',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/sex'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/ethnicity'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsRaceComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'sex',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/required-questions/race'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsSexComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'judgements/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsOutstandingJudgementsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'bankruptcies/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsBankruptciesComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'foreclosures/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsForeclosuresComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'lawsuits/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsLawsuitsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'loan-obligations/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsForeclosureJudgementsComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'federal-delinquencies/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'child-support/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsAlimonyComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'borrowed-down-payment/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsBorrowedDownPaymentComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'co-maker-on-note/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsCoMakerOnNoteComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'us-citizen/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsUsCitizenComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'permanent-resident-alien/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsPermanentResidentAlienComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'ownership-interest/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsOwnershipInterestComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'ethnicity/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsEthnicityComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'race/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsRaceComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'sex/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 50,
      saveAction: ['/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/required-questions/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsRequiredQuestionsSexComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'confirm',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      saveAction: ['/co-borrower-inquiry'],
      sectionId: 50,
      actionBtnGroupLinkOptions: {
        saveAndExit: true
      },
      answers: [{
        title: 'Outstanding Judgements?',
        returnLink: '/required-questions/judgements/edit',
        selector: getGovernmentQuestionsOutstandingJudgementsState,
        type: 'boolean'
      }, {
        title: 'Bankrupt in 7 years?',
        returnLink: '/required-questions/bankruptcies/edit',
        selector: getGovernmentQuestionsBankruptciesState,
        type: 'boolean'
      }, {
        title: 'Foreclosure in 7 years?',
        returnLink: '/required-questions/foreclosures/edit',
        selector: getGovernmentQuestionsForeclosuresState,
        type: 'boolean'
      }, {
        title: 'Party to lawsuit?',
        returnLink: '/required-questions/lawsuits/edit',
        selector: getGovernmentQuestionsLawsuitsState,
        type: 'boolean'
      }, {
        title: 'Loan obligations?',
        returnLink: '/required-questions/loan-obligations/edit',
        selector: getGovernmentQuestionsForeclosureJudgementsState,
        type: 'boolean'
      }, {
        title: 'Delinquent?',
        returnLink: '/required-questions/federal-delinquencies/edit',
        selector: getGovernmentQuestionsFederalDebtDelinquenciesState,
        type: 'boolean'
      }, {
        title: 'Alimony obligations?',
        returnLink: '/required-questions/child-support/edit',
        selector: getGovernmentQuestionsAlimonyState,
        type: 'boolean'
      }, {
        title: 'Down payment borrowed?',
        returnLink: '/required-questions/borrowed-down-payment/edit',
        selector: getGovernmentQuestionsBorrowedDownPaymentState,
        type: 'boolean'
      }, {
        title: 'CoMaker on Loan?',
        returnLink: '/required-questions/co-maker-on-note/edit',
        selector: getGovernmentQuestionsCoMakerOnNoteState,
        type: 'boolean'
      }, {
        title: 'U.S. Citizen',
        returnLink: '/required-questions/us-citizen/edit',
        selector: getGovernmentQuestionsUSCitizenState,
        type: 'boolean'
      }, {
        title: 'Permanent resident alien?',
        returnLink: '/required-questions/permanent-resident-alien/edit',
        selector: getGovernmentQuestionsPermanentResidentAlienState,
        type: 'boolean'
      }, {
        title: 'Ownership interest?',
        returnLink: '/required-questions/ownership-interest/edit',
        selector: getGovernmentQuestionsOwnershipInterestState,
        type: 'boolean'
      }, {
        title: 'Ethnicity',
        returnLink: '/required-questions/ethnicity/edit',
        selector: getEthnicityState,
        type: 'ethnicity'
      }, {
        title: 'Race',
        returnLink: '/required-questions/race/edit',
        selector: getRaceState,
        type: 'race'
      }, {
        title: 'Sex',
        returnLink: '/required-questions/sex/edit',
        selector: getSexState,
        type: 'sex'
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
export class QuestionsRequiredQuestionsRoutingModule { }
