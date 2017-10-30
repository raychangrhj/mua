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
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MapsAPILoader } from '@agm/core';

import { QuestionsIncomeEmploymentCompanyLocationComponent } from './company-location.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { By } from '@angular/platform-browser';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { EmploymentLocationState } from '../../ngrx/reducers/temp-employment/temp-employement.reducer';
import {
  TempEmploymentCompanyNameUpdateAction,
  TempEmploymentLocationUpdateAction
} from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeEmploymentCompanyLocationComponent', () => {
  let component: QuestionsIncomeEmploymentCompanyLocationComponent;
  let fixture: ComponentFixture<QuestionsIncomeEmploymentCompanyLocationComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentEmployment$: Observable<EmploymentStateObject>;
  let mapsApiLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: reducer,
          income: combineReducers(reducers)
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
            parent: {
              parent: 'parent.parent'
            },
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeEmploymentCompanyLocationComponent,
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
    spyOn(store, 'dispatch').and.callThrough();

    currentEmployment$ = Observable.of(undefined);

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
      if (filter({currentEmployment: true})) {
        return currentEmployment$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeEmploymentCompanyLocationComponent);
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

  it('should store an observable of the company name from the temporary company state', () => {
    store.dispatch(new TempEmploymentCompanyNameUpdateAction('company'));
    component.ngOnInit();

    component.companyName$.subscribe(data => {
      expect(data).toEqual('company');
    });
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

    describe('with previous data in the store', () => {
      let storeData: EmploymentLocationState;
      beforeEach(() => {
        storeData = {
          street: 'street',
          unit: 'unit',
          city: 'city',
          state: 'state',
          zip: 'zip'
        };
      });
      describe('coming from temp employment', () => {
        it('should set the value of the controls to the store data OnInit', () => {
          store.dispatch(new TempEmploymentLocationUpdateAction({
            street: storeData.street,
            unit: storeData.unit,
            city: storeData.city,
            state: storeData.state,
            zip: storeData.zip
          }));
          component.ngOnInit();

          expect(component.form.controls['street'].value).toEqual(storeData.street);
          expect(component.form.controls['unit'].value).toEqual(storeData.unit);
          expect(component.form.controls['city'].value).toEqual(storeData.city);
          expect(component.form.controls['state'].value).toEqual(storeData.state);
          expect(component.form.controls['zip'].value).toEqual(storeData.zip);
        });
      });

      describe('coming from current employment', () => {
        it('should set the value of the controls to the store data OnInit', () => {
          const currentEmployment = {
            location: {
              street: 'current-street',
              unit: 'current-unit',
              city: 'current-city',
              state: 'current-state',
              zip: 'current-zip',
            }
          };
          currentEmployment$ = Observable.of(currentEmployment);
          component.ngOnInit();

          expect(component.form.controls['street'].value).toEqual(currentEmployment.location.street);
          expect(component.form.controls['unit'].value).toEqual(currentEmployment.location.unit);
          expect(component.form.controls['city'].value).toEqual(currentEmployment.location.city);
          expect(component.form.controls['state'].value).toEqual(currentEmployment.location.state);
          expect(component.form.controls['zip'].value).toEqual(currentEmployment.location.zip);
        });
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            street: 'street',
            unit: 'unit',
            city: 'city',
            state: 'state',
            zip: 'zip',
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given location', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, {
            location: component.form.value
          }))
        );
      });
    });

    describe('without a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = null;
        component.form = ({
          valid: true,
          value: {
            street: 'street',
            unit: 'unit',
            city: 'city',
            state: 'state',
            zip: 'zip',
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp employment store with the given location', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentLocationUpdateAction(component.form.value));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should include the company name in the title from tempCompanyName', () => {
      const companyName = 'company name';
      store.dispatch(new TempEmploymentCompanyNameUpdateAction(companyName));
      component.ngOnInit();
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual(`Where is ${companyName} located?`);
    });

    it('should include the company name in the title from currentEmployment', () => {
      const companyName = 'current company name';
      currentEmployment$ = Observable.of({
        companyName,
        location: {
          street: 'street',
          unit: 'unit',
          city: 'city',
          state: 'state',
          zip: 'zip'
        }
      });
      component.ngOnInit();
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual(`Where is ${companyName} located?`);
    });

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
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
