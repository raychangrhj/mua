import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ActionBtnGroupComponent } from './action-btn-group/action-btn-group.component';
import { TwoColumnComponent } from './two-column/two-column.component';
import { BaseComponent } from './base/base.component';
import { InputGroupDirective } from './inputs/input-group.directive';
import { AccessibleAttributesDirective } from './inputs/accessible-attributes.directive';
import { KeysToArrayPipe } from './keys-to-array.pipe';

@NgModule({
  imports: [
    // angular
    CommonModule,
    RouterModule
    // third party
    // our npm
    // our local
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ActionBtnGroupComponent,
    TwoColumnComponent,
    BaseComponent,
    InputGroupDirective,
    AccessibleAttributesDirective,
    KeysToArrayPipe
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ActionBtnGroupComponent,
    TwoColumnComponent,
    BaseComponent,
    InputGroupDirective,
    AccessibleAttributesDirective,
    KeysToArrayPipe
  ]
})
export class SharedModule { }
