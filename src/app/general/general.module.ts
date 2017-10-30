import { NgModule } from '@angular/core';

import { GeneralRoutingModule } from './general-routes.module';
import { CleanGeneralModule } from './clean-general.module';

@NgModule({
  imports: [
    CleanGeneralModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
