import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';

import { GeneralCoBorrowerHandOffComponent } from './co-borrower-hand-off.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Store,
  StoreModule
} from '@ngrx/store';
import { reducer } from '../../questions/shared/ngrx/reducers/navigation.reducer';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../questions/shared/progress-pills/progress-pills.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BorrowerCacheService } from '../../core/borrower-cache.service';
import { AccessibleAttributesDirective } from '../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../shared/inputs/input-group.directive';

describe('GeneralCoBorrowerHandOffComponent', () => {
  let component: GeneralCoBorrowerHandOffComponent;
  let fixture: ComponentFixture<GeneralCoBorrowerHandOffComponent>;
  let router;
  let store;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer
        })
      ],
      providers: [
        {
          provide: BorrowerCacheService,
          useValue: jasmine.createSpyObj('BorrowerCacheService', ['switchCustomerType'])
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        GeneralCoBorrowerHandOffComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute, Store], (_router_, _activatedRoute_, _store_) => {
    router = _router_;
    spyOn(router, 'navigate');

    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/on-boarding'
            }
          },
          next: true,
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCoBorrowerHandOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
