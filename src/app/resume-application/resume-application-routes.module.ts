import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ResumeComponent } from './resume/resume.component';
import { ResendPinComponent } from './resend-pin/resend-pin.component';
import { ReturnToApplicationComponent } from './retun-to-application/return-to-application.component';
import { TwoColumnComponent } from '../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../loan-officer-manager/loan-officer-manager-routes.module';

export const routes: Routes = [
  {
    path: '',
    component: TwoColumnComponent,
    data: {
      saveAction: ['/resume-application/success'],
      actionBtnGroupLinkOptions: {
        next: 'Resume',
        back: {
          link: {
            routerLink: '/welcome'
          }
        }
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: ResumeComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'forgot-pin',
    component: TwoColumnComponent,
    data: {
      saveAction: ['/resume-application/success'],
      actionBtnGroupLinkOptions: {
        saveAndExit: {
          link: {
            routerLink: '/welcome'
          },
          text: 'Return to Application Start'
        }
      }
    },
    children: [{
      path: '',
      outlet: 'content',
      component: ResendPinComponent
    }, includeLazyLoadOfLender]
  },
  {
    path: 'success',
    component: TwoColumnComponent,
    children: [{
      path: '',
      outlet: 'content',
      component: ReturnToApplicationComponent
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
export class ResumeApplicationRoutingModule {
}
