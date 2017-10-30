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

import { QuestionsMortgageIntentDownPaymentComponent } from './down-payment.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { DownPaymentUpdateAction } from '../ngrx/actions/down-payment/down-payment.action';
import { CostUpdateAction } from '../ngrx/actions/cost/cost.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { reducers } from '../ngrx/reducers/index.reducer';

describe('QuestionsMortgageIntentDownPaymentComponent', () => {
  let component: QuestionsMortgageIntentDownPaymentComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentDownPaymentComponent>;
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
        QuestionsMortgageIntentDownPaymentComponent,
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
              routerLink: '/mortgage-intent/buying/cost'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentDownPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // This hacky little focus is needed to counteract the on page load focus event
    fixture.nativeElement.querySelector('h2#page-heading').focus();
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
    it('should have the down-payment-amount control with no default value', () => {
      expect(component.form.controls['downPaymentAmount']).toBeDefined();
      expect(component.form.controls['downPaymentAmount'].value).toEqual(null);
    });

    it('should require the downPaymentAmount control', () => {
      component.form.controls['downPaymentAmount'].setValue(null);
      expect(component.form.controls['downPaymentAmount'].valid).toBeFalsy();

      component.form.controls['downPaymentAmount'].setValue('100');
      expect(component.form.controls['downPaymentAmount'].valid).toBeTruthy();
    });

    it('should require the downPaymentAmount control be a valid number/currency', () => {
      component.form.controls['downPaymentAmount'].setValue(null);
      expect(component.form.controls['downPaymentAmount'].valid).toBeFalsy();

      component.form.controls['downPaymentAmount'].setValue('100');
      expect(component.form.controls['downPaymentAmount'].valid).toBeTruthy();

      component.form.controls['downPaymentAmount'].setValue('$100,000');
      expect(component.form.controls['downPaymentAmount'].valid).toBeTruthy();
    });

    it('should have the down-payment-percent control with no default value', () => {
      expect(component.form.controls['downPaymentPercent']).toBeDefined();
      expect(component.form.controls['downPaymentPercent'].value).toEqual(null);
    });

    it('should require the downPaymentPercent control', () => {
      component.form.controls['downPaymentPercent'].setValue(null);
      expect(component.form.controls['downPaymentPercent'].valid).toBeFalsy();

      component.form.controls['downPaymentPercent'].setValue('10');
      expect(component.form.controls['downPaymentPercent'].valid).toBeTruthy();
    });

    it('should require the downPaymentPercent control is any number > 0', () => {
      component.form.controls['downPaymentPercent'].setValue(null);
      expect(component.form.controls['downPaymentPercent'].valid).toBeFalsy();

      component.form.controls['downPaymentPercent'].setValue('0');
      expect(component.form.controls['downPaymentPercent'].valid).toBeTruthy();

      component.form.controls['downPaymentPercent'].setValue('1');
      expect(component.form.controls['downPaymentPercent'].valid).toBeTruthy();
    });

    it('should not update form controls if their is no downPaymentAmount in the store', () => {
      store.dispatch(new CostUpdateAction(100000));
      store.dispatch(new DownPaymentUpdateAction(null));
      component.ngOnInit();

      expect(component.form.controls['downPaymentAmount'].value).toEqual(null);
      expect(component.form.controls['downPaymentPercent'].value).toEqual(null);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new CostUpdateAction(100000));
        store.dispatch(new DownPaymentUpdateAction(10000));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit calculating the percent of cost', () => {
        expect(component.form.controls['downPaymentAmount'].value).toEqual(10000);
        expect(component.form.controls['downPaymentPercent'].value).toEqual(10);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new CostUpdateAction(100000));
        store.dispatch(new DownPaymentUpdateAction(100000));
        expect(component.form.controls['downPaymentAmount'].value).toEqual(10000);
        expect(component.form.controls['downPaymentPercent'].value).toEqual(10);
      });
    });
  });

  it('should have a method for watching the percent control gain and loose focus', () => {
    expect(component.onPercentFocus).toEqual(jasmine.any(Function));
    expect(component.onPercentBlur).toEqual(jasmine.any(Function));
  });

  describe('onPercentFocus, onPercentBlur', () => {
    let downPaymentAmount;
    let downPaymentPercent;
    beforeEach(() => {
      downPaymentAmount = component.form.controls['downPaymentAmount'];
      downPaymentPercent = component.form.controls['downPaymentPercent'];
      store.dispatch(new CostUpdateAction(333333));
      component.ngOnInit();
      component.onPercentFocus();
    });

    it('should update the down payment amount based on the down payment percent', () => {
      downPaymentPercent.setValue('2');
      expect(downPaymentAmount.value).toEqual('6667');
      expect(fixture.debugElement.query(By.css('#down-payment-amount')).nativeElement.value).toEqual('6667');
    });

    it('should stop watching the percent field on blur', () => {
      downPaymentPercent.setValue('7');
      spyOn(component.downPaymentPercentValueChanges$, 'unsubscribe').and.callThrough();

      component.onPercentBlur();
      downPaymentPercent.setValue('20');

      expect(component.downPaymentPercentValueChanges$.unsubscribe).toHaveBeenCalledTimes(1);
      expect(downPaymentAmount.value).toEqual('23333');
    });
  });

  it('should have a method for watching the amount control gain and loose focus', () => {
    expect(component.onAmountFocus).toEqual(jasmine.any(Function));
    expect(component.onAmountBlur).toEqual(jasmine.any(Function));
  });

  describe('onAmountFocus, onAmountBlur', () => {
    let downPaymentAmount;
    let downPaymentPercent;
    beforeEach(() => {
      downPaymentAmount = component.form.controls['downPaymentAmount'];
      downPaymentPercent = component.form.controls['downPaymentPercent'];
      store.dispatch(new CostUpdateAction(100000));
      component.ngOnInit();
      component.onAmountFocus();
    });

    it('should update the down payment amount based on the down payment percent', () => {
      downPaymentAmount.setValue('20000');
      expect(downPaymentPercent.value).toEqual('20');
      expect(fixture.debugElement.query(By.css('#down-payment-percent')).nativeElement.value).toEqual('20');
    });

    it('should stop watching the amount field on blur', () => {
      downPaymentAmount.setValue('10000');
      spyOn(component.downPaymentAmountValueChanges$, 'unsubscribe').and.callThrough();

      component.onAmountBlur();
      downPaymentAmount.setValue('20000');

      expect(component.downPaymentAmountValueChanges$.unsubscribe).toHaveBeenCalledTimes(1);
      expect(downPaymentPercent.value).toEqual('10');
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          downPaymentAmount: '$20,000'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store removing the "$" and ","', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new DownPaymentUpdateAction(20000));
    });

    it('should dispatch an event to update the store even if the amount is a number', () => {
      component.form = ({
        valid: true,
        value: {
          downPaymentAmount: 20000
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new DownPaymentUpdateAction(20000));
    });
  });

  describe('HTML integration tests', () => {
    beforeEach(() => {
      store.dispatch(new CostUpdateAction(100000));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should map the #down-payment-amount input to the downPaymentAmount control', () => {
      const downPaymentAmount = fixture.debugElement.query(By.css('#down-payment-amount')).nativeElement;
      const value = 10000;
      downPaymentAmount.value = value;
      downPaymentAmount.dispatchEvent(new Event('input'));

      expect(component.form.controls['downPaymentAmount'].value).toEqual(value + '');
    });

    it('should map the #down-payment-percent input to the downPaymentPercent control', () => {
      const downPaymentPercent = fixture.debugElement.query(By.css('#down-payment-percent')).nativeElement;
      const value = 10000;
      downPaymentPercent.value = value;
      downPaymentPercent.dispatchEvent(new Event('input'));

      expect(component.form.controls['downPaymentPercent'].value).toEqual(value + '');
    });

    it('should update the percent when the amount is changed', () => {
      const downPaymentAmount = fixture.debugElement.query(By.css('#down-payment-amount')).nativeElement;
      const value = '$10,000';
      downPaymentAmount.dispatchEvent(new Event('focus'));
      downPaymentAmount.value = value;
      downPaymentAmount.dispatchEvent(new Event('input'));
      expect(component.form.controls['downPaymentAmount'].value).toEqual(value + '');
      expect(downPaymentAmount.value).toEqual(`${value}`);

      const downPaymentPercent = fixture.debugElement.query(By.css('#down-payment-percent')).nativeElement;
      expect(downPaymentPercent.value).toEqual('10');
    });

    it('should update the amount when the percent is changed', () => {
      const downPaymentPercent = fixture.debugElement.query(By.css('#down-payment-percent')).nativeElement;
      const value = '5%';
      downPaymentPercent.dispatchEvent(new Event('focus'));
      downPaymentPercent.value = value;
      downPaymentPercent.dispatchEvent(new Event('input'));
      expect(component.form.controls['downPaymentPercent'].value).toEqual(value + '');
      expect(downPaymentPercent.value).toEqual(`${value}`);

      const downPaymentAmount = fixture.debugElement.query(By.css('#down-payment-amount')).nativeElement;
      expect(downPaymentAmount.value).toEqual('5000');
    });

    it('should display the total loan price', () => {
      const loanPrice = fixture.debugElement.query(By.css('span.price'));
      expect(loanPrice).toBeTruthy();
      expect(loanPrice.nativeElement.textContent).toEqual('$100,000');
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

      const input = fixture.debugElement.query(By.css('#down-payment-amount')).nativeElement;
      input.value = 'not-a-number';
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
