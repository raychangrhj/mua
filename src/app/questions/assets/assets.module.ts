import { NgModule } from '@angular/core';

import { QuestionsAssetsRoutingModule } from './assets-routes.module';
import { CleanQuestionsAssetsModule } from './clean-assets.module';

@NgModule({
  imports: [
    CleanQuestionsAssetsModule,
    QuestionsAssetsRoutingModule
  ]
})
export class QuestionsAssetsModule { }
