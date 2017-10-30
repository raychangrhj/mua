import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { QuestionsCustomerAddressComponent } from './address.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import { AddressUpdateAction } from '../ngrx/actions/address/address.action';
import { AddressState } from '../ngrx/reducers/address/address.reducer';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { BorrowerCacheService } from '../../../../core/borrower-cache.service';
import { MapsAPILoader } from '@agm/core';

describe('QuestionsCustomerAddressComponent', () => {
  let component: QuestionsCustomerAddressComponent;
  let fixture: ComponentFixture<QuestionsCustomerAddressComponent>;
  let activatedRoute;
  let router;
  let store;
  let borrowerCacheService;
  let isCoBorrowerPage;
  let mapsApiLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: reducer,
          customer: combineReducers(reducers)
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
        },
        {
          provide: BorrowerCacheService,
          useValue: jasmine.createSpyObj('BorrowerCacheService', ['getBorrowerAddress'])
        }
      ],
      declarations: [
        QuestionsCustomerAddressComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([
    Router,
    ActivatedRoute,
    Store,
    BorrowerCacheService,
    MapsAPILoader
  ], (_router_, _activatedRoute_, _store_, _borrowerCacheService_, _mapsApiLoader_) => {
    mapsApiLoader = _mapsApiLoader_;
    mapsApiLoader.load.and.returnValue(Promise.resolve());

    borrowerCacheService = _borrowerCacheService_;

    router = _router_;
    spyOn(router, 'navigate');

    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();

    isCoBorrowerPage = true;

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/new-customer/ssn'
            }
          },
          next: true,
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
      if (filter({isCoBorrowerPage: true})) {
        return Observable.of(isCoBorrowerPage);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCustomerAddressComponent);
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

    it('should not update form controls if their is no data in the store', () => {
      store.dispatch(new AddressUpdateAction({
        street: null,
        city: null,
        state: null,
        zip: null
      }));
      component.ngOnInit();

      expect(component.form.controls['street'].value).toEqual(null);
      expect(component.form.controls['unit'].value).toEqual(null);
      expect(component.form.controls['city'].value).toEqual(null);
      expect(component.form.controls['state'].value).toEqual(null);
      expect(component.form.controls['zip'].value).toEqual(null);
    });

    describe('with previous data in the store', () => {
      let storeData: AddressState;
      beforeEach(() => {
        storeData = {
          street: 'street',
          unit: 'unit',
          city: 'city',
          state: 'state',
          zip: 'zip'
        };
        store.dispatch(new AddressUpdateAction(storeData));
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
        store.dispatch(new AddressUpdateAction({
          street: 'not_street',
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

  it('should map the activatedRoute data for isCoBorrowerPage boolean', () => {
    expect(component.isCoBorrowerPage$).toBeDefined();
    component.isCoBorrowerPage$.take(1).subscribe(bool => {
      expect(bool).toEqual(true);
    });
  });

  describe('useBorrowerAddress', () => {
    it('should set the form information equal to the borrower data when called with true', () => {
      const borrowerAddress = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      borrowerCacheService.getBorrowerAddress.and.returnValue(borrowerAddress);

      component.useBorrowerAddress(true);
      expect(component.form.value).toEqual(borrowerAddress);
    });

    it('should clear the form data when called with false', () => {
      component.form.controls['street'].setValue('street');
      component.form.controls['unit'].setValue('unit');
      component.form.controls['city'].setValue('city');
      component.form.controls['state'].setValue('state');
      component.form.controls['zip'].setValue('zip');
      component.useBorrowerAddress(false);
      expect(component.form.value).toEqual({
        street: null,
        unit: null,
        city: null,
        state: null,
        zip: null
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          address: 'address'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new AddressUpdateAction(
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

    it('should show the address same as borrower checkbox when route data for isCoBorrowerPage is true', () => {
      const isSameAsBorrowerFieldset = fixture.debugElement.query(By.css('#is-same-as-borrower-fieldset'));
      expect(isSameAsBorrowerFieldset).toBeTruthy();
    });

    it('should not show the address same as borrower checkbox when route data for isCoBorrowerPage is false', () => {
      isCoBorrowerPage = false;
      component.ngOnInit();
      fixture.detectChanges();

      const isSameAsBorrowerFieldset = fixture.debugElement.query(By.css('#is-same-as-borrower-fieldset'));
      expect(isSameAsBorrowerFieldset).toBeFalsy();
    });

    it('should fill in the form with the borrower\'s data when the checkbox is checked', () => {
      const borrowerAddress = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'MO',
        zip: 'zip'
      };
      borrowerCacheService.getBorrowerAddress.and.returnValue(borrowerAddress);
      const isSameAsBorrower = fixture.debugElement.query(By.css('#same-as-borrower')).nativeElement;
      isSameAsBorrower.checked = true;
      isSameAsBorrower.dispatchEvent(new Event('change'));

      expect(fixture.debugElement.query(By.css('#street')).nativeElement.value).toEqual(borrowerAddress.street);
      expect(fixture.debugElement.query(By.css('#unit')).nativeElement.value).toEqual(borrowerAddress.unit);
      expect(fixture.debugElement.query(By.css('#city')).nativeElement.value).toEqual(borrowerAddress.city);
      expect(fixture.debugElement.query(By.css('#state')).nativeElement.value).toEqual(borrowerAddress.state);
      expect(fixture.debugElement.query(By.css('#zip')).nativeElement.value).toEqual(borrowerAddress.zip);
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
