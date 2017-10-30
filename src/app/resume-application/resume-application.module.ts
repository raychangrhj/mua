import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { ResumeComponent } from './resume/resume.component';
import { ResendPinComponent } from './resend-pin/resend-pin.component';
import { ReturnToApplicationComponent } from './retun-to-application/return-to-application.component';
import { ResumeApplicationRoutingModule } from './resume-application-routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    // our npm
    // our local
    ResumeApplicationRoutingModule,
    SharedModule
  ],
  declarations: [
    ResumeComponent,
    ResendPinComponent,
    ReturnToApplicationComponent
  ]
})
export class ResumeApplicationModule { }
