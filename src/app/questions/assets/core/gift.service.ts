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
  AssetsState,
  getGiftsState
} from '../ngrx/reducers/index.reducer';
import { GiftStateObject } from '../ngrx/reducers/gifts/gifts.reducer';

@Injectable()
export class GiftService implements Resolve<GiftStateObject> {

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GiftStateObject> {
    return this.store.select(getGiftsState)
      .map((data: GiftStateObject[]) => data[route.params.index])
      .take(1);
  }

  constructor(protected store: Store<AssetsState>) { }

}
