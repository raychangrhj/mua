import { NgModule } from '@angular/core';

import { ProgressUpdateService } from './progress-update.service';
import { ApplicationSubmitService } from './application-submit.service';

@NgModule({
  providers: [
    ProgressUpdateService,
    ApplicationSubmitService
  ]
})
export class QuestionsCoreModule { }
