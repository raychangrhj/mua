import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsMortgageIntentRefinanceAppraisalComponent } from './appraisal.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AppraisalUpdateAction } from '../ngrx/actions/appraisal/appraisal.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsMortgageIntentRefinanceAppraisalComponent', () => {
  let component: QuestionsMortgageIntentRefinanceAppraisalComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentRefinanceAppraisalComponent>;
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
        QuestionsMortgageIntentRefinanceAppraisalComponent,
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
              routerLink: '/mortgage-intent/refinance/owe'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentRefinanceAppraisalComponent);
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
    it('should have an appraisal control defaulted to null', () => {
      expect(component.form.controls['appraisal']).toBeDefined();
      expect(component.form.controls['appraisal'].value).toEqual(null);
    });

    it('should require the appraisal control', () => {
      component.form.controls['appraisal'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['appraisal'].setValue(50000);
      expect(component.form.valid).toEqual(true);
    });

    it('should require the appraisal control is a number/currency', () => {
      component.form.controls['appraisal'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['appraisal'].setValue('nope');
      expect(component.form.valid).toEqual(false);

      component.form.controls['appraisal'].setValue('500');
      expect(component.form.valid).toEqual(true);

      component.form.controls['appraisal'].setValue('$500');
      expect(component.form.valid).toEqual(true);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new AppraisalUpdateAction(200));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['appraisal'].value).toEqual(200);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new AppraisalUpdateAction(40000));
        expect(component.form.controls['appraisal'].value).toEqual(200);
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          appraisal: '$5,000'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store removing the "$" and ","', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new AppraisalUpdateAction(5000));
    });

    it('should dispatch an event to update the store even if the value is a number', () => {
      component.form = ({
        valid: true,
        value: {
          appraisal: 5000
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new AppraisalUpdateAction(5000));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #appraisal input to the appraisal control', () => {
      const appraisal = fixture.debugElement.query(By.css('#appraisal')).nativeElement;
      const value = 600;
      appraisal.value = value;
      appraisal.dispatchEvent(new Event('input'));

      expect(component.form.controls['appraisal'].value).toEqual(value + '');
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

    it('should show formatting error when value is not a ssn', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#appraisal')).nativeElement;
      input.value = 'not-a-number';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
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
