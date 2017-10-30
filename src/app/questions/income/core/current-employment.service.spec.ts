import { TestBed, inject } from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { CurrentEmploymentService } from './current-employment.service';
import { EmploymentAddAction } from '../ngrx/actions/employment/employment.action';
import { reducers } from '../ngrx/reducers/index.reducer';

describe('CurrentEmploymentService', () => {
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
        CurrentEmploymentService
      ]
    });
  });

  beforeEach(inject([CurrentEmploymentService, Store], (_service_, _store_) => {
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
    let company0;
    let company1;
    let company2;
    let company3;
    beforeEach(() => {
      company0 = {
        companyName: '0',
        dates: {
          startDate: null,
          endDate: 'current'
        }
      };
      company1 = {
        companyName: '1',
        dates: {
          startDate: null,
          endDate: 'current'
        }
      };
      company2 = {
        companyName: '2',
        dates: {
          startDate: null,
          endDate: 'current'
        }
      };
      company3 = {
        companyName: '2',
        dates: {
          startDate: null,
          endDate: '2010-10'
        }
      };

      store.dispatch(new EmploymentAddAction(company3));
      store.dispatch(new EmploymentAddAction(company2));
      store.dispatch(new EmploymentAddAction(company1));
      store.dispatch(new EmploymentAddAction(company0));
    });

    it('should return an observable', () => {
      const result = service.resolve({
        params: {
          index: 2
        }
      });

      expect(result.subscribe).toEqual(jasmine.any(Function));
    });

    it('should resolve employment income data based on the index in the route params', () => {
      service.resolve({
        params: {
          index: '2'
        }
      }).subscribe(data => {
        expect(data).toEqual(company2);
      });

      service.resolve({
        params: {
          index: '0'
        }
      }).subscribe(data => {
        expect(data).toEqual(company0);
      });

      service.resolve({
        params: {
          index: '1'
        }
      }).subscribe(data => {
        expect(data).toEqual(company1);
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
