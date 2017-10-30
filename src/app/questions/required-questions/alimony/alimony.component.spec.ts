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
import { By } from '@angular/platform-browser';

import { QuestionsRequiredQuestionsAlimonyComponent } from './alimony.component';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducer as govReducer } from '../ngrx/reducers/government-questions.reducer';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { GovernmentQuestionsAlimonyUpdateAction } from '../ngrx/actions/government-questions.action';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsRequiredQuestionsAlimonyComponent', () => {
  let component: QuestionsRequiredQuestionsAlimonyComponent;
  let fixture: ComponentFixture<QuestionsRequiredQuestionsAlimonyComponent>;
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
        QuestionsRequiredQuestionsAlimonyComponent,
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
    fixture = TestBed.createComponent(QuestionsRequiredQuestionsAlimonyComponent);
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
    it('should have the alimony control with no default value', () => {
      expect(component.form.controls['alimony']).toBeDefined();
      expect(component.form.controls['alimony'].value).toEqual(null);
    });

    it('should require the alimony control', () => {
      component.form.controls['alimony'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['alimony'].setValue('alimony');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      it('should set the value of the control to "yes" if the store is true OnInit', () => {
        store.dispatch(new GovernmentQuestionsAlimonyUpdateAction(true));
        component.ngOnInit();
        expect(component.form.controls['alimony'].value).toEqual('yes');
      });

      it('should set the value of the control to "no" if the store is false OnInit', () => {
        store.dispatch(new GovernmentQuestionsAlimonyUpdateAction(false));
        component.ngOnInit();
        expect(component.form.controls['alimony'].value).toEqual('no');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new GovernmentQuestionsAlimonyUpdateAction(true));
        component.ngOnInit();
        store.dispatch(new GovernmentQuestionsAlimonyUpdateAction(false));
        expect(component.form.controls['alimony'].value).toEqual('yes');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          alimony: 'yes'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store sending in a true when alimony is yes', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsAlimonyUpdateAction(
        true
      ));
    });

    it('should dispatch an event to update the store sending in a false when alimony is no', () => {
      store.dispatch.calls.reset();
      component.form = ({
        valid: true,
        value: {
          alimony: 'no'
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsAlimonyUpdateAction(
        false
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #yes input to the alimony control', () => {
      const input = fixture.debugElement.query(By.css('#yes')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['alimony'].value).toEqual('yes');
    });

    it('should map the #no input to the alimony control', () => {
      const input = fixture.debugElement.query(By.css('#no')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['alimony'].value).toEqual('no');
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
