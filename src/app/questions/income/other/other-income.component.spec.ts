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

import { QuestionsIncomeOtherIncomeComponent } from './other-income.component';
import { QuestionsConfirmAnswerComponent } from '../../shared/confirm-answer/confirm-answer.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import {
  initialNavigationState,
  reducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { By } from '@angular/platform-browser';
import { NavigationCompleteSectionAction } from '../../shared/ngrx/actions/navigation.action';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';

describe('QuestionsIncomeOtherIncomeComponent', () => {
  let component: QuestionsIncomeOtherIncomeComponent;
  let fixture: ComponentFixture<QuestionsIncomeOtherIncomeComponent>;
  let activatedRoute;
  let router;
  let store;
  let sectionId;

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
        QuestionsIncomeOtherIncomeComponent,
        QuestionsProgressPillsComponent,
        ActionBtnGroupComponent,
        InputGroupDirective,
        AccessibleAttributesDirective,
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
        sectionId = 10
        return Observable.of(sectionId);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeOtherIncomeComponent);
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

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          noOtherIncome: true,
          hasIncomes: true
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the navigation section as complete', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new NavigationCompleteSectionAction(
        sectionId
      ));
    });
  });

  describe('the component form', () => {
    it('should have the noOtherIncome control with no default value', () => {
      expect(component.form.controls['noOtherIncome']).toBeDefined();
      expect(component.form.controls['noOtherIncome'].value).toEqual(null);
    });

    it('should have the hasIncomes control with no default value', () => {
      expect(component.form.controls['hasIncomes']).toBeDefined();
      expect(component.form.controls['hasIncomes'].value).toEqual(false);
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #noOtherIncome input to the noOtherIncome control', () => {
      const input = fixture.debugElement.query(By.css('#no-other-income')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['noOtherIncome'].value).toEqual(true);
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
