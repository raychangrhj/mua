import { TestBed, inject } from '@angular/core/testing';
import {
  Store,
  StoreModule
} from '@ngrx/store';

import { ProgressUpdateService } from './progress-update.service';
import { reducer } from '../shared/ngrx/reducers/navigation.reducer';
import { NavigationActivateSectionAction } from '../shared/ngrx/actions/navigation.action';
import { ApplicationSectionIdUpdateAction } from '../../ngrx/actions/application.action';

describe('ProgressUpdateService', () => {
  let service;
  let store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          navigation: reducer,
        })
      ],
      providers: [
        ProgressUpdateService
      ]
    });
  });

  beforeEach(inject([ProgressUpdateService, Store], (_service_, _store_) => {
    service = _service_;
    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch a NavigationActivateSectionAction with the sectionId from the route', () => {
    service.resolve({
      data: {
        sectionId: 10
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith(new NavigationActivateSectionAction(
      10
    ));
  });

  it('should dispatch a ApplicationSectionIdUpdateAction with the sectionId from the route', () => {
    service.resolve({
      data: {
        sectionId: 10
      }
    });
    expect(store.dispatch).toHaveBeenCalledWith(new ApplicationSectionIdUpdateAction(
      10
    ));
  });

  it('should not dispatch actions if the route does not have a sectionId', () => {
    service.resolve({
      foo: 'bar'
    });
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
