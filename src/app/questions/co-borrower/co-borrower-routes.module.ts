import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { GeneralWelcomeComponent } from '../../general/welcome/welcome.component';
import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { GeneralPatriotActComponent } from '../../general/patriot-act/patriot-act.component';

export const routes: Routes = [{
  path: '',
  redirectTo: '/co-borrower/welcome',
  pathMatch: 'full'
}, {
  path: 'welcome',
  component: TwoColumnComponent,
  children: [{
    path: '',
    outlet: 'content',
    component: GeneralWelcomeComponent,
    data: {
      isCoBorrowerPage: true,
      description: 'You have been selected as a co-borrower for a Regions mortgage application.',
      gettingStartedLink: '/co-borrower/patriot-act',
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
}, {
  path: 'patriot-act',
  component: TwoColumnComponent,
  data: {
    isCoBorrowerPage: true,
    continueLink: '/co-borrower/personal-information'
  },
  children: [{
    path: '',
    outlet: 'content',
    component: GeneralPatriotActComponent,
  }, includeLazyLoadOfLender]
}, {
  path: 'personal-information',
  loadChildren: 'app/questions/co-borrower/personal-information/personal-information.module#QuestionsCoBorrowerPersonalInformationModule'
}, {
  path: 'income',
  loadChildren: 'app/questions/co-borrower/income/income.module#QuestionsCoBorrowerIncomeModule'
}, {
  path: 'assets',
  loadChildren: 'app/questions/co-borrower/assets/assets.module#QuestionsCoBorrowerAssetsModule'
}, {
  path: 'required-questions',
  loadChildren: 'app/questions/co-borrower/required-questions/required-questions.module#QuestionsCoBorrowerRequiredQuestionsModule'
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsCoBorrowerRoutingModule {
}
