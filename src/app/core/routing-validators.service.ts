import { Injectable } from '@angular/core';
import {
  MemoizedSelector,
  Store
} from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoutingValidatorsService {

  static promiseAll (array: boolean[]): boolean {
    return array.find((bool: boolean) => !bool) === undefined
  }

  public validate<T> (selector: MemoizedSelector<object, T>, keys?: string[]): Promise<boolean> {
    return this.store
      .select(selector)
      .take(1)
      .toPromise()
      .then((obj: T) => {
        let bool: boolean;
        if (keys) {
          bool = !!obj;
          keys.forEach((key: string) => {
            if (bool) {
              bool = !!(obj[key])
            }
          });
        }
        return bool !== undefined ? bool : !!(obj);
      });
  }

  constructor (
    protected store: Store<any>
  ) { }

}
