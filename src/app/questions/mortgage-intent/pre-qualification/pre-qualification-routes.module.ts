import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsMortgageIntentPreQualificationOnBoardingComponent } from './on-boarding/on-boarding.component';
import { QuestionsMortgageIntentCostComponent } from '../shared/cost/cost.component';
import { QuestionsMortgageIntentDownPaymentComponent } from '../shared/down-payment/down-payment.component';
import { QuestionsMortgageIntentConfirmLoanAmountComponent } from '../shared/confirm-loan-amount/confirm-loan-amount.component';
import { QuestionsMortgageIntentPrimaryResidenceComponent } from '../shared/primary-residence/primary-residence.component';
import { QuestionsMortgageIntentPrimaryUseComponent } from '../shared/primary-use/primary-use.component';
import {
  getMortgageCostState,
  getMortgageDownPaymentState,
  getMortgageIntendedUseState,
  getMortgageLoanAmountState
} from '../shared/ngrx/reducers/index.reducer';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [CanActivateQuestionsMortgageIntentProperty],
    children: [{
      path: '',
      component: TwoColumnComponent,
      resolve: {
        progressUpdate: ProgressUpdateService
      },
      data: {
        sectionId: 20,
        saveAction: ['/mortgage-intent/pre-qualification/cost'],
        actionBtnGroupLinkOptions: {
          back: {
            link: {
              routerLink: '/mortgage-intent/buying'
            }
          },
          next: true,
          saveAndExit: true
        }
      },
      children: [{
        path: '',
        outlet: 'content',
        component: QuestionsMortgageIntentPreQualificationOnBoardingComponent,
      }, includeLazyLoadOfLender]
    }]
  },
  {
    path: 'cost',
    // canActivate: [CanActivateQuestionsMortgageIntentPropertyLocation],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/down-payment'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentCostComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'down-payment',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirmLocation],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/confirm-loan-details'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/cost'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentDownPaymentComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'confirm-loan-details',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirmLoanAmount],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/primary-residence'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/down-payment'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentConfirmLoanAmountComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'primary-residence',
    // canActivate: [CanActivateQuestionsMortgageIntentPrimaryResidence],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/confirm-loan-details'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentPrimaryResidenceComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'primary-use',
    // canActivate: [CanActivateQuestionsMortgageIntentPrimaryUse],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/confirm'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/primary-residence'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentPrimaryUseComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'cost/edit',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentCostComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'down-payment/edit',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/confirm'],
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/confirm'
          }
        },
        save: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentDownPaymentComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'primary-residence/edit',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      actionBtnGroupLinkOptions: {
        cancel: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/confirm'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentPrimaryResidenceComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'primary-use/edit',
    // canActivate: [CanActivateQuestionsMortgageIntentPrimaryUse],
    component: TwoColumnComponent,
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 20,
      saveAction: ['/mortgage-intent/pre-qualification/confirm'],
      actionBtnGroupLinkOptions: {
        back: {
          link: {
            routerLink: '/mortgage-intent/pre-qualification/primary-residence/edit'
          }
        },
        next: true,
        saveAndExit: true
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: QuestionsMortgageIntentPrimaryUseComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'confirm',
    // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    component: TwoColumnComponent,
    data: {
      sectionId: 20,
      saveAction: ['/income'],
      actionBtnGroupLinkOptions: {
        saveAndExit: true
      },
      answers: [{
        title: 'Budget',
        returnLink: '/mortgage-intent/pre-qualification/cost/edit',
        selector: getMortgageCostState,
        type: 'currency'
      }, {
        title: 'Down Payment',
        returnLink: '/mortgage-intent/pre-qualification/down-payment/edit',
        selector: getMortgageDownPaymentState,
        type: 'currency'
      }, {
        title: 'Estimated Loan Amount',
        selector: getMortgageLoanAmountState,
        type: 'currency'
      }, {
        title: 'Intended Use',
        returnLink: '/mortgage-intent/pre-qualification/primary-residence/edit',
        selector: getMortgageIntendedUseState,
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
export class QuestionsMortgageIntentPreQualificationRoutingModule {
}
