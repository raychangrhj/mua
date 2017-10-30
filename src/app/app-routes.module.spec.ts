import { Routes } from '@angular/router';

import { routes } from './app-routes.module';
import { TestingComponent } from './testing/testing.component';

describe('AppRoutingModule', () => {
  let _routes: Routes;
  beforeEach(() => {
    _routes = routes;
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([{
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
    }, {
      path: 'testing',
      component: TestingComponent
    }]);
  });
});
