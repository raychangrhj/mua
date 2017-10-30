import { Routes } from '@angular/router';

import { routes } from './buying-routes.module';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { QuestionsConfirmComponent } from '../../shared/confirm/confirm.component';
import { QuestionsMortgageIntentCostComponent } from '../shared/cost/cost.component';
import { QuestionsMortgageIntentPropertyComponent } from './property/property.component';
import { QuestionsMortgageIntentPrimaryUseComponent } from '../shared/primary-use/primary-use.component';
import { QuestionsMortgageIntentDownPaymentComponent } from '../shared/down-payment/down-payment.component';
import { QuestionsMortgageIntentPrimaryResidenceComponent } from '../shared/primary-residence/primary-residence.component';
import { QuestionsMortgageIntentConfirmLoanAmountComponent } from '../shared/confirm-loan-amount/confirm-loan-amount.component';
import { QuestionsMortgageIntentPropertyLocationComponent } from '../shared/property-location/property-location.component';
import { QuestionsMortgageIntentConfirmLocationDetailsComponent } from './confirm-location-details/confirm-location-details.component';
import { CanActivateQuestionsMortgageIntentConfirmLoanAmount } from './core/confirm-loan-amount/confirm-loan-amount.guard';
import { CanActivateQuestionsMortgageIntentDownPayment } from './core/down-payment/down-payment.guard';
import { CanActivateQuestionsMortgageIntentCost } from './core/cost/cost.guard';
import { CanActivateQuestionsMortgageIntentConfirmLocation } from './core/confirm-location-details/confirm-location-details.guard';
import { CanActivateQuestionsMortgageIntentConfirm } from './core/confirm/cofirm.guard';
import { CanActivateQuestionsMortgageIntentPrimaryUse } from './core/primary-use/primary-use.guard';
import { CanActivateQuestionsMortgageIntentPrimaryResidence } from './core/primary-residence/primary-residence.guard';
import { CanActivateQuestionsMortgageIntentPropertyLocation } from './core/property-location/property-location.guard';
import { CanActivateQuestionsMortgageIntentProperty } from './core/property/property.guard';
import {
  getMortgageCostState,
  getMortgageDownPaymentState,
  getMortgageIntendedUseState,
  getMortgageLoanAmountState,
  getMortgagePropertyLocationState
} from '../shared/ngrx/reducers/index.reducer';

describe('AppRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([
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
            saveAction: ['/mortgage-intent/buying/location'],
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
            component: QuestionsMortgageIntentPropertyComponent,
          }, includeLazyLoadOfLender]
        }]
      },
      {
        path: 'location',
        // canActivate: [CanActivateQuestionsMortgageIntentPropertyLocation],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/confirm-location'],
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
          component: QuestionsMortgageIntentPropertyLocationComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'confirm-location',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirmLocation],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/cost'],
          actionBtnGroupLinkOptions: {
            back: {
              text: 'No',
              link: {
                routerLink: '/mortgage-intent/buying/location'
              }
            },
            next: 'Yes',
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsMortgageIntentConfirmLocationDetailsComponent,
        }, includeLazyLoadOfLender]
      },
      {
        path: 'cost',
        // canActivate: [CanActivateQuestionsMortgageIntentCost],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/down-payment'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/buying/confirm-location'
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
        // canActivate: [CanActivateQuestionsMortgageIntentDownPayment],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/confirm-loan-details'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/buying/cost'
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
          saveAction: ['/mortgage-intent/buying/primary-residence'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/buying/down-payment'
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
                routerLink: '/mortgage-intent/buying/confirm-loan-details'
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
          saveAction: ['/mortgage-intent/buying/confirm'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/buying/primary-residence'
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
        path: 'location/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/buying/confirm'
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
        path: 'cost/edit',
        // canActivate: [CanActivateQuestionsMortgageIntentConfirm],
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
          saveAction: ['/mortgage-intent/buying/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/buying/confirm'
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
          saveAction: ['/mortgage-intent/buying/confirm'],
          actionBtnGroupLinkOptions: {
            cancel: {
              link: {
                routerLink: '/mortgage-intent/buying/confirm'
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
                routerLink: '/mortgage-intent/buying/confirm'
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
          saveAction: ['/mortgage-intent/buying/confirm'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/mortgage-intent/buying/primary-residence/edit'
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
            title: 'Property Address',
            returnLink: '/mortgage-intent/buying/location/edit',
            selector: getMortgagePropertyLocationState,
            type: 'address'
          }, {
            title: 'Sales Contract Price',
            returnLink: '/mortgage-intent/buying/cost/edit',
            selector: getMortgageCostState,
            type: 'currency'
          }, {
            title: 'Down Payment',
            returnLink: '/mortgage-intent/buying/down-payment/edit',
            selector: getMortgageDownPaymentState,
            type: 'currency'
          }, {
            title: 'Requested Loan Amount',
            selector: getMortgageLoanAmountState,
            type: 'currency'
          }, {
            title: 'Intended Use',
            returnLink: '/mortgage-intent/buying/primary-residence/edit',
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
