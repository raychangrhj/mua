import { NgModule } from '@angular/core';

import { AccountService } from './account.service';
import { GiftService } from './gift.service';

@NgModule({
  providers: [
    AccountService,
    GiftService
  ]
})
export class QuestionsAssetsCoreModule { }
