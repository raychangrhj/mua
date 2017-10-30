import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsIncomeCurrentEmploymentComponent } from './current-employment.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import {
  initialNavigationState,
  reducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../ngrx/reducers/index.reducer';
import { QuestionsConfirmAnswerComponent } from '../../shared/confirm-answer/confirm-answer.component';
import { By } from '@angular/platform-browser';
import { EmploymentAddAction } from '../ngrx/actions/employment/employment.action';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';

describe('QuestionsIncomeCurrentEmploymentComponent', () => {
  let component: QuestionsIncomeCurrentEmploymentComponent;
  let fixture: ComponentFixture<QuestionsIncomeCurrentEmploymentComponent>;
  let activatedRoute;
  let router;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
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
        QuestionsIncomeCurrentEmploymentComponent,
        QuestionsProgressPillsComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsConfirmAnswerComponent
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
              routerLink: '/new-customer/phone'
            }
          },
          next: true,
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
      if (filter({sectionId: true})) {
        return Observable.of(10);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeCurrentEmploymentComponent);
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
    it('should have the notEmployed control with no default value', () => {
      expect(component.form.controls['notEmployed']).toBeDefined();
      expect(component.form.controls['notEmployed'].value).toEqual(null);
    });

    it('should require the notEmployed control to be true', () => {
      component.form.controls['notEmployed'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['notEmployed'].setValue(false);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['notEmployed'].setValue(true);
      expect(component.form.valid).toBeTruthy();
    });

    it('should have the hasEmployments control with no default value', () => {
      expect(component.form.controls['hasEmployments']).toBeDefined();
      expect(component.form.controls['hasEmployments'].value).toEqual(false);
    });

    it('should require the hasEmployments control to be true', () => {
      component.form.controls['hasEmployments'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['hasEmployments'].setValue(false);
      expect(component.form.valid).toBeFalsy();
    });
  });

  describe('setting up onSubmitMethod', () => {
    it('should navigate to the previous-employment page when their is no employment', () => {
      component.form = ({
        valid: true,
        value: {
          notEmployed: true,
          hasEmployments: true
        }
      } as FormGroup);
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith([`${component.baseUrl}/income/previous-employment`]);
    });

    it('should navigate to the other income page when the employment is longer than 2 years', () => {
      store.dispatch(new EmploymentAddAction({
        dates: {
          startDate: '2010/10/10',
          endDate: 'current'
        }
      }));
      component.form = ({
        valid: true,
        value: {
          notEmployed: true,
          hasEmployments: true
        }
      } as FormGroup);
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith([`${component.baseUrl}/income/other-income`]);
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #not-employed input to the notEmployed control', () => {
      const input = fixture.debugElement.query(By.css('#not-employed')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['notEmployed'].value).toEqual(true);
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
