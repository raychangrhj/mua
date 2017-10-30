import { Routes } from '@angular/router';

import { routes } from './resume-application-routes.module';
import { ResumeComponent } from './resume/resume.component';
import { includeLazyLoadOfLender } from '../loan-officer-manager/loan-officer-manager-routes.module';
import { ResendPinComponent } from './resend-pin/resend-pin.component';
import { ReturnToApplicationComponent } from './retun-to-application/return-to-application.component';
import { TwoColumnComponent } from '../shared/two-column/two-column.component';

describe('ResumeApplicationRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([
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
    ]);
  });
});
