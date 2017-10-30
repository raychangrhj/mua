import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { LenderComponent } from './lender/lender.component';

export const includeLazyLoadOfLender = {
  path: '',
  loadChildren: 'app/loan-officer-manager/loan-officer-manager.module#LoanOfficerManagerModule'
};

export const routes: Routes = [{
  path: '',
  outlet: 'aside',
  component: LenderComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoanOfficerManagerRoutingModule {
}
