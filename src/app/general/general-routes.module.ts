import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { GeneralWelcomeComponent } from './welcome/welcome.component';
import { GeneralOnBoardComponent } from './on-board/on-board.component';
import { includeLazyLoadOfLender } from '../loan-officer-manager/loan-officer-manager-routes.module';
import { TwoColumnComponent } from '../shared/two-column/two-column.component';
import { GeneralOutOfNetworkComponent } from './out-of-network/out-of-network.component';
import { GeneralPatriotActComponent } from './patriot-act/patriot-act.component';
import { GeneralThankYouComponent } from './thank-you/thank-you.component';
import { GeneralConfirmSubmissionComponent } from './confirm-submission/confirm-submission.component';
import { GeneralCoBorrowerInquiryComponent } from './co-borrower-inquiry/co-borrower-inquiry.component';
import { GeneralCoBorrowerHandOffComponent } from './co-borrower-hand-off/co-borrower-hand-off.component';
import { ProgressUpdateService } from '../questions/core/progress-update.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralWelcomeComponent,
      data: {
        description: 'Your Regions mortgage application should not take long to complete.',
        gettingStartedLink: '/patriot-act',
        continueLink: '/resume-application',
        requirements: [{
          imgSrc: 'assets/images/icn-money.svg',
          title: 'Income',
          altText: ''
        }, {
          imgSrc: 'assets/images/icn-document.svg',
          title: 'Banking',
          altText: ''
        }, {
          imgSrc: 'assets/images/icn-id.svg',
          title: 'Personal',
          altText: ''
        }]
      }
    }, includeLazyLoadOfLender]
  },
  {
    path: 'on-boarding',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralOnBoardComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'sorry',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralOutOfNetworkComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'patriot-act',
    component: TwoColumnComponent,
    data: {
      continueLink: '/on-boarding',
    },
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralPatriotActComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'thanks',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralThankYouComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'confirm-submission',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: GeneralConfirmSubmissionComponent,
    }, includeLazyLoadOfLender]
  },
  {
    path: 'co-borrower-inquiry',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 200,
    },
    children: [
      {
        path: '',
        component: TwoColumnComponent,
        children: [{
          path: '',
          outlet: 'content',
          component: GeneralCoBorrowerInquiryComponent,
          data: {
            actionBtnGroupLinkOptions: {
              back: {
                link: {
                  returnLink: ['/required-questions/confirm']
                }
              },
              next: true,
              saveAndExit: true
            }
          }
        }, includeLazyLoadOfLender]
      },
      {
        path: 'hand-off',
        component: TwoColumnComponent,
        children: [{
          path: '',
          outlet: 'content',
          component: GeneralCoBorrowerHandOffComponent,
          data: {
            actionBtnGroupLinkOptions: {
              back: false,
              next: false,
              saveAndExit: true
            }
          }
        }, includeLazyLoadOfLender]
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
export class GeneralRoutingModule {
}
