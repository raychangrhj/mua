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
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsIncomeEmploymentCompanyNameComponent } from './company-name.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { TempEmploymentCompanyNameUpdateAction } from '../../ngrx/actions/temp-employment/temp-employment.action';
import {
  EmploymentAddAction,
  EmploymentUpdateAction
} from '../../ngrx/actions/employment/employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeEmploymentCompanyNameComponent', () => {
  let component: QuestionsIncomeEmploymentCompanyNameComponent;
  let fixture: ComponentFixture<QuestionsIncomeEmploymentCompanyNameComponent>;
  let activatedRoute;
  let router;
  let store;
  let activatedRouteParams$;
  let currentEmployment$: Observable<EmploymentStateObject>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: reducer,
          income: combineReducers(reducers)
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              parent: 'parent.parent'
            },
            params: {
              subscribe: () => {}
            },
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeEmploymentCompanyNameComponent,
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

    activatedRouteParams$ = Observable.of({
      index: '0'
    });
    spyOn(activatedRouteParams$, 'take').and.callThrough();

    currentEmployment$ = Observable.of(undefined);

    activatedRoute = _activatedRoute_;
    activatedRoute.params = activatedRouteParams$;
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
      if (filter({currentEmployment: true})) {
        return currentEmployment$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeEmploymentCompanyNameComponent);
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

  it('should not continue to subscribe to the params once isFirstJob is set', () => {
    expect(activatedRouteParams$.take).toHaveBeenCalledWith(1);
  });

  it('should set isFirstJob to true if params.index of the activatedRoute is 0', () => {
    expect(component.isFirstJob).toEqual(true);
  });

  it('should set isFirstJob to false if params.index of the activatedRoute is not 0', () => {
    activatedRouteParams$ = Observable.of({
      index: '1'
    });
    activatedRoute.params = activatedRouteParams$;
    component.ngOnInit();

    expect(component.isFirstJob).toEqual(false);
  });

  it('should set isFirstJob to true if there is no params.index and there are no jobs in the employments array', () => {
    activatedRouteParams$ = Observable.of({});
    activatedRoute.params = activatedRouteParams$;
    component.ngOnInit();

    expect(component.isFirstJob).toEqual(true);
  });

  it('should set isFirstJob to false if there is no params.index and there is a job in the employments array', () => {
    activatedRouteParams$ = Observable.of({});
    activatedRoute.params = activatedRouteParams$;
    store.dispatch(new EmploymentAddAction({
      companyName: 'company',
      dates: {
        startDate: null,
        endDate: 'current'
      }
    }));
    component.ngOnInit();

    expect(component.isFirstJob).toEqual(false);
  });

  describe('the component form', () => {
    it('should have the employer control with no default value', () => {
      expect(component.form.controls['employer']).toBeDefined();
      expect(component.form.controls['employer'].value).toEqual(null);
    });

    it('should require the employer control', () => {
      component.form.controls['employer'].setValue(null);
      expect(component.form.controls['employer'].valid).toBeFalsy();

      component.form.controls['employer'].setValue('employer');
      expect(component.form.controls['employer'].valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      describe('(coming from the tempEmployment)', () => {
        it('should set the value of the control the data from the tempEmployment', () => {
          store.dispatch(new TempEmploymentCompanyNameUpdateAction('companyName'));
          component.ngOnInit();
          expect(component.form.controls['employer'].value).toEqual('companyName');
        });
      });

      describe('(coming from currentEmployment)', () => {
        it('should set the value of the control the data from the resolve', () => {
          currentEmployment$ = Observable.of({
            companyName: 'company name',
            dates: {
              startDate: 'startDate',
              endDate: 'endDate'
            },
            income: 1000,
            title: 'title',
            location: {
              street: 'street',
              unit: 'unit',
              state: 'state',
              city: 'city',
              zip: 'zip'
            }
          });
          component.ngOnInit();
          expect(component.form.controls['employer'].value).toEqual('company name');
        });
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            employer: 'employer'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given company name', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, {
            companyName: 'employer'
          }))
        );
      });
    });

    describe('without a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = null;
        component.form = ({
          valid: true,
          value: {
            employer: 'employer'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp employment store with the given company name', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentCompanyNameUpdateAction('employer'));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should have the header "Where do you work" when this is the first job entry', () => {
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual('Where do you work?');
    });

    it('should have the header "Where else do you work" when this is not the first job entry', () => {
      activatedRouteParams$ = Observable.of({
        index: '1'
      });
      activatedRoute.params = activatedRouteParams$;
      store.dispatch(new EmploymentAddAction({
        companyName: 'some other company'
      }));
      component.ngOnInit();
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual('Where else do you work?');
    });

    it('should map the #employer input to the employer control', () => {
      const input = fixture.debugElement.query(By.css('#employer')).nativeElement;
      const value = 'employer';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['employer'].value).toEqual(value);
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
