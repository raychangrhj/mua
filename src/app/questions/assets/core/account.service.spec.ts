import { TestBed, inject } from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { AccountService } from './account.service';
import { reducers } from '../ngrx/reducers/index.reducer';
import { AccountAddAction } from '../ngrx/actions/acounts/acounts.action';

describe('AccountService', () => {
  let service;
  let store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          assets: combineReducers(reducers),
        })
      ],
      providers: [
        AccountService
      ]
    });
  });

  beforeEach(inject([AccountService, Store], (_service_, _store_) => {
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
    let account0;
    let account1;
    let account2;
    let account3;
    beforeEach(() => {
      account0 = {
        bankName: '0',
        type: 'checking',
        balance: 0
      };
      account1 = {
        bankName: '1',
        type: 'checking',
        balance: 1
      };
      account2 = {
        bankName: '2',
        type: 'checking',
        balance: 2
      };
      account3 = {
        bankName: '3',
        type: 'checking',
        balance: 3
      };

      store.dispatch(new AccountAddAction(account3));
      store.dispatch(new AccountAddAction(account2));
      store.dispatch(new AccountAddAction(account1));
      store.dispatch(new AccountAddAction(account0));
    });

    it('should return an observable', () => {
      const result = service.resolve({
        params: {
          index: 2
        }
      });

      expect(result.subscribe).toEqual(jasmine.any(Function));
    });

    it('should resolve account data based on the index in the route params', () => {
      service.resolve({
        params: {
          index: '2'
        }
      }).subscribe(data => {
        expect(data).toEqual(account2);
      });

      service.resolve({
        params: {
          index: '0'
        }
      }).subscribe(data => {
        expect(data).toEqual(account0);
      });

      service.resolve({
        params: {
          index: '1'
        }
      }).subscribe(data => {
        expect(data).toEqual(account1);
      });
    });

    it('should resolve falsy when the index does not match an employment income', () => {
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
