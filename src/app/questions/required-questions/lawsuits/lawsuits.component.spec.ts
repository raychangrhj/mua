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

import { QuestionsRequiredQuestionsLawsuitsComponent } from './lawsuits.component';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducer as govReducer } from '../ngrx/reducers/government-questions.reducer';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { GovernmentQuestionsLawsuitsUpdateAction } from '../ngrx/actions/government-questions.action';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsRequiredQuestionsLawsuitsComponent', () => {
  let component: QuestionsRequiredQuestionsLawsuitsComponent;
  let fixture: ComponentFixture<QuestionsRequiredQuestionsLawsuitsComponent>;
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
        QuestionsRequiredQuestionsLawsuitsComponent,
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
    fixture = TestBed.createComponent(QuestionsRequiredQuestionsLawsuitsComponent);
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
    it('should have the lawsuits control with no default value', () => {
      expect(component.form.controls['lawsuits']).toBeDefined();
      expect(component.form.controls['lawsuits'].value).toEqual(null);
    });

    it('should require the lawsuits control', () => {
      component.form.controls['lawsuits'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['lawsuits'].setValue('lawsuits');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      it('should set the value of the control to "yes" if the store is true OnInit', () => {
        store.dispatch(new GovernmentQuestionsLawsuitsUpdateAction(true));
        component.ngOnInit();
        expect(component.form.controls['lawsuits'].value).toEqual('yes');
      });

      it('should set the value of the control to "no" if the store is false OnInit', () => {
        store.dispatch(new GovernmentQuestionsLawsuitsUpdateAction(false));
        component.ngOnInit();
        expect(component.form.controls['lawsuits'].value).toEqual('no');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new GovernmentQuestionsLawsuitsUpdateAction(true));
        component.ngOnInit();
        store.dispatch(new GovernmentQuestionsLawsuitsUpdateAction(false));
        expect(component.form.controls['lawsuits'].value).toEqual('yes');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          lawsuits: 'yes'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store sending in a true when lawsuits is yes', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsLawsuitsUpdateAction(
        true
      ));
    });

    it('should dispatch an event to update the store sending in a false when lawsuits is no', () => {
      store.dispatch.calls.reset();
      component.form = ({
        valid: true,
        value: {
          lawsuits: 'no'
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsLawsuitsUpdateAction(
        false
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #yes input to the lawsuits control', () => {
      const input = fixture.debugElement.query(By.css('#yes')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['lawsuits'].value).toEqual('yes');
    });

    it('should map the #no input to the lawsuits control', () => {
      const input = fixture.debugElement.query(By.css('#no')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['lawsuits'].value).toEqual('no');
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
