import {
  Route,
  Routes
} from '@angular/router';

import {
  includeLazyLoadOfLender,
  routes
} from './loan-officer-manager-routes.module';
import { LenderComponent } from './lender/lender.component';

describe('LoanOfficerManagerRoutingModule', () => {
  let _routes: Routes;
  let _includeLazyLoadOfLender: Route;
  beforeEach(() => {
    _routes = routes;
    _includeLazyLoadOfLender = includeLazyLoadOfLender;
  });

  it('should have an export for including the lazy load of the lender', () => {
    expect(_includeLazyLoadOfLender).toEqual({
      path: '',
      loadChildren: 'app/loan-officer-manager/loan-officer-manager.module#LoanOfficerManagerModule'
    });
  });

  it('should have the routes for section', () => {
    expect(_routes).toEqual([{
      path: '',
      outlet: 'aside',
      component: LenderComponent,
    }]);
  });
});
