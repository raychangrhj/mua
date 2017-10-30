import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { EmploymentStateObject } from '../ngrx/reducers/employment/employement.reducer';
import {
  getPrevEmploymentState,
  IncomeState
} from '../ngrx/reducers/index.reducer';

@Injectable()
export class PreviousEmploymentService implements Resolve<EmploymentStateObject> {

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<EmploymentStateObject> {
    return this.store.select(getPrevEmploymentState)
      .map((data: EmploymentStateObject[]) => data[route.params.index])
      .take(1);
  }

  constructor(protected store: Store<IncomeState>) { }

}
