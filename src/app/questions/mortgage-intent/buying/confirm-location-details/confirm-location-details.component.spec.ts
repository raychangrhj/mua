import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { QuestionsMortgageIntentConfirmLocationDetailsComponent } from './confirm-location-details.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { PropertyLocationUpdateAction } from '../../shared/ngrx/actions/property-location/property-location.action';
import { By } from '@angular/platform-browser';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsMortgageIntentConfirmLocationDetailsComponent', () => {
  let component: QuestionsMortgageIntentConfirmLocationDetailsComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentConfirmLocationDetailsComponent>;
  let activatedRoute;
  let router;
  let store;
  let propertyLocation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer,
          mortgageIntent: combineReducers(reducers)
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsMortgageIntentConfirmLocationDetailsComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute, Store], (_router_, _activatedRoute_, _store_) => {
    const section = Object.assign({}, initialNavigationState.sections[1]);
    section.active = true;
    store = _store_;
    store.dispatch(new NavigationActivateSectionAction(
      section.id
    ));

    router = _router_;
    spyOn(router, 'navigate');

    propertyLocation = {
      street: '440 West Forest Ave',
      city: 'Saint Louis',
      county: 'county',
      state: 'MO',
      zip: '63144'
    };

    store.dispatch(new PropertyLocationUpdateAction(propertyLocation));

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/mortgage-intent/buying/down-payment'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentConfirmLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should extend the QuestionsBaseComponent calling super(...)', () => {
    expect(component.pillsTitle$).toBeDefined();
    expect(component.pills$).toBeDefined();
    expect(component.actionBtnLinkOptions$).toBeDefined();
    expect(component.ngOnInit).toBeDefined();
    expect(component.onSubmit).toBeDefined();
  });

  it('should expose the property location from the store', () => {
    expect(component.propertyLocation).toEqual(propertyLocation);
  });

  it('should not continue subscribing to the store once it has gathered the initial data', () => {
    const notAddress = {
      street: 'not_street',
      county: 'not_county',
      city: 'not_city',
      state: 'not_state',
      zip: 'not_zip'
    };
    store.dispatch(new PropertyLocationUpdateAction(notAddress));
    expect(component.propertyLocation).not.toEqual(notAddress);
  });

  describe('HTML integration test', () => {
    it('should have the address from the store displayed', () => {
      expect(fixture.debugElement.query(By.css('.address-information')).nativeElement.textContent).toContain(propertyLocation.street);
      expect(fixture.debugElement.query(By.css('.address-information')).nativeElement.textContent).toContain(propertyLocation.city);
      expect(fixture.debugElement.query(By.css('.address-information')).nativeElement.textContent).toContain(propertyLocation.state);
      expect(fixture.debugElement.query(By.css('.address-information')).nativeElement.textContent).toContain(propertyLocation.zip);
    });

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[1].title);
    });
  });
});
