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

import { QuestionsMortgageIntentCostComponent } from './cost.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { CostUpdateAction } from '../ngrx/actions/cost/cost.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { reducers } from '../ngrx/reducers/index.reducer';

describe('QuestionsMortgageIntentCostComponent', () => {
  let component: QuestionsMortgageIntentCostComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentCostComponent>;
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
        QuestionsMortgageIntentCostComponent,
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
              routerLink: '/mortgage-intent/buying/confirm-location'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentCostComponent);
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
    it('should have the price control with no default value', () => {
      expect(component.form.controls['price']).toBeDefined();
      expect(component.form.controls['price'].value).toEqual(null);
    });

    it('should require the price control', () => {
      component.form.controls['price'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['price'].setValue('100');
      expect(component.form.valid).toBeTruthy();
    });

    it('should require the price control be a valid number/currency', () => {
      component.form.controls['price'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['price'].setValue('100');
      expect(component.form.valid).toBeTruthy();

      component.form.controls['price'].setValue('$100');
      expect(component.form.valid).toBeTruthy();

      component.form.controls['price'].setValue('$100,000');
      expect(component.form.valid).toBeTruthy();

      component.form.controls['price'].setValue('$10,000.1');
      expect(component.form.valid).toBeFalsy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new CostUpdateAction(10000));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['price'].value).toEqual(10000);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new CostUpdateAction(20000));
        expect(component.form.controls['price'].value).toEqual(10000);
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          price: '$20,000'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store removing the "$" and ","', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new CostUpdateAction(20000));
    });

    it('should dispatch an event to update the store even if the price is a number', () => {
      component.form = ({
        valid: true,
        value: {
          price: 20000
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new CostUpdateAction(20000));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #price input to the price control', () => {
      const input = fixture.debugElement.query(By.css('#price')).nativeElement;
      const value = 1234123412341234;
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['price'].value).toEqual(value + '');
    });

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[1].title);
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

    it('should show formatting error when value is not a number/currency', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#price')).nativeElement;
      input.value = 'not-a-number';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
    });
  });
});
