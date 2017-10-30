import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
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

import { QuestionsExistingCustomerAtmCardComponent } from './atm-card.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { AuthenticationByDebitAction } from '../ngrx/actions/authentication.action';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsExistingCustomerAtmCardComponent', () => {
  let component: QuestionsExistingCustomerAtmCardComponent;
  let fixture: ComponentFixture<QuestionsExistingCustomerAtmCardComponent>;
  let activatedRoute;
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
        QuestionsExistingCustomerAtmCardComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Store, ActivatedRoute], (_store_, _activatedRoute_) => {
    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/existing-customer'
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
    fixture = TestBed.createComponent(QuestionsExistingCustomerAtmCardComponent);
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
    it('should have the debit card control with no default value', () => {
      expect(component.form.controls['cardNumber']).toBeDefined();
      expect(component.form.controls['cardNumber'].value).toEqual(null);
    });

    it('should require the cardNumber control, and validate it', () => {
      component.form.controls['cardNumber'].setValue(null);
      expect(component.form.controls['cardNumber'].valid).toBeFalsy();

      component.form.controls['cardNumber'].setValue('card number');
      expect(component.form.controls['cardNumber'].valid).toBeFalsy();

      component.form.controls['cardNumber'].setValue('1234-1234-1234-1234');
      expect(component.form.controls['cardNumber'].valid).toBeTruthy();
    });

    it('should have the pin number control with no default value', () => {
      expect(component.form.controls['pinNumber']).toBeDefined();
      expect(component.form.controls['pinNumber'].value).toEqual(null);
    });

    it('should require the pinNumber control, and validate it', () => {
      component.form.controls['pinNumber'].setValue(null);
      expect(component.form.controls['pinNumber'].valid).toBeFalsy();

      component.form.controls['pinNumber'].setValue('pin number');
      expect(component.form.controls['pinNumber'].valid).toBeFalsy();

      component.form.controls['pinNumber'].setValue('4444');
      expect(component.form.controls['pinNumber'].valid).toBeTruthy();

      component.form.controls['pinNumber'].setValue('123456789');
      expect(component.form.controls['pinNumber'].valid).toBeTruthy();
    });
  });

  describe('setting up onSubmitMethod', () => {
    it('should dispatch the Authenticate Action', () => {
      component.form = ({
        valid: true,
        value: {
          cardNumber: 'cardNumber',
          pinNumber: 'pinNumber'
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new AuthenticationByDebitAction(
        component.form.value
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #card-number input to the cardNumber control', () => {
      const cardNumber = fixture.debugElement.query(By.css('#card-number')).nativeElement;
      const value = '1234123412341234';
      cardNumber.value = value;
      cardNumber.dispatchEvent(new Event('input'));

      expect(component.form.controls['cardNumber'].value).toEqual(value);
    });

    it('should map the #pin-number input to the cardNumber control', () => {
      const pinNumber = fixture.debugElement.query(By.css('#pin-number')).nativeElement;
      const value = '1234';
      pinNumber.value = value;
      pinNumber.dispatchEvent(new Event('input'));

      expect(component.form.controls['pinNumber'].value).toEqual(value);
    });

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
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

    it('should show formatting error when value is not an cardNumber', () => {
      const cardNumberInputGroup = fixture.debugElement.query(By.css('.input-group-card-number')).nativeElement;
      expect(cardNumberInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#card-number')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(cardNumberInputGroup.classList).toContain('error');
      expect(cardNumberInputGroup.querySelector('.error-pattern')).toBeTruthy();
    });

    it('should show formatting error when value is not an pinNumber', () => {
      const pinNumberInputGroup = fixture.debugElement.query(By.css('.input-group-pin-number')).nativeElement;
      expect(pinNumberInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#pin-number')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(pinNumberInputGroup.classList).toContain('error');
      expect(pinNumberInputGroup.querySelector('.error-pattern')).toBeTruthy();
    });
  });
});
