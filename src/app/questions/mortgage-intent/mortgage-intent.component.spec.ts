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
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { QuestionsMortgageIntentComponent } from './mortgage-intent.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import {
  initialNavigationState,
  reducer
} from '../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../shared/ngrx/actions/navigation.action';
import { MortgageTypeUpdateAction } from './shared/ngrx/actions/mortgage-type/mortgage-type.action';
import { AccessibleAttributesDirective } from '../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../shared/inputs/input-group.directive';
import { reducers as mortgageIntentReducers } from './shared/ngrx/reducers/index.reducer';

describe('QuestionsMortgageIntentComponent', () => {
  let component: QuestionsMortgageIntentComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentComponent>;
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
          mortgageIntent: combineReducers(mortgageIntentReducers),
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
        QuestionsMortgageIntentComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute, Store], (_router_, _activatedRoute_, _store_) => {
    store = _store_;
    const section = Object.assign({}, initialNavigationState.sections[1]);
    section.active = true;
    store.dispatch(new NavigationActivateSectionAction(
      section.id
    ));
    spyOn(store, 'dispatch').and.callThrough();

    router = _router_;
    spyOn(router, 'navigate');

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/new-customer/confirm'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentComponent);
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
    it('should have a loan type defined', () => {
      expect(component.form.controls['loanType']).toBeDefined();
    });

    it('should not default the loanType', () => {
      expect(component.form.controls['loanType'].value).toEqual(null);
    });

    it('should require loanType', () => {
      component.form.controls['loanType'].setValue(null);
      expect(component.form.valid).toBeFalsy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new MortgageTypeUpdateAction('buy'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['loanType'].value).toEqual('buy');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new MortgageTypeUpdateAction('refinance'));
        expect(component.form.controls['loanType'].value).toEqual('buy');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    it('should route the user to the buying page when the mortgage intent is "buy"', () => {
      component.form.controls['loanType'].setValue('buy');
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/buying']);
    });

    it('should route the user to the refinance page when the mortgage intent is not "buy"', () => {
      component.form.controls['loanType'].setValue('refinance');
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/refinance']);
    });

    it('should dispatch a new action to set the mortgage intent', () => {
      component.form.controls['loanType'].setValue('buy');
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new MortgageTypeUpdateAction(
        component.form.controls['loanType'].value
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #buy input to the loanType control', () => {
      let input = fixture.debugElement.query(By.css('#buy')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['loanType'].value).toEqual('buy');

      input = fixture.debugElement.query(By.css('#refinance')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['loanType'].value).toEqual('refinance');
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
      expect(result).toEqual(initialNavigationState.sections[1].title);
    });
  });
});
