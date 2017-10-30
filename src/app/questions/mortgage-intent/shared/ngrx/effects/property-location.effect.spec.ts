import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  Response,
  ResponseOptions
} from '@angular/http';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { PropertyLocationEffect } from './property-location.effect';
import { Go } from '../../../../../ngrx/actions/router.action';
import { PropertyLocationService } from '../../../core/property-location.service';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import {
  MortgageIntentState,
  reducers
} from '../reducers/index.reducer';
import { MortgageTypeUpdateAction } from '../actions/mortgage-type/mortgage-type.action';
import { GetFootPrintByStateCodeResponse } from '../../../../../../models/service-responses';
import { PropertyLocationValidateAction } from '../actions/property-location/property-location.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('PropertyLocationEffect', () => {
  let effects: PropertyLocationEffect;
  let service: any;
  let actions$: TestActions;
  let store: Store<MortgageIntentState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          mortgageIntent: combineReducers(reducers)
        })
      ],
      providers: [
        PropertyLocationEffect,
        {
          provide: PropertyLocationService,
          useValue: jasmine.createSpyObj('PropertyLocationService', [
            'getFootprintByStateCode',
            'getFootprintByStateName'
          ]),
        },
        { provide: Actions, useFactory: getActions }
      ],
    });
  });

  beforeEach(inject([PropertyLocationService, Actions, Store], (_service_, _actions$_, _store_) => {
    service = _service_;
    actions$ = _actions$_;
    store = _store_;
  }));

  describe('validatePropertyLocation$', () => {
    describe('coming from the buying workflow', () => {
      beforeEach(() => {
        store.dispatch(new MortgageTypeUpdateAction('buy'));
      });

      beforeEach(inject([PropertyLocationEffect], (_effects_) => {
        effects = _effects_;
      }));

      it('should return a new Go Action, with the buying confirm location link, on success (with inMarket set to true)', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: true,
            preApproved: false,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/mortgage-intent/buying/confirm-location']
          }));
        });
      });

      it('should return a new Go Action, with the buying confirm location link, on success (with preApproved set to true)', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: false,
            preApproved: true,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/mortgage-intent/buying/confirm-location']
          }));
        });
      });
    });

    describe('coming from the refinance workflow', () => {
      beforeEach(() => {
        store.dispatch(new MortgageTypeUpdateAction('refinance'));
      });

      beforeEach(inject([PropertyLocationEffect], (_effects_) => {
        effects = _effects_;
      }));

      it('should return a new Go Action, with the buying confirm location link, on success', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: true,
            preApproved: false,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/mortgage-intent/refinance/owe']
          }));
        });
      });
    });

    describe('when mortgage intent changes after creation', () => {
      beforeEach(() => {
        store.dispatch(new MortgageTypeUpdateAction('refinance'));
      });

      beforeEach(inject([PropertyLocationEffect], (_effects_) => {
        effects = _effects_;
      }));

      it('should return a new Go Action, with the buying confirm location link, on success (with inMarket set to true)', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: true,
            preApproved: false,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };
        store.dispatch(new MortgageTypeUpdateAction('buy'));

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/mortgage-intent/buying/confirm-location']
          }));
        });
      });

      it('should return a new Go Action, with the buying confirm location link, on success (with preApproved set to true)', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: false,
            preApproved: true,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };
        store.dispatch(new MortgageTypeUpdateAction('buy'));

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/mortgage-intent/buying/confirm-location']
          }));
        });
      });
    });

    describe('when the in market status and preApproved is false', () => {
      beforeEach(() => {
        store.dispatch(new MortgageTypeUpdateAction('buy'));
      });

      beforeEach(inject([PropertyLocationEffect], (_effects_) => {
        effects = _effects_;
      }));

      it('should return a new Go Action, with the buying confirm location link, on success (during buying workflow)', () => {
        const getFootPrintByStateCodeResponse: GetFootPrintByStateCodeResponse = {
          didTransactionSucceed: true,
          data: {
            stateId: 'ID',
            stateName: 'Name',
            inMarket: false,
            preApproved: false,
            thirtyYearOnly: false,
            createDate: 'date',
            exceptionInfo: null
          }
        };

        actions$.stream = Observable.of(new PropertyLocationValidateAction({
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip',
          county: 'county'
        }));
        service.getFootprintByStateCode.and.returnValue(Observable.of(getFootPrintByStateCodeResponse));

        effects.validatePropertyLocation$.subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/sorry']
          }));
        });
      });
    });
  });
});
