import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { QuestionsMortgageIntentComponent } from './mortgage-intent.component';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { ProgressUpdateService } from '../core/progress-update.service';
import { CanActivateQuestionsMortgageIntent } from './core/mortgage-intent/mortgage-intent.guard';

export const routes: Routes = [
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
    loadChildren: 'app/questions/mortgage-intent/pre-qualification/pre-qualification.module#QuestionsMortgageIntentPreQualificationModule'
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
export class QuestionsMortgageIntentRoutingModule {
}
