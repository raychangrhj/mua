import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { environment } from '../environments/environment';
import { TestingComponent } from './testing/testing.component';

export const routes: Routes = [{
  path: '',
  loadChildren: 'app/general/general.module#GeneralModule'
}, {
  path: 'resume-application',
  loadChildren: 'app/resume-application/resume-application.module#ResumeApplicationModule'
}, {
  path: 'new-customer',
  loadChildren: 'app/questions/customer/new/new-customer.module#QuestionsNewCustomerModule'
}, {
  path: 'existing-customer',
  loadChildren: 'app/questions/customer/existing/existing-customer.module#QuestionsExistingCustomerModule'
}, {
  path: 'mortgage-intent',
  loadChildren: 'app/questions/mortgage-intent/mortgage-intent.module#QuestionsMortgageIntentModule'
}, {
  path: 'income',
  loadChildren: 'app/questions/income/income.module#QuestionsIncomeModule'
}, {
  path: 'assets',
  loadChildren: 'app/questions/assets/assets.module#QuestionsAssetsModule'
}, {
  path: 'required-questions',
  loadChildren: 'app/questions/required-questions/required-questions.module#QuestionsRequiredQuestionsModule'
}, {
  path: 'co-borrower',
  loadChildren: 'app/questions/co-borrower/co-borrower.module#QuestionsCoBorrowerModule'
}];

if (!environment.production) {
  routes.push({
    path: 'testing',
    component: TestingComponent
  });
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
