import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from '../shared/shared.module';
import { GeneralWelcomeComponent } from './welcome/welcome.component';
import { GeneralOnBoardComponent } from './on-board/on-board.component';
import { GeneralConfirmSubmissionComponent } from './confirm-submission/confirm-submission.component';
import { GeneralPatriotActComponent } from './patriot-act/patriot-act.component';
import { GeneralThankYouComponent } from './thank-you/thank-you.component';
import { GeneralOutOfNetworkComponent } from './out-of-network/out-of-network.component';
import { GeneralCoBorrowerInquiryComponent } from './co-borrower-inquiry/co-borrower-inquiry.component';
import { QuestionsSharedModule } from '../questions/shared/shared.module';
import { GeneralCoBorrowerHandOffComponent } from './co-borrower-hand-off/co-borrower-hand-off.component';
import { GeneralCoreModule } from './core/core.module';
import { QuestionsCoreModule } from '../questions/core/core.module';

@NgModule({
  imports: [
    // angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule,
    GeneralCoreModule,
    QuestionsCoreModule
  ],
  declarations: [
    GeneralWelcomeComponent,
    GeneralOnBoardComponent,
    GeneralConfirmSubmissionComponent,
    GeneralPatriotActComponent,
    GeneralThankYouComponent,
    GeneralOutOfNetworkComponent,
    GeneralCoBorrowerInquiryComponent,
    GeneralCoBorrowerHandOffComponent
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule
  ]
})
export class CleanGeneralModule { }
