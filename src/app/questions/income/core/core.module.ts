import { NgModule } from '@angular/core';

import { CurrentEmploymentService } from './current-employment.service';
import { PreviousEmploymentService } from './previous-employment.service';
import { CurrentOtherIncomeService } from './current-other-income.service';

@NgModule({
  providers: [
    CurrentEmploymentService,
    PreviousEmploymentService,
    CurrentOtherIncomeService
  ]
})
export class QuestionsIncomeCoreModule { }
