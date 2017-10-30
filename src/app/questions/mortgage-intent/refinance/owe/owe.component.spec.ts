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
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionsMortgageIntentRefinanceOweComponent } from './owe.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { OwedUpdateAction } from '../ngrx/actions/owed/owed.action';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsMortgageIntentRefinanceOweComponent', () => {
  let component: QuestionsMortgageIntentRefinanceOweComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentRefinanceOweComponent>;
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
        QuestionsMortgageIntentRefinanceOweComponent,
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
              routerLink: '/mortgage-intent/refinance/location'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentRefinanceOweComponent);
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
      expect(component.form.controls['owe']).toBeDefined();
      expect(component.form.controls['owe'].value).toEqual(null);
    });

    it('should require the owe control', () => {
      component.form.controls['owe'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['owe'].setValue('50');
      expect(component.form.valid).toEqual(true);
    });

    it('should require the owe control to be a number/currency', () => {
      component.form.controls['owe'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['owe'].setValue('100');
      expect(component.form.valid).toEqual(true);

      component.form.controls['owe'].setValue('$100');
      expect(component.form.valid).toEqual(true);

      component.form.controls['owe'].setValue('$100.00');
      expect(component.form.valid).toEqual(true);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new OwedUpdateAction(10000));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['owe'].value).toEqual(10000);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new OwedUpdateAction(20000));
        expect(component.form.controls['owe'].value).toEqual(10000);
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          owe: '50000'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new OwedUpdateAction(
        parseInt(component.form.value.owe, 10)
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #owe input to the owe control', () => {
      const intent = fixture.debugElement.query(By.css('#owe')).nativeElement;
      const value = 10000;
      intent.value = value;
      intent.dispatchEvent(new Event('input'));

      expect(component.form.controls['owe'].value).toEqual(value + '');
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

    it('should show formatting error when value is not a number/currency', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#owe')).nativeElement;
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
