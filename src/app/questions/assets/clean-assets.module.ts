import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CustomFormsModule } from 'ng2-validation';

import { QuestionsAssetsAccountsComponent } from './acounts/accounts.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionsSharedModule } from '../shared/shared.module';
import { QuestionsAssetsAccountsBankNameComponent } from './acounts/bank-name/bank-name.component';
import { QuestionsAssetsAccountsTypeComponent } from './acounts/type/type.component';
import { QuestionsAssetsAccountsBalanceComponent } from './acounts/balance/balance.component';
import { QuestionsAssetsGiftsComponent } from './gifts/gifts.component';
import { QuestionsAssetsGiftsWhoComponent } from './gifts/who/who.component';
import { QuestionsAssetsGiftsRelationshipComponent } from './gifts/relationship/relationship.component';
import { QuestionsAssetsGiftsAmountComponent } from './gifts/amount/amount.component';
import { QuestionsAssetsCoreModule } from './core/core.module';
import { assetsReducer } from './ngrx/reducers/index.reducer';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    // third party
    StoreModule.forFeature('assets', assetsReducer),
    // our npm
    // our local
    SharedModule,
    QuestionsSharedModule,
    QuestionsAssetsCoreModule
  ],
  declarations: [
    QuestionsAssetsAccountsComponent,
    QuestionsAssetsAccountsBankNameComponent,
    QuestionsAssetsAccountsTypeComponent,
    QuestionsAssetsAccountsBalanceComponent,
    QuestionsAssetsGiftsComponent,
    QuestionsAssetsGiftsWhoComponent,
    QuestionsAssetsGiftsRelationshipComponent,
    QuestionsAssetsGiftsAmountComponent
  ],
  exports: [
    SharedModule,
    QuestionsSharedModule,
    QuestionsAssetsCoreModule
  ]
})
export class CleanQuestionsAssetsModule { }
