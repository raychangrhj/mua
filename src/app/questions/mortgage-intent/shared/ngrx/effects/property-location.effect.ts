import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  Action,
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { PropertyLocationService } from '../../../core/property-location.service';
import * as fromPropertyLocation from '../actions/property-location/property-location.action';
import { PropertyLocationState } from '../reducers/property-location/property-location.reducer';
import { GetFootPrintByStateCodeResponse } from '../../../../../../models/service-responses';
import { Go } from '../../../../../ngrx/actions/router.action';
import { PropertyLocationValidateAction } from '../actions/property-location/property-location.action';
import { RefinanceState } from '../../../refinance/ngrx/reducers/index.reducer';
import {
  getMortgageTypeState,
  MortgageIntentState
} from '../reducers/index.reducer';

@Injectable()
export class PropertyLocationEffect {

  @Effect()
  validatePropertyLocation$: Observable<Action> = this.actions$
    .ofType<PropertyLocationValidateAction>(fromPropertyLocation.VALIDATE)
    .map(action => action.payload)
    .switchMap((propertyLocation: PropertyLocationState): Observable<Action> => {
      const getFootPrintByStateCode$ = this.propertyLocationService.getFootprintByStateCode(propertyLocation.state).take(1);
      const getMortgageType$ = this.store.select(getMortgageTypeState).take(1);

      return Observable.forkJoin(getFootPrintByStateCode$, getMortgageType$)
        .take(1)
        .map((responses: [GetFootPrintByStateCodeResponse, string]): Action => {
          if (Array.isArray(responses) && responses[0].data && (responses[0].data.inMarket || responses[0].data.preApproved)) {
            return new Go({
              path: responses[1] === 'buy'
                ? ['/mortgage-intent/buying/confirm-location']
                : ['/mortgage-intent/refinance/owe']
            });
          } else {
            return new Go({
              path: ['/sorry']
            });
          }
        });
    });

  constructor (
    private actions$: Actions,
    private propertyLocationService: PropertyLocationService,
    private store: Store<MortgageIntentState | RefinanceState>
  ) { }
}
