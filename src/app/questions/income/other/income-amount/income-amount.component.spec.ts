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
import { By } from '@angular/platform-browser';

import { QuestionsIncomeOtherIncomeAmountComponent } from './income-amount.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeOtherIncomeAmountComponent', () => {
  let component: QuestionsIncomeOtherIncomeAmountComponent;
  let fixture: ComponentFixture<QuestionsIncomeOtherIncomeAmountComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentOtherIncome$;

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
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeOtherIncomeAmountComponent,
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

    currentOtherIncome$ = Observable.of(undefined);

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
    fixture = TestBed.createComponent(QuestionsIncomeOtherIncomeAmountComponent);
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
    it('should have the monthly control with no default value', () => {
      expect(component.form.controls['monthly']).toBeDefined();
      expect(component.form.controls['monthly'].value).toEqual(null);
    });

    it('should require the monthly control', () => {
      component.form.controls['monthly'].setValue(null);
      expect(component.form.controls['monthly'].valid).toBeFalsy();

      component.form.controls['monthly'].setValue('100');
      expect(component.form.controls['monthly'].valid).toBeTruthy();
    });

    it('should require the monthly control to be valid income', () => {
      component.form.controls['monthly'].setValue(null);
      expect(component.form.controls['monthly'].valid).toBeFalsy();

      component.form.controls['monthly'].setValue('monthly');
      expect(component.form.controls['monthly'].valid).toBeFalsy();

      component.form.controls['monthly'].setValue('$100');
      expect(component.form.controls['monthly'].valid).toBeTruthy();

      component.form.controls['monthly'].setValue('$100,000');
      expect(component.form.controls['monthly'].valid).toBeTruthy();
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentOtherIncome', () => {
      beforeEach(() => {
        component.currentOtherIncome = {
          id: 12345
        };
        component.tempOtherIncome = {
          id: 654321
        };
        component.form = ({
          valid: true,
          value: {
            monthly: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given monthly income removing the "$" and ","', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeUpdateAction(
          component.currentOtherIncome,
          Object.assign({}, component.currentOtherIncome, {
            monthly: 10000
          }))
        );
      });

      it('should update the value in the store with the given monthly income even if it is a number', () => {
        component.form = ({
          valid: true,
          value: {
            monthly: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeUpdateAction(
          component.currentOtherIncome,
          Object.assign({}, component.currentOtherIncome, {
            monthly: 10000
          }))
        );
      });
    });

    describe('without a currentOtherIncome', () => {
      beforeEach(() => {
        component.currentOtherIncome = null;
        component.tempOtherIncome = {
          id: 654321
        };
        component.form = ({
          valid: true,
          value: {
            monthly: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp other income store with the given monthly income', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeAddAction(
          Object.assign(component.tempOtherIncome, {
            monthly: 10000
          })
        ));
      });

      it('should update the value in the store with the given monthly income even if it is a number', () => {
        component.form = ({
          valid: true,
          value: {
            monthly: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeAddAction(
          Object.assign(component.tempOtherIncome, {
            monthly: 10000
          })
        ));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #monthly input to the monthly control', () => {
      const input = fixture.debugElement.query(By.css('#monthly')).nativeElement;
      const value = '10000';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['monthly'].value).toEqual('10000');
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

      const input = fixture.debugElement.query(By.css('#monthly')).nativeElement;
      input.value = 'not-a-currency';
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
