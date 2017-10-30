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
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import {
  StoreModule,
  combineReducers,
  Store
} from '@ngrx/store';

import { QuestionsMortgageIntentPrimaryResidenceComponent } from './primary-residence.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers as mortgageIntentReducers } from '../ngrx/reducers/index.reducer';
import { PrimaryResidenceUpdateAction } from '../ngrx/actions/primary-residence/primary-residence.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { NavigationActivateSectionAction } from '../../../shared/ngrx/actions/navigation.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { MortgageTypeUpdateAction } from '../ngrx/actions/mortgage-type/mortgage-type.action';

describe('QuestionsMortgageIntentPrimaryResidenceComponent', () => {
  let component: QuestionsMortgageIntentPrimaryResidenceComponent;
  let fixture: ComponentFixture<QuestionsMortgageIntentPrimaryResidenceComponent>;
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
          mortgageIntent: combineReducers(mortgageIntentReducers)
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
        QuestionsMortgageIntentPrimaryResidenceComponent,
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
    const section = Object.assign({}, initialNavigationState.sections[1]);
    section.active = true;
    store.dispatch(new NavigationActivateSectionAction(
      section.id
    ));
    store.dispatch(new MortgageTypeUpdateAction('buying'));
    spyOn(store, 'dispatch').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({actionBtnGroupLinkOptions: true})) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/mortgage-intent/buying/confirm-loan-details'
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
    fixture = TestBed.createComponent(QuestionsMortgageIntentPrimaryResidenceComponent);
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
    it('should have a primary residence defined', () => {
      expect(component.form.controls['primaryResidence']).toBeDefined();
    });

    it('should not default primaryResidence', () => {
      expect(component.form.controls['primaryResidence'].value).toEqual(null);
    });

    it('should require primaryResidence', () => {
      component.form.controls['primaryResidence'].setValue(null);
      expect(component.form.valid).toBeFalsy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new PrimaryResidenceUpdateAction(false));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['primaryResidence'].value).toEqual('no');

        store.dispatch(new PrimaryResidenceUpdateAction(true));
        component.ngOnInit();
        expect(component.form.controls['primaryResidence'].value).toEqual('yes');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new PrimaryResidenceUpdateAction(true));
        expect(component.form.controls['primaryResidence'].value).toEqual('no');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form.controls['primaryResidence'].setValue('yes');
    });

    describe('when we are in the buying section, not in edit mode', () => {
      beforeEach(() => {
        // router.url = '/mortgage-intent/buying/primary-residence';
        // component.ngOnInit();
      });

      it('should route the user to the confirm page when the primary residence is "yes"', () => {
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/buying/confirm']);
      });

      it('should route the user to the primary use page when the primary residence is not "yes"', () => {
        component.form.controls['primaryResidence'].setValue('no');
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/buying/primary-use']);
      });

      it('should dispatch an event to update the store', () => {
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new PrimaryResidenceUpdateAction(
          component.form.value.primaryResidence === 'yes'
        ));
      });
    });

    // TODO return to this and test it...
    xdescribe('when we are in the buying section, in edit mode', () => {
      beforeEach(() => {
        // router.url = '/mortgage-intent/buying/primary-residence/edit';
        // component.ngOnInit();
      });

      it('should route the user to the confirm page when the primary residence is "yes"', () => {
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/buying/confirm']);
      });

      it('should route the user to the primary use page when the primary residence is not "yes"', () => {
        component.form.controls['primaryResidence'].setValue('no');
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/buying/primary-use/edit']);
      });

      it('should dispatch an event to update the store', () => {
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new PrimaryResidenceUpdateAction(
          component.form.value.primaryResidence === 'yes'
        ));
      });
    });

    xdescribe('when we are in the refinance section, not in edit mode', () => {
      beforeEach(() => {
        // router.url = '/mortgage-intent/refinance/primary-residence';
        // component.ngOnInit();
      });

      it('should route the user to the confirm page when the primary residence is "yes"', () => {
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/refinance/confirm']);
      });

      it('should route the user to the primary use page when the primary residence is not "yes"', () => {
        component.form.controls['primaryResidence'].setValue('no');
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/refinance/primary-use']);
      });

      it('should dispatch an event to update the store', () => {
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new PrimaryResidenceUpdateAction(
          component.form.value.primaryResidence === 'yes'
        ));
      });
    });

    xdescribe('when we are in the refinance section, in edit mode', () => {
      beforeEach(() => {
        // router.url = '/mortgage-intent/refinance/primary-residence/edit';
        // component.ngOnInit();
      });

      it('should route the user to the confirm page when the primary residence is "yes"', () => {
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/refinance/confirm']);
      });

      it('should route the user to the primary use page when the primary residence is not "yes"', () => {
        component.form.controls['primaryResidence'].setValue('no');
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/mortgage-intent/refinance/primary-use/edit']);
      });

      it('should dispatch an event to update the store', () => {
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new PrimaryResidenceUpdateAction(
          component.form.value.primaryResidence === 'yes'
        ));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #primaryResidence input to the primaryResidence control', () => {
      let input = fixture.debugElement.query(By.css('#yes')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['primaryResidence'].value).toEqual('yes');

      input = fixture.debugElement.query(By.css('#no')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['primaryResidence'].value).toEqual('no');
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
