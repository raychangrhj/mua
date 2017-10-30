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

import { QuestionsIncomeEmploymentMonthlyIncomeComponent } from './monthly-income.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { TempEmploymentIncomeUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeEmploymentMonthlyIncomeComponent', () => {
  let component: QuestionsIncomeEmploymentMonthlyIncomeComponent;
  let fixture: ComponentFixture<QuestionsIncomeEmploymentMonthlyIncomeComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentEmployment$: Observable<EmploymentStateObject>;

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
            parent: {
              parent: 'parent.parent'
            },
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeEmploymentMonthlyIncomeComponent,
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

    currentEmployment$ = Observable.of(undefined);

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
      if (filter({currentEmployment: true})) {
        return currentEmployment$;
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeEmploymentMonthlyIncomeComponent);
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
    it('should have the income control with no default value', () => {
      expect(component.form.controls['income']).toBeDefined();
      expect(component.form.controls['income'].value).toEqual(null);
    });

    it('should require the income control', () => {
      component.form.controls['income'].setValue(null);
      expect(component.form.controls['income'].valid).toBeFalsy();

      component.form.controls['income'].setValue('income');
      expect(component.form.controls['income'].valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      describe('(coming from the tempEmployment)', () => {
        it('should set the value of the control', () => {
          store.dispatch(new TempEmploymentIncomeUpdateAction(10000));
          component.ngOnInit();
          expect(component.form.controls['income'].value).toEqual(10000);
        });
      });

      describe('coming from currentEmployment', () => {
        it('should set the value of the control', () => {
          const currentEmployment = {
            income: 1098
          };
          currentEmployment$ = Observable.of(currentEmployment);
          component.ngOnInit();
          expect(component.form.controls['income'].value).toEqual(currentEmployment.income);
        });
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            income: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given monthly income removing the "$" and ","', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, {
            income: 10000
          }))
        );
      });

      it('should update the value in the store with the given monthly income even if the income is a number', () => {
        component.form = ({
          valid: true,
          value: {
            income: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, {
            income: 10000
          }))
        );
      });
    });

    describe('without a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = null;
        component.form = ({
          valid: true,
          value: {
            income: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp employment store with the given monthly income', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentIncomeUpdateAction(10000));
      });

      it('should update the value in the store with the given monthly income even if the income is a number', () => {
        component.form = ({
          valid: true,
          value: {
            income: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentIncomeUpdateAction(
          10000
        ));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #income input to the income control', () => {
      const input = fixture.debugElement.query(By.css('#income')).nativeElement;
      const value = 'income';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['income'].value).toEqual(value);
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

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
