import { TestBed, inject } from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { CurrentOtherIncomeService } from './current-other-income.service';
import { reducers } from '../ngrx/reducers/index.reducer';
import { OtherIncomeAddAction } from '../ngrx/actions/other/other.action';

describe('CurrentOtherIncome', () => {
  let service;
  let store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          income: combineReducers(reducers),
        })
      ],
      providers: [
        CurrentOtherIncomeService
      ]
    });
  });

  beforeEach(inject([CurrentOtherIncomeService, Store], (_service_, _store_) => {
    service = _service_;
    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the public resolve method', () => {
    expect(service.resolve).toEqual(jasmine.any(Function));
  });

  describe('resolve', () => {
    let income0;
    let income1;
    let income2;
    beforeEach(() => {
      income0 = {
        monthly: 0,
        type: {
          option: 'something0'
        }
      };
      income1 = {
        monthly: 1,
        type: {
          option: 'something1'
        }
      };
      income2 = {
        monthly: 2,
        type: {
          option: 'something2'
        }
      };

      store.dispatch(new OtherIncomeAddAction(income2));
      store.dispatch(new OtherIncomeAddAction(income1));
      store.dispatch(new OtherIncomeAddAction(income0));
    });

    it('should return an observable', () => {
      const result = service.resolve({
        params: {
          index: 2
        }
      });

      expect(result.subscribe).toEqual(jasmine.any(Function));
    });

    it('should resolve other income data based on the index in the route params', () => {
      service.resolve({
        params: {
          index: '2'
        }
      }).subscribe(data => {
        expect(data).toEqual(income2);
      });

      service.resolve({
        params: {
          index: '0'
        }
      }).subscribe(data => {
        expect(data).toEqual(income0);
      });

      service.resolve({
        params: {
          index: '1'
        }
      }).subscribe(data => {
        expect(data).toEqual(income1);
      });
    });

    it('should resolve falsy when the index does not match an other income', () => {
      service.resolve({
        params: {
          index: '200'
        }
      }).subscribe(data => {
        expect(data).toBeFalsy();
      });
    });
  });
});
