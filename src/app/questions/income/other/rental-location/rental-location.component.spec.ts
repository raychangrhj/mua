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

import { QuestionsIncomeRentalLocationComponent } from './rental-location.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import { TempOtherIncomeRentalLocationUpdateAction } from '../../ngrx/actions/temp-other/temp-other.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { initialOtherIncomeStateObject } from '../../ngrx/reducers/other/other.reducer';
import { MapsAPILoader } from '@agm/core';

describe('QuestionsIncomeRentalLocationComponent', () => {
  let component: QuestionsIncomeRentalLocationComponent;
  let fixture: ComponentFixture<QuestionsIncomeRentalLocationComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentOtherIncome$;
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
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeRentalLocationComponent,
        QuestionsProgressPillsComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        ActionBtnGroupComponent
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

    currentOtherIncome$ = Observable.of(null);

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
      if (filter({currentOtherIncome: true})) {
        return currentOtherIncome$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeRentalLocationComponent);
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

      component.form.controls['zip'].setValue('63144');
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
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentOtherIncome', () => {
      beforeEach(() => {
        component.currentOtherIncome = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            street: 'street',
            unit: 'unit',
            city: 'city',
            state: 'state',
            zip: 'zip'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given monthly income', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeUpdateAction(
          component.currentOtherIncome,
          Object.assign({}, component.currentOtherIncome, {
            rentalLocation: component.form.value
          }))
        );
      });
    });

    describe('without a currentOtherIncome', () => {
      beforeEach(() => {
        component.currentOtherIncome = null;
        component.form = ({
          valid: true,
          value: {
            street: 'street',
            unit: 'unit',
            city: 'city',
            state: 'state',
            zip: 'zip'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should add the other income to the incomes array', () => {
        expect(store.dispatch).toHaveBeenCalledWith(
          new OtherIncomeAddAction(
            Object.assign({},
              initialOtherIncomeStateObject,
              {
                rentalLocation: component.form.value
              }
            )
          )
        );
      });
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
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
