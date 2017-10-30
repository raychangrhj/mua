import { Routes } from '@angular/router';

import { routes } from './mortgage-intent-routes.module';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsMortgageIntentComponent } from './mortgage-intent.component';
import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { ProgressUpdateService } from '../core/progress-update.service';
import { CanActivateQuestionsMortgageIntent } from './core/mortgage-intent/mortgage-intent.guard';

describe('AppRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([
      {
        path: '',
        component: TwoColumnComponent,
        resolve: {
          progressUpdate: ProgressUpdateService
        },
        data: {
          sectionId: 20,
        },
        children: [{
          path: '',
          // canActivate: [CanActivateQuestionsMortgageIntent],
          outlet: 'content',
          component: QuestionsMortgageIntentComponent,
          data: {
            sectionId: 20,
          }
        }, includeLazyLoadOfLender]
      },
      {
        path: 'buying',
        loadChildren: 'app/questions/mortgage-intent/buying/buying.module#QuestionsMortgageIntentBuyingModule'
      },
      {
        path: 'refinance',
        loadChildren: 'app/questions/mortgage-intent/refinance/refinance.module#QuestionsMortgageIntentRefinanceModule'
      },
      {
        path: 'pre-qualification',
        loadChildren:
          'app/questions/mortgage-intent/pre-qualification/pre-qualification.module#QuestionsMortgageIntentPreQualificationModule'
      }
    ]);
  });
});
