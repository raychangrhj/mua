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
import 'rxjs/add/operator/take';
import { By } from '@angular/platform-browser';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { MapsAPILoader } from '@agm/core';

import { QuestionsMortgageIntentPropertyLocationComponent } from './property-location.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import { PropertyLocationState } from '../ngrx/reducers/property-location/property-location.reducer';
import { PropertyLocationUpdateAction } from '../ngrx/actions/property-location/property-location.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsMortgageIntentPropertyLocationComponent', () => {
  let component: QuestionsMortgageIntentPropertyLocationComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentPropertyLocationComponent>;
  let activatedRoute;
  let router;
  let store;
  let mapsApiLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: reducer,
          mortgageIntent: combineReducers(reducers)
        })
      ],
      providers: [
        {
          provide: MapsAPILoader,
          useValue: {
            load: jasmine.createSpy('mapsLoad')
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsMortgageIntentPropertyLocationComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute, Store, MapsAPILoader], (_router_, _activatedRoute_, _store_, _mapsApiLoader_) => {
    mapsApiLoader = _mapsApiLoader_;
    mapsApiLoader.load.and.returnValue(Promise.resolve());

    router = _router_;
    spyOn(router, 'navigate');

    store = _store_;
    const section = Object.assign({}, initialNavigationState.sections[1]);
    section.active = true;
    store.dispatch(new NavigationActivateSectionAction(
      section.id
    ));
    spyOn(store, 'dispatch').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/mortgage-intent/buying'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentPropertyLocationComponent);
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

  describe('the component form', () => {
    it('should have the street control with no default value', () => {
      expect(component.form.controls['street']).toBeDefined();
      expect(component.form.controls['street'].value).toEqual(null);
    });

    it('should require the street control', () => {
      component.form.controls['street'].setValue(null);
      expect(component.form.controls['street'].valid).toBeFalsy();

      component.form.controls['street'].setValue('street');
      expect(component.form.controls['street'].valid).toBeTruthy();
    });

    it('should have the unit control with no default value', () => {
      expect(component.form.controls['unit']).toBeDefined();
      expect(component.form.controls['unit'].value).toEqual(null);
    });

    it('should not require the unit control', () => {
      component.form.controls['unit'].setValue(null);
      expect(component.form.controls['unit'].valid).toBeTruthy();
    });

    it('should have the city control with no default value', () => {
      expect(component.form.controls['city']).toBeDefined();
      expect(component.form.controls['city'].value).toEqual(null);
    });

    it('should require the city control', () => {
      component.form.controls['city'].setValue(null);
      expect(component.form.controls['city'].valid).toBeFalsy();

      component.form.controls['city'].setValue('city');
      expect(component.form.controls['city'].valid).toBeTruthy();
    });

    it('should have the state control with no default value', () => {
      expect(component.form.controls['state']).toBeDefined();
      expect(component.form.controls['state'].value).toEqual(null);
    });

    it('should require the state control', () => {
      component.form.controls['state'].setValue(null);
      expect(component.form.controls['state'].valid).toBeFalsy();

      component.form.controls['state'].setValue('MO');
      expect(component.form.controls['state'].valid).toBeTruthy();
    });

    it('should require the state control is a state code', () => {
      component.form.controls['state'].setValue(null);
      expect(component.form.controls['state'].valid).toBeFalsy();

      component.form.controls['state'].setValue('state');
      expect(component.form.controls['state'].valid).toBeFalsy();

      component.form.controls['state'].setValue('MO');
      expect(component.form.controls['state'].valid).toBeTruthy();
      component.form.controls['state'].setValue('IL');
      expect(component.form.controls['state'].valid).toBeTruthy();
    });

    it('should have the zip control with no default value', () => {
      expect(component.form.controls['zip']).toBeDefined();
      expect(component.form.controls['zip'].value).toEqual(null);
    });

    it('should require the zip control', () => {
      component.form.controls['zip'].setValue(null);
      expect(component.form.controls['zip'].valid).toBeFalsy();

      component.form.controls['zip'].setValue('62881');
      expect(component.form.controls['zip'].valid).toBeTruthy();
    });

    it('should require the zip control be a valid zip code', () => {
      component.form.controls['zip'].setValue(null);
      expect(component.form.controls['zip'].valid).toBeFalsy();

      component.form.controls['zip'].setValue('zip');
      expect(component.form.controls['zip'].valid).toBeFalsy();

      component.form.controls['zip'].setValue('90210');
      expect(component.form.controls['zip'].valid).toBeTruthy();
      component.form.controls['zip'].setValue('55555');
      expect(component.form.controls['zip'].valid).toBeTruthy();
      component.form.controls['zip'].setValue('55555-1234');
      expect(component.form.controls['zip'].valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      let storeData: PropertyLocationState;
      beforeEach(() => {
        storeData = {
          street: 'street',
          county: 'county',
          unit: 'unit',
          city: 'city',
          state: 'state',
          zip: 'zip'
        };
        store.dispatch(new PropertyLocationUpdateAction(storeData));
        component.ngOnInit();
      });

      it('should set the value of the controls to the store data OnInit', () => {
        expect(component.form.controls['street'].value).toEqual(storeData.street);
        expect(component.form.controls['unit'].value).toEqual(storeData.unit);
        expect(component.form.controls['city'].value).toEqual(storeData.city);
        expect(component.form.controls['state'].value).toEqual(storeData.state);
        expect(component.form.controls['zip'].value).toEqual(storeData.zip);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new PropertyLocationUpdateAction({
          street: 'not_street',
          county: 'not_county',
          city: 'not_city',
          state: 'not_state',
          zip: 'not_zip'
        }));
        expect(component.form.controls['street'].value).toEqual(storeData.street);
        expect(component.form.controls['unit'].value).toEqual(storeData.unit);
        expect(component.form.controls['city'].value).toEqual(storeData.city);
        expect(component.form.controls['state'].value).toEqual(storeData.state);
        expect(component.form.controls['zip'].value).toEqual(storeData.zip);
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          street: 'street',
          city: 'city',
          state: 'state',
          zip: 'zip'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new PropertyLocationUpdateAction(
        component.form.value
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #street input to the street control', () => {
      const input = fixture.debugElement.query(By.css('#street')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['street'].value).toEqual(value);
    });

    it('should map the #unit input to the unit control', () => {
      const input = fixture.debugElement.query(By.css('#unit')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['unit'].value).toEqual(value);
    });

    it('should map the #city input to the city control', () => {
      const input = fixture.debugElement.query(By.css('#city')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['city'].value).toEqual(value);
    });

    it('should map the #state input to the unit control', () => {
      const input = fixture.debugElement.query(By.css('#state')).nativeElement;
      const value = 'MO';
      input.value = value;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['state'].value).toEqual(value);
    });

    it('should map the #zip input to the unit control', () => {
      const input = fixture.debugElement.query(By.css('#zip')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['zip'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).not.toContain('error');
      });

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      inputGroups.filter(inputGroup => {
        const classList = inputGroup.nativeElement.classList;
        return classList.contains('input-group-street') ||
          classList.contains('input-group-city') ||
          classList.contains('input-group-state') ||
          classList.contains('input-group-zip')
      }).forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).toContain('error');
      });
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should show formatting error when value is not a zip', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group-zip')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#zip')).nativeElement;
      input.value = 'not-a-zip';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
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
