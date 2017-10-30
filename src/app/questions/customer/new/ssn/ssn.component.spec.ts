import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { By } from '@angular/platform-browser';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { QuestionsNewCustomerSSNComponent } from './ssn.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { SSNUpdateAction } from '../../shared/ngrx/actions/ssn/ssn.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsNewCustomerSSNComponent', () => {
  let component: QuestionsNewCustomerSSNComponent;
  let fixture: ComponentFixture<QuestionsNewCustomerSSNComponent>;
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
        QuestionsNewCustomerSSNComponent,
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
      if (filter({actionBtnGroupLinkOptions: true})) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/new-customer/date-of-birth'
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
    fixture = TestBed.createComponent(QuestionsNewCustomerSSNComponent);
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
    it('should have the ssn control with no default value', () => {
      expect(component.form.controls['ssn']).toBeDefined();
      expect(component.form.controls['ssn'].value).toEqual(null);
    });

    it('should require the ssn control', () => {
      component.form.controls['ssn'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['ssn'].setValue('555-55-5555');
      expect(component.form.valid).toBeTruthy();
    });

    it('should require the ssn control be formatted correctly', () => {
      component.form.controls['ssn'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['ssn'].setValue('ssn');
      expect(component.form.valid).toBeFalsy();

      component.form.controls['ssn'].setValue('555-55-5555');
      expect(component.form.valid).toBeTruthy();
      component.form.controls['ssn'].setValue('555555555');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new SSNUpdateAction('555-55-5555'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['ssn'].value).toEqual('555-55-5555');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new SSNUpdateAction('666-66-6666'));
        expect(component.form.controls['ssn'].value).toEqual('555-55-5555');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          ssn: 'ssn'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SSNUpdateAction(
        component.form.value.ssn
      ));
    });
  });

  describe('formatSSN', () => {
    it('should format the input value of valid SSNs', () => {
      component.form.controls['ssn'].setValue('123456789');
      component.formatSSN();
      expect(component.form.get('ssn').value).toEqual('123-45-6789');
    });

    it('should not format the input value of invalid SSNs', () => {
      component.form.controls['ssn'].setValue('1234');
      component.formatSSN();
      expect(component.form.get('ssn').value).toEqual('1234');

      component.form.controls['ssn'].setValue('1234567890');
      component.formatSSN();
      expect(component.form.get('ssn').value).toEqual('1234567890');
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #ssn input to the ssn control', () => {
      const input = fixture.debugElement.query(By.css('#ssn')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['ssn'].value).toEqual(value);
    });

    it('should reformat the #ssn input on blur', () => {
      const input = fixture.debugElement.query(By.css('#ssn')).nativeElement;
      const value = '123456789';
      input.value = value;
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('focusout'));

      expect(input.value).toEqual('123-45-6789');
    });

    it('should show required error when submit is pressed', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should show formatting error when value is not a ssn', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#ssn')).nativeElement;
      input.value = 'not-a-ssn';
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
