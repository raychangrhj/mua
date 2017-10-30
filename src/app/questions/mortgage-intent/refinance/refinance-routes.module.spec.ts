import { Routes } from '@angular/router';

import { routes } from './refinance-routes.module';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';
import {
  getMortgageIntendedUseState,
  getMortgagePropertyLocationState
} from '../shared/ngrx/reducers/index.reducer';
import {
  getRefinanceAppraisalState,
  getRefinanceIntentState,
  getRefinanceLoanAmountState,
  getRefinanceOweState,
  getRefinancePaymentState
} from './ngrx/reducers/index.reducer';
import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsMortgageIntentPrimaryUseComponent } from '../shared/primary-use/primary-use.component';
import { QuestionsMortgageIntentRefinanceLoanAmountComponent } from './loan-amount/loan-amount.component';
import { QuestionsMortgageIntentPrimaryResidenceComponent } from '../shared/primary-residence/primary-residence.component';
import { QuestionsMortgageIntentRefinancePaymentsComponent } from './payments/payments.component';
import { QuestionsMortgageIntentRefinanceAppraisalComponent } from './appraisal/appraisal.component';
import { QuestionsMortgageIntentRefinanceOweComponent } from './owe/owe.component';
import { QuestionsMortgageIntentPropertyLocationComponent } from '../shared/property-location/property-location.component';
import { QuestionsMortgageIntentRefinanceLoansComponent } from './loans/loans.component';
import { QuestionsMortgageIntentRefinanceIntentComponent } from './intent/intent.component';
import { CanActivateQuestionsMortgageIntentIntent } from './core/intent/intent.guard';
import { CanActivateQuestionsMortgageIntentLoans } from './core/loans/loans.guard';
import { CanActivateQuestionsMortgageIntentLocation } from './core/property-location/property-location.guard';
import { CanActivateQuestionsMortgageIntentOwe } from './core/owe/owe.guard';
import { CanActivateQuestionsMortgageIntentPayments } from './core/payments/payment.guard';
import { CanActivateQuestionsMortgageIntentAppraisal } from './core/appraisal/appraisal.guard';
import { CanActivateQuestionsMortgageIntentLoanAmount } from './core/loan-amount/loan-amount.guard';
import { CanActivateQuestionsMortgageIntentPrimaryResidence } from './core/primary-residence/primary-residence.guard';
import { CanActivateQuestionsMortgageIntentPrimaryUse } from './core/primary-use/primary-use.guard';
import { CanActivateQuestionsMortgageIntentConfirm } from './core/confirm/confirm.guard';

describe('AppRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([
      {
        path: '',
        redirectTo: 'intent',
        pathMatch: 'full'
      },
      {
        path: 'intent',
        // canActivate: [CanActivateQuestionsMortgageIntentIntent],
        children: [{
          path: '',
          component: TwoColumnComponent,
          resolve: {
            progressUpdate: ProgressUpdateService
          },
          data: {
            sectionId: 20,
            saveAction: ['/mortgage-intent/refinance/location'],
            actionBtnGroupLinkOptions: {
              back: {
                link: {
                  routerLink: '/mortgage-intent'
                }
              },
              next: true,
              saveAndExit: true
            }
          },
          children: [{
            path: '',
            outlet: 'content',
            component: QuestionsMortgageIntentRefinanceIntentComponent,
          }, includeLazyLoadOfLender]
        }]
      },
      // TODO add back into the flow whenever services are available
      {
        path: 'loans',
        // canActivate: [CanActivateQuestionsMortgageIntentLoans],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/location'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceLoansComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'location',
        // canActivate: [CanActivateQuestionsMortgageIntentLocation],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/owe'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/intent'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentPropertyLocationComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'owe',
        // canActivate: [CanActivateQuestionsMortgageIntentOwe],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/payments'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/location'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceOweComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'payments',
        // canActivate: [CanActivateQuestionsMortgageIntentPayments],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/appraisal'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/owe'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinancePaymentsComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'appraisal',
        // canActivate: [CanActivateQuestionsMortgageIntentAppraisal],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/loan-amount'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/payments'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceAppraisalComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'loan-amount',
        // canActivate: [CanActivateQuestionsMortgageIntentLoanAmount],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/primary-residence'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/appraisal'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceLoanAmountComponent,
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
                routerLink: '/mortgage-intent/refinance/loan-amount'
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
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/primary-residence'
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
        path: 'intent/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        children: [{
          path: '',
          component: TwoColumnComponent,
          resolve: {
            progressUpdate: ProgressUpdateService
          },
          data: {
            sectionId: 20,
            saveAction: ['/mortgage-intent/refinance/confirm'],
            actionBtnGroupLinkOptions: {
              cancel: {
                link: {
                  routerLink: '/mortgage-intent/refinance/confirm'
                }
              },
              save: true,
              saveAndExit: true
            }
          },
          children: [{
            path: '',
            outlet: 'content',
            component: QuestionsMortgageIntentRefinanceIntentComponent,
          }, includeLazyLoadOfLender]
        }]
      },
      {
        path: 'loans/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceLoansComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'location/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentPropertyLocationComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'owe/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceOweComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'payments/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinancePaymentsComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'appraisal/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceAppraisalComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'loan-amount/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/refinance/confirm'
              }
            },
            save: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentRefinanceLoanAmountComponent,
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
                routerLink: '/mortgage-intent/refinance/confirm'
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
          saveAction: ['/mortgage-intent/refinance/confirm'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/refinance/primary-residence/edit'
              }
            },
            save: true,
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
            title: 'Loan Intent',
            returnLink: '/mortgage-intent/refinance/intent/edit',
            selector: getRefinanceIntentState,
            type: 'intent'
          }, {
            title: 'Property Address',
            returnLink: '/mortgage-intent/refinance/location/edit',
            selector: getMortgagePropertyLocationState,
            type: 'address'
          }, {
            title: 'Current Mortgage Balance',
            returnLink: '/mortgage-intent/refinance/owe/edit',
            selector: getRefinanceOweState,
            type: 'currency'
          }, {
            title: 'Current Monthly Payment',
            returnLink: '/mortgage-intent/refinance/payments/edit',
            selector: getRefinancePaymentState,
            type: 'currency'
          }, {
            title: 'Estimated Property Value',
            returnLink: '/mortgage-intent/refinance/appraisal/edit',
            selector: getRefinanceAppraisalState,
            type: 'currency'
          }, {
            title: 'Requested Loan Amount',
            returnLink: '/mortgage-intent/refinance/loan-amount/edit',
            selector: getRefinanceLoanAmountState,
            type: 'currency'
          }, {
            title: 'Intended Use',
            returnLink: '/mortgage-intent/refinance/primary-residence/edit',
            selector: getMortgageIntendedUseState,
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
