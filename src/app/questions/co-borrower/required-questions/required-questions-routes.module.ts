import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsRequiredQuestionsIntroComponent } from '../../required-questions/intro/intro.component';
import {
  QuestionsRequiredQuestionsOutstandingJudgementsComponent
} from '../../required-questions/outstanding-judgements/outstanding-judgements.component';
import { QuestionsRequiredQuestionsBankruptciesComponent } from '../../required-questions/bankruptcies/bankruptcies.component';
import { QuestionsRequiredQuestionsForeclosuresComponent } from '../../required-questions/foreclosures/foreclosures.component';
import { QuestionsRequiredQuestionsLawsuitsComponent } from '../../required-questions/lawsuits/lawsuits.component';
import {
  QuestionsRequiredQuestionsForeclosureJudgementsComponent
} from '../../required-questions/foreclosure-judgements/foreclosure-judgements.component';
import {
  QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent
} from '../../required-questions/federal-debt-delinquencies/federal-debt-delinquencies.component';
import { QuestionsRequiredQuestionsAlimonyComponent } from '../../required-questions/alimony/alimony.component';
import {
  QuestionsRequiredQuestionsBorrowedDownPaymentComponent
} from '../../required-questions/borrowed-down-payment/borrowed-down-payment.component';
import { QuestionsRequiredQuestionsCoMakerOnNoteComponent } from '../../required-questions/co-maker-on-note/co-maker-on-note.component';
import { QuestionsRequiredQuestionsUsCitizenComponent } from '../../required-questions/us-citizen/us-citizen.component';
import {
  QuestionsRequiredQuestionsOwnershipInterestComponent
} from '../../required-questions/ownership-interest/ownership-interest.component';
import {
  QuestionsRequiredQuestionsPermanentResidentAlienComponent
} from '../../required-questions/permanent-resident-alien/permanent-resident-alien.component';
import { QuestionsRequiredQuestionsMonitoringComponent } from '../../required-questions/monitoring/monitoring.component';
import { QuestionsRequiredQuestionsRaceComponent } from '../../required-questions/race/race.component';
import { QuestionsRequiredQuestionsEthnicityComponent } from '../../required-questions/ethnicity/ethnicity.component';
import { QuestionsRequiredQuestionsSexComponent } from '../../required-questions/sex/sex.component';
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
} from '../../required-questions/ngrx/reducers/government-questions.reducer';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';

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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/judgements'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/assets/gift'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/bankruptcies'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/intro'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/foreclosures'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/judgements'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/lawsuits'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/bankruptcies'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/loan-obligations'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/foreclosures'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/federal-delinquencies'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/lawsuits'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/child-support'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/loan-obligations'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/borrowed-down-payment'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/federal-delinquencies'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/co-maker-on-note'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/child-support'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/us-citizen'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/borrowed-down-payment'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/permanent-resident-alien'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/co-maker-on-note'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/ownership-interest'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/us-citizen'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/government-monitoring'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/permanent-resident-alien'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/ethnicity'],
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/race'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/government-monitoring'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/sex'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/ethnicity'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/co-borrower/required-questions/race'
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
    path: 'intro/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
          }
        },
        save: true,
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
    path: 'judgements/edit',
    // canActivate: [],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      saveAction: ['/co-borrower/required-questions/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/co-borrower/required-questions/confirm'
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
      sectionId: 100,
      actionBtnGroupLinkOptions: {
        saveAndExit: true
      },
      answers: [{
        title: 'Outstanding Judgements?',
        returnLink: '/co-borrower/required-questions/judgements/edit',
        selector: getGovernmentQuestionsOutstandingJudgementsState,
        type: 'boolean'
      }, {
        title: 'Bankrupt in 7 years?',
        returnLink: '/co-borrower/required-questions/bankruptcies/edit',
        selector: getGovernmentQuestionsBankruptciesState,
        type: 'boolean'
      }, {
        title: 'Foreclosure in 7 years?',
        returnLink: '/co-borrower/required-questions/foreclosures/edit',
        selector: getGovernmentQuestionsForeclosuresState,
        type: 'boolean'
      }, {
        title: 'Party to lawsuit?',
        returnLink: '/co-borrower/required-questions/lawsuits/edit',
        selector: getGovernmentQuestionsLawsuitsState,
        type: 'boolean'
      }, {
        title: 'Loan obligations?',
        returnLink: '/co-borrower/required-questions/loan-obligations/edit',
        selector: getGovernmentQuestionsForeclosureJudgementsState,
        type: 'boolean'
      }, {
        title: 'Delinquent?',
        returnLink: '/co-borrower/required-questions/federal-delinquencies/edit',
        selector: getGovernmentQuestionsFederalDebtDelinquenciesState,
        type: 'boolean'
      }, {
        title: 'Alimony obligations?',
        returnLink: '/co-borrower/required-questions/child-support/edit',
        selector: getGovernmentQuestionsAlimonyState,
        type: 'boolean'
      }, {
        title: 'Down payment borrowed?',
        returnLink: '/co-borrower/required-questions/borrowed-down-payment/edit',
        selector: getGovernmentQuestionsBorrowedDownPaymentState,
        type: 'boolean'
      }, {
        title: 'CoMaker on Loan?',
        returnLink: '/co-borrower/required-questions/co-maker-on-note/edit',
        selector: getGovernmentQuestionsCoMakerOnNoteState,
        type: 'boolean'
      }, {
        title: 'U.S. Citizen',
        returnLink: '/co-borrower/required-questions/us-citizen/edit',
        selector: getGovernmentQuestionsUSCitizenState,
        type: 'boolean'
      }, {
        title: 'Permanent resident alien?',
        returnLink: '/co-borrower/required-questions/permanent-resident-alien/edit',
        selector: getGovernmentQuestionsPermanentResidentAlienState,
        type: 'boolean'
      }, {
        title: 'Ownership interest?',
        returnLink: '/co-borrower/required-questions/ownership-interest/edit',
        selector: getGovernmentQuestionsOwnershipInterestState,
        type: 'boolean'
      }, {
        title: 'Ethnicity',
        returnLink: '/co-borrower/required-questions/ethnicity/edit',
        selector: getEthnicityState,
        type: 'ethnicity'
      }, {
        title: 'Race',
        returnLink: '/co-borrower/required-questions/race/edit',
        selector: getRaceState,
        type: 'race'
      }, {
        title: 'Sex',
        returnLink: '/co-borrower/required-questions/sex/edit',
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
export class QuestionsCoBorrowerRequiredQuestionsRoutingModule { }
