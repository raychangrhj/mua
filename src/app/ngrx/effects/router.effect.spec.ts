import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { RouterEffects } from './router.effect';
import {
  Back,
  Forward,
  Go
} from '../actions/router.action';

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

describe('RouterEffects', () => {
  let effects: RouterEffects;
  let router: Router;
  let actions$: TestActions;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        RouterEffects,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        }, {
          provide: Location,
          useValue: jasmine.createSpyObj('Location', ['back', 'forward']),
        },
        {
          provide: Actions,
          useFactory: getActions
        }
      ],
    });
  });

  beforeEach(inject([RouterEffects, Router, Location, Actions], (_effects_, _router_, _location_, _actions$_) => {
    effects = _effects_;
    location = _location_;
    router = _router_;
    actions$ = _actions$_;
  }));

  describe('navigate$', () => {
    it('should execute a new router.navigate with the given path, queryParams, and Navigation Extras', () => {
      actions$.stream = Observable.of(new Go({
        path: ['/foo']
      }));
      effects.navigate$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/foo'], { queryParams: undefined });
      });
    });
  });

  describe('navigateBack$', () => {
    it('should execute a new location.back action', () => {
      actions$.stream = Observable.of(new Back());
      effects.navigateBack$.subscribe(() => {
        expect(location.back).toHaveBeenCalled();
        expect(location.back).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('navigateForward$', () => {
    it('should execute a new location.forward action', () => {
      actions$.stream = Observable.of(new Forward());
      effects.navigateForward$.subscribe(() => {
        expect(location.forward).toHaveBeenCalled();
        expect(location.forward).toHaveBeenCalledTimes(1);
      });
    });
  });
});
