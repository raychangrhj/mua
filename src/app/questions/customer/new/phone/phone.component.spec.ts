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

import { QuestionsNewCustomerPhoneComponent } from './phone.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { PhoneUpdateAction } from '../../shared/ngrx/actions/phone/phone.action';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { KeysToArrayPipe } from '../../../../shared/keys-to-array.pipe';
import { phoneTypes } from '../../../../shared/select-definitions';

describe('QuestionsNewCustomerPhoneComponent', () => {
  let component: QuestionsNewCustomerPhoneComponent;
  let fixture: ComponentFixture<QuestionsNewCustomerPhoneComponent>;
  let activatedRoute;
  let router;
  let store;

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
        }
      ],
      declarations: [
        QuestionsNewCustomerPhoneComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent,
        KeysToArrayPipe
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
              routerLink: '/new-customer/name'
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
    fixture = TestBed.createComponent(QuestionsNewCustomerPhoneComponent);
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

  it('should have the phone types array', () => {
    expect(component.phoneTypes).toEqual(phoneTypes);
  });

  describe('the component form', () => {
    it('should have the number control with no default value', () => {
      expect(component.form.controls['number']).toBeDefined();
      expect(component.form.controls['number'].value).toEqual(null);
    });

    it('should require the number control', () => {
      component.form.controls['number'].setValue(null);
      expect(component.form.controls['number'].valid).toBeFalsy();

      component.form.controls['number'].setValue('6186186611');
      expect(component.form.controls['number'].valid).toBeTruthy();
    });

    it('should require the number control to be formatted correctly', () => {
      component.form.controls['number'].setValue(null);
      expect(component.form.controls['number'].valid).toBeFalsy();

      component.form.controls['number'].setValue('number');
      expect(component.form.controls['number'].valid).toBeFalsy();

      component.form.controls['number'].setValue('6183670543');
      expect(component.form.controls['number'].valid).toBeTruthy();

      component.form.controls['number'].setValue('16183670543');
      expect(component.form.controls['number'].valid).toBeFalsy();
    });

    it('should have the type control with no default value', () => {
      expect(component.form.controls['type']).toBeDefined();
      expect(component.form.controls['type'].value).toEqual(null);
    });

    it('should require the type control', () => {
      component.form.controls['type'].setValue(null);
      expect(component.form.controls['type'].valid).toBeFalsy();

      component.form.controls['type'].setValue('type');
      expect(component.form.controls['type'].valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new PhoneUpdateAction({
          number: '555-555-5555',
          type: 'cell'
        }));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['number'].value).toEqual('555-555-5555');
        expect(component.form.controls['type'].value).toEqual('cell');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new PhoneUpdateAction({
          number: '666-666-6666',
          type: 'not_cell'
        }));
        expect(component.form.controls['number'].value).toEqual('555-555-5555');
        expect(component.form.controls['type'].value).toEqual('cell');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          phone: 'phone'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new PhoneUpdateAction(
        component.form.value
      ));
    });
  });

  describe('formatPhone method', () => {
    it('should reformat non-formatted valid phone numbers', () => {
      component.form.controls['number'].setValue('1234567890');
      component.formatPhone();
      expect(component.form.get('number').value).toEqual('(123) 456-7890');
    });

    it('should not modify invalid phone numbers', () => {
      component.form.controls['number'].setValue('5486288');
      component.formatPhone();
      expect(component.form.get('number').value).toEqual('5486288');

      component.form.controls['number'].setValue('18006786786');
      component.formatPhone();
      expect(component.form.get('number').value).toEqual('18006786786');
    });

    it('should update validations after formatting numbers', () => {
      spyOn(component.form.controls['number'], 'updateValueAndValidity').and.callThrough();
      component.form.controls['number'].setValue('6183670543');
      component.formatPhone();
      expect(component.form.controls['number'].updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #number input to the number control', () => {
      const input = fixture.debugElement.query(By.css('#number')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['number'].value).toEqual(value);
    });

    it('should reformat the #number input on blur', () => {
      const input = fixture.debugElement.query(By.css('#number')).nativeElement;
      const value = '1234567890';
      input.value = value;
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('focusout'));

      expect(input.value).toEqual('(123) 456-7890');
    });

    it('should show required error when submit is pressed', () => {
      const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).not.toContain('error');
      });

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).toContain('error');
      });
      expect(fixture.debugElement.queryAll(By.css('.error-required')).length).toEqual(2);
    });

    // TODO determine if this test is failing due to input[type="tel"] or wtf
    it('should show formatting error when value is not a phone number', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group-number')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#number')).nativeElement;
      input.value = 'not-a-phone';
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
