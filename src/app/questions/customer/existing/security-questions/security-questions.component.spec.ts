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
import 'rxjs/add/operator/take';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { QuestionsExistingCustomerSecurityQuestionsComponent } from './security-questions.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { reducer as authReducer } from '../ngrx/reducers/authentication.reducer';
import {
  AuthenticationAnswerSubmitAction,
  AuthenticationQuestionUpdateAction
} from '../ngrx/actions/authentication.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsExistingCustomerSecurityQuestionsComponent', () => {
  let component: QuestionsExistingCustomerSecurityQuestionsComponent;
  let fixture: ComponentFixture<QuestionsExistingCustomerSecurityQuestionsComponent>;
  let activatedRoute;
  let router;
  let store;
  let questionState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: navReducer,
          authentication: authReducer,
          customer: combineReducers(reducers)
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
            queryParams: jasmine.createSpyObj('activatedRoute.queryParams', ['take'])
          }
        }
      ],
      declarations: [
        QuestionsExistingCustomerSecurityQuestionsComponent,
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

    questionState = {
      description: 'This is the question?',
      id: '2525',
      questionId: '54555555',
      sessionId: '5555',
      version: '11',
      email: 'this@that.com'
    };
    store = _store_;
    store.dispatch(new AuthenticationQuestionUpdateAction(questionState));
    spyOn(store, 'dispatch').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({actionBtnGroupLinkOptions: true})) {
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
    fixture = TestBed.createComponent(QuestionsExistingCustomerSecurityQuestionsComponent);
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

  it('should get the questionState from the auth store', () => {
    expect(component.questionState).toEqual(questionState);
  });

  it('should only get the questionState once', () => {
    const newQuestionState = Object.assign({}, questionState, {
      id: 'new-id',
      sessionId: 'new-session-id'
    });
    store.dispatch(new AuthenticationQuestionUpdateAction(newQuestionState));
    expect(component.questionState).toEqual(questionState);
  });

  describe('component form', () => {
    it('should have a control for the security question defaulted to null', () => {
      expect(component.form.controls['answer']).toBeDefined();
      expect(component.form.controls['answer'].value).toEqual(null);
    });

    it('should require the security question for the form to be valid', () => {
      component.form.controls['answer'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['answer'].setValue('security question');
      expect(component.form.valid).toEqual(true);
    });
  });

  describe('setting up onSubmitMethod', () => {
    it('should dispatch the AuthenticationAnswerSubmit Action', () => {
      component.form = ({
        valid: true,
        value: {
          answer: 'answer'
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new AuthenticationAnswerSubmitAction({
        answer: 'answer',
        questionId: questionState.questionId,
        id: questionState.id,
        sessionId: questionState.sessionId,
        version: questionState.version,
        email: questionState.email
      }));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #security-questions input to the securityQuestion control', () => {
      const answer = fixture.debugElement.query(By.css('#answer')).nativeElement;
      const value = '1234123412341234';
      answer.value = value;
      answer.dispatchEvent(new Event('input'));

      expect(component.form.controls['answer'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const answerInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(answerInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(answerInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should use the description from the activatedRoute query params as the question', () => {
      const label = fixture.debugElement.query(By.css('label[for="answer"]')).nativeElement;
      expect(label.textContent).toEqual(questionState.description);
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
