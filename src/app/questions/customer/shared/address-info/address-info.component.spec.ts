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
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { QuestionsCustomerAddressInfoComponent } from './address-info.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import { AddressInfoUpdateAction } from '../ngrx/actions/address-info/address-info.action';
import { AddressState } from '../ngrx/reducers/address/address.reducer';
import { AddressUpdateAction } from '../ngrx/actions/address/address.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { BorrowerCacheService } from '../../../../core/borrower-cache.service';

describe('QuestionsCustomerAddressInfoComponent', () => {
  let component: QuestionsCustomerAddressInfoComponent;
  let fixture: ComponentFixture<QuestionsCustomerAddressInfoComponent>;
  let activatedRoute;
  let router;
  let store;
  let borrowerCacheService;
  let isCoBorrowerPage;

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
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        },
        {
          provide: BorrowerCacheService,
          useValue: jasmine.createSpyObj('BorrowerCacheService', ['getBorrowerAddressInfo'])
        }
      ],
      declarations: [
        QuestionsCustomerAddressInfoComponent,
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
    BorrowerCacheService
  ], (_router_, _activatedRoute_, _store_, _borrowerCacheService_) => {
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
              routerLink: '/new-customer/address'
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
    fixture = TestBed.createComponent(QuestionsCustomerAddressInfoComponent);
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
    it('should have the address start date control with no default value', () => {
      expect(component.form.controls['addressStartDate']).toBeDefined();
      expect(component.form.controls['addressStartDate'].value).toEqual(null);
    });

    it('should require the addressStartDate control', () => {
      component.form.controls['addressStartDate'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['addressStartDate'].setValue('10/2010');
      expect(component.form.valid).toBeTruthy();
    });

    it('should require the addressStartDate control be a date formatted MM/YYYY', () => {
      component.form.controls['addressStartDate'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['addressStartDate'].setValue('something');
      expect(component.form.valid).toBeFalsy();
      component.form.controls['addressStartDate'].setValue('2010-10-10');
      expect(component.form.valid).toBeFalsy();
      component.form.controls['addressStartDate'].setValue('10-2010');
      expect(component.form.valid).toBeFalsy();
      component.form.controls['addressStartDate'].setValue('13/2010');
      expect(component.form.valid).toBeFalsy();
      component.form.controls['addressStartDate'].setValue('00/2010');
      expect(component.form.valid).toBeFalsy();

      component.form.controls['addressStartDate'].setValue('01/2010');
      expect(component.form.valid).toBeTruthy();
      component.form.controls['addressStartDate'].setValue('02/2010');
      expect(component.form.valid).toBeTruthy();
      component.form.controls['addressStartDate'].setValue('02/1901');
      expect(component.form.valid).toBeTruthy();
      component.form.controls['addressStartDate'].setValue('2/1901');
      expect(component.form.valid).toBeTruthy();
      component.form.controls['addressStartDate'].setValue('12/1900');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new AddressInfoUpdateAction('2010-10-10'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['addressStartDate'].value).toEqual('2010-10-10');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new AddressInfoUpdateAction('2012-12-12'));
        expect(component.form.controls['addressStartDate'].value).toEqual('2010-10-10');
      });
    });
  });

  it('should expose the address from the data store', () => {
    const address: AddressState = {
      street: 'street',
      city: 'city',
      state: 'state',
      zip: 'zip'
    };
    store.dispatch(new AddressUpdateAction(address));
    component.ngOnInit();

    expect(component.address).toEqual(address)
  });

  it('should not continue to subscribe to the store for address', () => {
    const address: AddressState = {
      street: 'street',
      city: 'city',
      state: 'state',
      zip: 'zip'
    };
    const otherAddress: AddressState = {
      street: 'not_street',
      city: 'not_city',
      state: 'not_state',
      zip: 'not_zip'
    };
    store.dispatch(new AddressUpdateAction(address));
    component.ngOnInit();

    expect(component.address).toEqual(address);

    store.dispatch(new AddressUpdateAction(otherAddress));
    expect(component.address).toEqual(address);
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          addressInfo: 'addressInfo'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new AddressInfoUpdateAction(
        component.form.value.addressStartDate
      ));
    });
  });

  it('should map the activatedRoute data for isCoBorrowerPage boolean', () => {
    expect(component.isCoBorrowerPage$).toBeDefined();
    component.isCoBorrowerPage$.take(1).subscribe(bool => {
      expect(bool).toEqual(true);
    });
  });

  describe('useBorrowerAddressInfo', () => {
    it('should set the form information equal to the borrower data when called with true', () => {
      const borrowerAddressInfo = 'mm/yyyy';
      borrowerCacheService.getBorrowerAddressInfo.and.returnValue(borrowerAddressInfo);

      component.useBorrowerAddressInfo(true);
      expect(component.form.value.addressStartDate).toEqual(borrowerAddressInfo);
    });

    it('should clear the form data when called with false', () => {
      component.form.controls['addressStartDate'].setValue('startDate');
      component.useBorrowerAddressInfo(false);
      expect(component.form.value).toEqual({
        addressStartDate: null
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #address-start-date input to the addressStartDate control', () => {
      const input = fixture.debugElement.query(By.css('#address-start-date')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['addressStartDate'].value).toEqual(value);
    });

    it('should display the customer\'s street unit and city in the header', () => {
      const address: AddressState = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      store.dispatch(new AddressUpdateAction(address));
      component.ngOnInit();
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.primary-text'));
      expect(header.nativeElement.textContent).toContain(`${address.street} ${address.unit}, ${address.city}`);
    });

    it('should display the customer\'s street and city in the header without extra spaces if there is no unit', () => {
      const address: AddressState = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      store.dispatch(new AddressUpdateAction(address));
      component.ngOnInit();
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.primary-text'));
      expect(header.nativeElement.textContent).toContain(`${address.street}, ${address.city}`);
    });

    it('should show the addressinfo same as borrower checkbox when route data for isCoBorrowerPage is true', () => {
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
      const borrowerAddressInfo = 'mm/yyyy';
      borrowerCacheService.getBorrowerAddressInfo.and.returnValue(borrowerAddressInfo);
      const isSameAsBorrower = fixture.debugElement.query(By.css('#same-as-borrower')).nativeElement;
      isSameAsBorrower.checked = true;
      isSameAsBorrower.dispatchEvent(new Event('change'));

      expect(fixture.debugElement.query(By.css('#address-start-date')).nativeElement.value).toEqual(borrowerAddressInfo);
    });

    it('should show required error when submit is pressed', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group-address-start-date')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.input-group-address-start-date .error-required'))).toBeTruthy();
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
