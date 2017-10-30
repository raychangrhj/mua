import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../customer/shared/ngrx/reducers/index.reducer';
import {
  NavigationActivateSectionAction,
  NavigationSectionsUpdateAction
} from '../shared/ngrx/actions/navigation.action';
import { ApplicationSectionIdUpdateAction } from '../../ngrx/actions/application.action';

@Injectable()
export class ProgressUpdateService implements Resolve<void> {

  public resolve(
    route: ActivatedRouteSnapshot
  ): void {
    if (route.data && route.data.sectionId) {
      if (route.data.sectionId === 60 || route.data.sectionId === 80 || route.data.sectionId === 90 || route.data.sectionId === 100) {
        this.store.dispatch(new NavigationSectionsUpdateAction('coBorrower'));
      } else {
        this.store.dispatch(new NavigationSectionsUpdateAction('borrower'));
      }

      this.store.dispatch(new ApplicationSectionIdUpdateAction(
        route.data.sectionId
      ));
      this.store.dispatch(new NavigationActivateSectionAction(
        route.data.sectionId
      ));
    }
  }

  constructor(
    protected store: Store<State>
  ) { }

}
