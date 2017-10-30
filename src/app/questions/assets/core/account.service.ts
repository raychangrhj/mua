import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AccountStateObject } from '../ngrx/reducers/accounts/accounts.reducer';
import {
  AssetsState,
  getAccountsState
} from '../ngrx/reducers/index.reducer';

@Injectable()
export class AccountService implements Resolve<AccountStateObject> {

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<AccountStateObject> {
    return this.store.select(getAccountsState)
      .map((data: AccountStateObject[]) => data[route.params.index])
      .take(1);
  }

  constructor(protected store: Store<AssetsState>) { }

}
