import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsRequiredQuestionsIntroComponent } from './intro/intro.component';
import { QuestionsRequiredQuestionsOutstandingJudgementsComponent } from './outstanding-judgements/outstanding-judgements.component';
import { QuestionsRequiredQuestionsBankruptciesComponent } from './bankruptcies/bankruptcies.component';
import { QuestionsRequiredQuestionsForeclosuresComponent } from './foreclosures/foreclosures.component';
import { QuestionsRequiredQuestionsLawsuitsComponent } from './lawsuits/lawsuits.component';
import { QuestionsRequiredQuestionsForeclosureJudgementsComponent } from './foreclosure-judgements/foreclosure-judgements.component';
import {
  QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent
} from './federal-debt-delinquencies/federal-debt-delinquencies.component';
import { QuestionsRequiredQuestionsAlimonyComponent } from './alimony/alimony.component';
import { QuestionsRequiredQuestionsBorrowedDownPaymentComponent } from './borrowed-down-payment/borrowed-down-payment.component';
import { QuestionsRequiredQuestionsCoMakerOnNoteComponent } from './co-maker-on-note/co-maker-on-note.component';
import { QuestionsRequiredQuestionsUsCitizenComponent } from './us-citizen/us-citizen.component';
import { QuestionsRequiredQuestionsPermanentResidentAlienComponent } from './permanent-resident-alien/permanent-resident-alien.component';
import { QuestionsRequiredQuestionsOwnershipInterestComponent } from './ownership-interest/ownership-interest.component';
import { QuestionsRequiredQuestionsEthnicityComponent } from './ethnicity/ethnicity.component';
import { QuestionsRequiredQuestionsRaceComponent } from './race/race.component';
import { QuestionsRequiredQuestionsMonitoringComponent } from './monitoring/monitoring.component';
import { QuestionsRequiredQuestionsSexComponent } from './sex/sex.component';
import { QuestionsSharedModule } from '../shared/shared.module';
import { SharedModule } from '../../shared/shared.module';
import { reducer } from './ngrx/reducers/government-questions.reducer';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    // third party
    StoreModule.forFeature('governmentQuestions', reducer),
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule,
  ],
  declarations: [
    QuestionsRequiredQuestionsIntroComponent,
    QuestionsRequiredQuestionsOutstandingJudgementsComponent,
    QuestionsRequiredQuestionsBankruptciesComponent,
    QuestionsRequiredQuestionsForeclosuresComponent,
    QuestionsRequiredQuestionsLawsuitsComponent,
    QuestionsRequiredQuestionsForeclosureJudgementsComponent,
    QuestionsRequiredQuestionsFederalDebtDelinquenciesComponent,
    QuestionsRequiredQuestionsAlimonyComponent,
    QuestionsRequiredQuestionsBorrowedDownPaymentComponent,
    QuestionsRequiredQuestionsCoMakerOnNoteComponent,
    QuestionsRequiredQuestionsUsCitizenComponent,
    QuestionsRequiredQuestionsPermanentResidentAlienComponent,
    QuestionsRequiredQuestionsOwnershipInterestComponent,
    QuestionsRequiredQuestionsEthnicityComponent,
    QuestionsRequiredQuestionsRaceComponent,
    QuestionsRequiredQuestionsMonitoringComponent,
    QuestionsRequiredQuestionsSexComponent
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule,
  ]
})
export class CleanQuestionsRequiredQuestionsModule { }
