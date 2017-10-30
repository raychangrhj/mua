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
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsMortgageIntentRefinanceIntentComponent } from './intent.component';
import { IntentUpdateAction } from '../ngrx/actions/intent/intent.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../ngrx/reducers/index.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsMortgageIntentRefinanceIntentComponent', () => {
  let component: QuestionsMortgageIntentRefinanceIntentComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentRefinanceIntentComponent>;
  let router;
  let store;
  let activePillTitle;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          refinance: combineReducers(reducers),
          navigation: reducer
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
        QuestionsMortgageIntentRefinanceIntentComponent,
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

    const navigation = JSON.parse(JSON.stringify(initialNavigationState));
    activePillTitle = navigation.sections.find(section => section.active).title;

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/mortgage-intent'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentRefinanceIntentComponent);
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
    it('should have an intent control defaulted to null', () => {
      expect(component.form.controls['intent']).toBeDefined();
      expect(component.form.controls['intent'].value).toEqual(null);
    });

    it('should require the intent control', () => {
      component.form.controls['intent'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['intent'].setValue('lower-payment');
      expect(component.form.valid).toEqual(true);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new IntentUpdateAction('lower-payment'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['intent'].value).toEqual('lower-payment');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new IntentUpdateAction('2012-12-12'));
        expect(component.form.controls['intent'].value).toEqual('lower-payment');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          intent: 'intent'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new IntentUpdateAction(
        component.form.value.intent
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #lower-payment input to the intent control', () => {
      const intent = fixture.debugElement.query(By.css('#lower-payment')).nativeElement;
      intent.checked = true;
      intent.dispatchEvent(new Event('change'));

      expect(component.form.controls['intent'].value).toEqual('lower-payment');
    });

    it('should map the #pay-off input to the intent control', () => {
      const intent = fixture.debugElement.query(By.css('#pay-off')).nativeElement;
      intent.checked = true;
      intent.dispatchEvent(new Event('change'));

      expect(component.form.controls['intent'].value).toEqual('pay-off');
    });

    it('should map the #cash-out input to the intent control', () => {
      const intent = fixture.debugElement.query(By.css('#cash-out')).nativeElement;
      intent.checked = true;
      intent.dispatchEvent(new Event('change'));

      expect(component.form.controls['intent'].value).toEqual('cash-out');
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
