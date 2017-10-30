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
import { RouterTestingModule } from '@angular/router/testing';
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

import { QuestionsNewCustomerEmailComponent } from './email.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { EmailUpdateAction } from '../../shared/ngrx/actions/email/email.action';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsNewCustomerEmailComponent', () => {
  let component: QuestionsNewCustomerEmailComponent;
  let fixture: ComponentFixture<QuestionsNewCustomerEmailComponent>;
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
        QuestionsNewCustomerEmailComponent,
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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsNewCustomerEmailComponent);
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
    it('should have the email control with no default value', () => {
      expect(component.form.controls['email']).toBeDefined();
      expect(component.form.controls['email'].value).toEqual(null);
    });

    it('should require the email control', () => {
      component.form.controls['email'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['email'].setValue('calvin@cox.com');
      expect(component.form.valid).toBeTruthy();
    });

    it('should require the email control be a valid email', () => {
      component.form.controls['email'].setValue('something');
      expect(component.form.valid).toBeFalsy();

      component.form.controls['email'].setValue('calvin@cox.com');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new EmailUpdateAction('calvin@cox.com'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['email'].value).toEqual('calvin@cox.com');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new EmailUpdateAction('not_calvin@cox.com'));
        expect(component.form.controls['email'].value).toEqual('calvin@cox.com');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          email: 'email'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new EmailUpdateAction(
        component.form.value.email
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #email input to the email control', () => {
      const email = fixture.debugElement.query(By.css('#email')).nativeElement;
      const value = 'calvin@cox.com';
      email.value = value;
      email.dispatchEvent(new Event('input'));

      expect(component.form.controls['email'].value).toEqual(value);
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

    it('should show formatting error when value is not an email', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#email')).nativeElement;
      input.value = 'not-a-email';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-email'))).toBeTruthy();
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
