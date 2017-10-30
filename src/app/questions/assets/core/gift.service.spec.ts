import { TestBed, inject } from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { GiftService } from './gift.service';
import { reducers } from '../ngrx/reducers/index.reducer';
import { GiftAddAction } from '../ngrx/actions/gifts/gifts.action';

describe('GiftService', () => {
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
        GiftService
      ]
    });
  });

  beforeEach(inject([GiftService, Store], (_service_, _store_) => {
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
    let gift0;
    let gift1;
    let gift2;
    let gift3;
    beforeEach(() => {
      gift0 = {
        who: '0',
        relationship: 'relationship-0',
        amount: 0
      };
      gift1 = {
        who: '1',
        relationship: 'relationship-1',
        amount: 1
      };
      gift2 = {
        who: '2',
        relationship: 'relationship-2',
        amount: 2
      };
      gift3 = {
        who: '3',
        relationship: 'relationship-3',
        amount: 3
      };

      store.dispatch(new GiftAddAction(gift3));
      store.dispatch(new GiftAddAction(gift2));
      store.dispatch(new GiftAddAction(gift1));
      store.dispatch(new GiftAddAction(gift0));
    });

    it('should return an observable', () => {
      const result = service.resolve({
        params: {
          index: 2
        }
      });

      expect(result.subscribe).toEqual(jasmine.any(Function));
    });

    it('should resolve gift data based on the index in the route params', () => {
      service.resolve({
        params: {
          index: '2'
        }
      }).subscribe(data => {
        expect(data).toEqual(gift2);
      });

      service.resolve({
        params: {
          index: '0'
        }
      }).subscribe(data => {
        expect(data).toEqual(gift0);
      });

      service.resolve({
        params: {
          index: '1'
        }
      }).subscribe(data => {
        expect(data).toEqual(gift1);
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
