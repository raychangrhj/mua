import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomFormsModule } from 'ng2-validation';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { QuestionsProgressPillsComponent } from './progress-pills/progress-pills.component';
import { QuestionsConfirmAnswerComponent } from './confirm-answer/confirm-answer.component';
import { QuestionsConfirmComponent } from './confirm/confirm.component';
import { SharedModule } from '../../shared/shared.module';
import { reducer } from './ngrx/reducers/navigation.reducer';
import { QuestionsBaseComponent } from './questions-base/questions-base.component';
import { QuestionsCoreModule } from '../core/core.module';
import { ApplicationSubmitEffect } from './ngrx/effects/application-submit.effect';
import { SectionCompleteComponent } from './section-complete/section-complete.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    StoreModule.forFeature('navigation', reducer),
    EffectsModule.forFeature([ApplicationSubmitEffect]),
    // our npm
    // our local
    SharedModule,
    QuestionsCoreModule
  ],
  declarations: [
    QuestionsProgressPillsComponent,
    QuestionsConfirmAnswerComponent,
    QuestionsConfirmComponent,
    QuestionsBaseComponent,
    SectionCompleteComponent,
  ],
  exports: [
    QuestionsProgressPillsComponent,
    QuestionsConfirmAnswerComponent,
    QuestionsConfirmComponent,
    QuestionsBaseComponent,
    SectionCompleteComponent,
  ]
})
export class QuestionsSharedModule { }
