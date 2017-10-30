import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {
  getOtherIncomesState,
  IncomeState
} from '../ngrx/reducers/index.reducer';
import { OtherIncomeStateObject } from '../ngrx/reducers/other/other.reducer';

@Injectable()
export class CurrentOtherIncomeService implements Resolve<OtherIncomeStateObject> {

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<OtherIncomeStateObject> {
    return this.store.select(getOtherIncomesState)
      .map((data: OtherIncomeStateObject[]) => data[route.params.index])
      .take(1);
  }

  constructor(protected store: Store<IncomeState>) { }

}
