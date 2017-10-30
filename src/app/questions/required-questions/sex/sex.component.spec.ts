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

import { QuestionsRequiredQuestionsSexComponent } from './sex.component';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducer as govReducer } from '../ngrx/reducers/government-questions.reducer';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { GovernmentQuestionsSexUpdateAction } from '../ngrx/actions/government-questions.action';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsRequiredQuestionsSexComponent', () => {
  let component: QuestionsRequiredQuestionsSexComponent;
  let fixture: ComponentFixture<QuestionsRequiredQuestionsSexComponent>;
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
          navigation: navReducer,
          governmentQuestions: govReducer
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
        QuestionsRequiredQuestionsSexComponent,
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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRequiredQuestionsSexComponent);
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
    it('should have the female control with no default value', () => {
      expect(component.form.controls['female']).toBeDefined();
      expect(component.form.controls['female'].value).toEqual(null);
    });

    it('should have the male control with no default value', () => {
      expect(component.form.controls['male']).toBeDefined();
      expect(component.form.controls['male'].value).toEqual(null);
    });

    it('should have the optOut control with no default value', () => {
      expect(component.form.controls['optOut']).toBeDefined();
      expect(component.form.controls['optOut'].value).toEqual(null);
    });

    it('should require the optOut control', () => {
      component.form.controls['optOut'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['optOut'].setValue(true);
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      it('should set the values of the form from the store during OnInit', () => {
        store.dispatch(new GovernmentQuestionsSexUpdateAction({
          male: true,
          female: true,
          optOut: true
        }));
        component.ngOnInit();
        expect(component.form.controls['male'].value).toEqual(true);
        expect(component.form.controls['female'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new GovernmentQuestionsSexUpdateAction({
          male: true,
          female: true,
          optOut: true
        }));
        component.ngOnInit();
        store.dispatch(new GovernmentQuestionsSexUpdateAction({
          male: false,
          female: false,
          optOut: false
        }));
        expect(component.form.controls['male'].value).toEqual(true);
        expect(component.form.controls['female'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });
    });
  });

  it('should unsubscribe from the valueChanges once the component is destroyed', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    spyOn(component.form.controls['male'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['female'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['optOut'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });

    component.ngOnInit();
    expect(component.form.controls['male'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['female'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['optOut'].valueChanges.subscribe).not.toHaveBeenCalled();

    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(2);
  });

  it('should have a method to remove the required validator on optOut when any other option is selected', () => {
    component.form.controls['optOut'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['male'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['male'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['female'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['female'].setValue(null);
    expect(component.form.valid).toBeFalsy();
  });

  it('should have the optOutChange method', () => {
    expect(component.optOutChange).toEqual(jasmine.any(Function));
  });

  describe('optOutChange', () => {
    beforeEach(() => {
      component.form.controls['female'].setValue('something');
      component.form.controls['male'].setValue('something');
    });

    it('should disable and clear all the other inputs when the user opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      expect(component.form.controls['female'].value).toEqual(null);
      expect(component.form.controls['female'].disabled).toEqual(true);

      expect(component.form.controls['male'].value).toEqual(null);
      expect(component.form.controls['male'].disabled).toEqual(true);
    });

    it('should re-enable all the other inputs when the user deselects opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      component.form.controls['optOut'].setValue(false);
      component.optOutChange();

      expect(component.form.controls['female'].disabled).toEqual(false);
      expect(component.form.controls['male'].disabled).toEqual(false);
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          female: 'female',
          male: 'male',
          optOut: 'optOut'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsSexUpdateAction(component.form.value));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #female input to the female control', () => {
      const input = fixture.debugElement.query(By.css('#female')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['female'].value).toEqual(true);
    });

    it('should map the #male input to the male control', () => {
      const input = fixture.debugElement.query(By.css('#male')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['male'].value).toEqual(true);
    });

    it('should map the #optOut input to the optOut control', () => {
      const input = fixture.debugElement.query(By.css('#optOut')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['optOut'].value).toEqual(true);
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

    it('should uncheck and disable all inputs when the opt out option is checked', () => {
      const female = fixture.debugElement.query(By.css('#female')).nativeElement;
      female.checked = true;
      female.dispatchEvent(new Event('change'));
      const male = fixture.debugElement.query(By.css('#male')).nativeElement;
      male.checked = true;
      male.dispatchEvent(new Event('change'));

      const optOut = fixture.debugElement.query(By.css('#optOut')).nativeElement;
      optOut.checked = true;
      optOut.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(female.checked).toEqual(false);
      expect(female.disabled).toEqual(true);

      expect(male.checked).toEqual(false);
      expect(male.disabled).toEqual(true);
    });
  });
});
