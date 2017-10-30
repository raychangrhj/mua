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
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { QuestionsMortgageIntentConfirmLoanAmountComponent } from './confirm-loan-amount.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { PropertyLocationUpdateAction } from '../ngrx/actions/property-location/property-location.action';
import { CostUpdateAction } from '../ngrx/actions/cost/cost.action';
import { DownPaymentUpdateAction } from '../ngrx/actions/down-payment/down-payment.action';
import { PropertyLocationState } from '../ngrx/reducers/property-location/property-location.reducer';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { reducers as mortgageIntentReducers } from '../ngrx/reducers/index.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { MortgageTypeUpdateAction } from '../ngrx/actions/mortgage-type/mortgage-type.action';

describe('QuestionsMortgageIntentConfirmLoanAmountComponent', () => {
  let component: QuestionsMortgageIntentConfirmLoanAmountComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentConfirmLoanAmountComponent>;
  let activatedRoute;
  let router;
  let store;
  let propertyLocation: PropertyLocationState;
  let cost: number;
  let downPayment: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer,
          mortgageIntent: combineReducers(mortgageIntentReducers)
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
        QuestionsMortgageIntentConfirmLoanAmountComponent,
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
      county: 'County',
      state: 'MO',
      zip: '63144'
    };
    cost = 400000;
    downPayment = 80000;

    store.dispatch(new PropertyLocationUpdateAction(propertyLocation));
    store.dispatch(new CostUpdateAction(cost));
    store.dispatch(new DownPaymentUpdateAction(downPayment));
    store.dispatch(new MortgageTypeUpdateAction('buying'));

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            text: 'No',
            link: {
              routerLink: '/mortgage-intent/buying/location'
            }
          },
          next: 'Yes',
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsMortgageIntentConfirmLoanAmountComponent);
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

  it('should expose the cost from the store', () => {
    expect(component.cost).toEqual(cost);
  });

  it('should expose the down payment from the store', () => {
    expect(component.downPayment).toEqual(downPayment);
  });

  it('should calculate the loan amount from the cost and the downPayment', () => {
    expect(component.loanAmount).toEqual(cost - downPayment);
  });

  it('should not continue subscribing to the store once it has gathered the initial data', () => {
    store.dispatch(new DownPaymentUpdateAction(100000));
    expect(component.downPayment).not.toEqual(100000);

    store.dispatch(new CostUpdateAction(1000000));
    expect(component.cost).not.toEqual(1000000);

    expect(component.loanAmount).not.toEqual(1000000 - 100000);

    const notAddress = {
      street: 'not_street',
      city: 'not_city',
      county: 'not_county',
      state: 'not_state',
      zip: 'not_zip'
    };
    store.dispatch(new PropertyLocationUpdateAction(notAddress));
    expect(component.propertyLocation).not.toEqual(notAddress);
  });

  describe('HTML integration test', () => {
    it('should have the address from the store displayed', () => {
      expect(fixture.debugElement.query(By.css('.address')).nativeElement.textContent).toContain(propertyLocation.street);
      expect(fixture.debugElement.query(By.css('.address')).nativeElement.textContent).toContain(propertyLocation.city);
      expect(fixture.debugElement.query(By.css('.address')).nativeElement.textContent).toContain(propertyLocation.state);
      expect(fixture.debugElement.query(By.css('.address')).nativeElement.textContent).toContain(propertyLocation.zip);
    });

    it('should have the sales price from the store displayed', () => {
      expect(fixture.debugElement.query(By.css('.sales-price')).nativeElement.textContent).toEqual('$400,000');
    });

    it('should have the down-payment from the store displayed', () => {
      expect(fixture.debugElement.query(By.css('.down-payment')).nativeElement.textContent).toEqual('$80,000');
    });

    it('should have the loan-amount displayed', () => {
      expect(fixture.debugElement.query(By.css('.loan-amount')).nativeElement.textContent).toEqual('$320,000');
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
