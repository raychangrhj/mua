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

import { QuestionsExistingCustomerLogInComponent } from './log-in.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import {
  AuthenticationAuthenticateAction,
  AuthenticationFailureAction
} from '../ngrx/actions/authentication.action';
import { reducer as authReducer } from '../ngrx/reducers/authentication.reducer';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsExistingCustomerLogInComponent', () => {
  let component: QuestionsExistingCustomerLogInComponent;
  let fixture: ComponentFixture<QuestionsExistingCustomerLogInComponent>;
  let activatedRoute;
  let store;
  let authError;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          customer: combineReducers(reducers),
          authentication: authReducer,
          navigation: navReducer
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
        QuestionsExistingCustomerLogInComponent,
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
    authError = {
      type: 'mismatch',
      description: 'The username and password do not match.'
    };
    store.dispatch(new AuthenticationFailureAction(authError));
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
    fixture = TestBed.createComponent(QuestionsExistingCustomerLogInComponent);
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

  describe('component form', () => {
    it('should have a control for the username which defaults to null', () => {
      expect(component.form.controls['username']).toBeDefined();
      expect(component.form.controls['username'].value).toEqual(null);
    });

    it('should require the username control', () => {
      component.form.controls['username'].setValue(null);
      expect(component.form.controls['username'].valid).toEqual(false);

      component.form.controls['username'].setValue('username');
      expect(component.form.controls['username'].valid).toEqual(true);
    });

    it('should have a control for the password which defaults to null', () => {
      expect(component.form.controls['password']).toBeDefined();
      expect(component.form.controls['password'].value).toEqual(null);
    });

    it('should require the password control', () => {
      component.form.controls['password'].setValue(null);
      expect(component.form.controls['password'].valid).toEqual(false);

      component.form.controls['password'].setValue('password');
      expect(component.form.controls['password'].valid).toEqual(true);
    });
  });

  describe('setting up onSubmitMethod', () => {
    it('should dispatch the Authenticate Action', () => {
      component.form = ({
        valid: true,
        value: {
          username: 'username',
          password: 'password'
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new AuthenticationAuthenticateAction({
        username: component.form.value.username,
        password: component.form.value.password
      }));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #password input to the password control', () => {
      const password = fixture.debugElement.query(By.css('#password')).nativeElement;
      const value = '1234123412341234';
      password.value = value;
      password.dispatchEvent(new Event('input'));

      expect(component.form.controls['password'].value).toEqual(value);
    });

    it('should map the #username input to the username control', () => {
      const username = fixture.debugElement.query(By.css('#username')).nativeElement;
      const value = '1234123412341234';
      username.value = value;
      username.dispatchEvent(new Event('input'));

      expect(component.form.controls['username'].value).toEqual(value);
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

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
