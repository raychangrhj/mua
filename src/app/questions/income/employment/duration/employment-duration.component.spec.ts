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

import { QuestionsIncomeEmploymentDurationComponent } from './employment-duration.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { reducers } from '../../ngrx/reducers/index.reducer';
import {
  TempEmploymentCompanyNameUpdateAction,
  TempEmploymentDatesUpdateAction
} from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';
import { EmploymentStateObject } from '../../ngrx/reducers/employment/employement.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeEmploymentDurationComponent', () => {
  let component: QuestionsIncomeEmploymentDurationComponent;
  let fixture: ComponentFixture<QuestionsIncomeEmploymentDurationComponent>;
  let activatedRoute;
  let router;
  let store;
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
        QuestionsIncomeEmploymentDurationComponent,
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
    store.dispatch(new TempEmploymentCompanyNameUpdateAction('Company Name'));
    spyOn(store, 'dispatch').and.callThrough();

    currentEmployment$ = Observable.of(undefined);

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
      if (filter({currentEmployment: true})) {
        return currentEmployment$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeEmploymentDurationComponent);
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

  it('should store an observable of the company name from the temporary company state', () => {
    store.dispatch(new TempEmploymentCompanyNameUpdateAction('company'));
    component.ngOnInit();

    component.companyName$.subscribe(data => {
      expect(data).toEqual('company');
    });
  });

  it('should set isCurrentEmployment to true if Employment dates endDate is set to current', () => {
    store.dispatch(new TempEmploymentDatesUpdateAction({
      startDate: null,
      endDate: 'current'
    }));
    component.ngOnInit();

    expect(component.isCurrentEmployment).toEqual(true);
  });

  it('should set isCurrentEmployment to false if endDate is not current', () => {
    expect(component.isCurrentEmployment).toEqual(false);
  });

  describe('the component form', () => {
    it('should have the startDate control with no default value', () => {
      expect(component.form.controls['startDate']).toBeDefined();
      expect(component.form.controls['startDate'].value).toEqual(null);
    });

    it('should require the startDate control', () => {
      component.form.controls['startDate'].setValue(null);
      expect(component.form.controls['startDate'].valid).toBeFalsy();

      component.form.controls['startDate'].setValue('10/2010');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
    });

    it('should have the endDate control with no default value', () => {
      expect(component.form.controls['endDate']).toBeDefined();
      expect(component.form.controls['endDate'].value).toEqual(null);
    });

    it('should require the startDate control be a date formatted MM/YYYY', () => {
      component.form.controls['startDate'].setValue(null);
      expect(component.form.controls['startDate'].valid).toBeFalsy();

      component.form.controls['startDate'].setValue('something');
      expect(component.form.controls['startDate'].valid).toBeFalsy();
      component.form.controls['startDate'].setValue('2010-10-10');
      expect(component.form.controls['startDate'].valid).toBeFalsy();
      component.form.controls['startDate'].setValue('10-2010');
      expect(component.form.controls['startDate'].valid).toBeFalsy();
      component.form.controls['startDate'].setValue('13/2010');
      expect(component.form.controls['startDate'].valid).toBeFalsy();
      component.form.controls['startDate'].setValue('00/2010');
      expect(component.form.controls['startDate'].valid).toBeFalsy();

      component.form.controls['startDate'].setValue('01/2010');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
      component.form.controls['startDate'].setValue('02/2010');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
      component.form.controls['startDate'].setValue('02/1901');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
      component.form.controls['startDate'].setValue('2/1901');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
      component.form.controls['startDate'].setValue('12/1900');
      expect(component.form.controls['startDate'].valid).toBeTruthy();
    });

    it('should require the endDate control', () => {
      component.form.controls['endDate'].setValue(null);
      expect(component.form.controls['endDate'].valid).toBeFalsy();

      component.form.controls['endDate'].setValue('10/2010');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
    });

    it('should require the endDate control be a date formatted MM/YYYY', () => {
      component.form.controls['endDate'].setValue(null);
      expect(component.form.controls['endDate'].valid).toBeFalsy();

      component.form.controls['endDate'].setValue('something');
      expect(component.form.controls['endDate'].valid).toBeFalsy();
      component.form.controls['endDate'].setValue('2010-10-10');
      expect(component.form.controls['endDate'].valid).toBeFalsy();
      component.form.controls['endDate'].setValue('10-2010');
      expect(component.form.controls['endDate'].valid).toBeFalsy();
      component.form.controls['endDate'].setValue('13/2010');
      expect(component.form.controls['endDate'].valid).toBeFalsy();
      component.form.controls['endDate'].setValue('00/2010');
      expect(component.form.controls['endDate'].valid).toBeFalsy();

      component.form.controls['endDate'].setValue('01/2010');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
      component.form.controls['endDate'].setValue('02/2010');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
      component.form.controls['endDate'].setValue('02/1901');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
      component.form.controls['endDate'].setValue('2/1901');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
      component.form.controls['endDate'].setValue('12/1900');
      expect(component.form.controls['endDate'].valid).toBeTruthy();
    });


    describe('with previous data in the store', () => {
      describe('(coming from the tempEmployment)', () => {
        it('should set the value of the control the data from the resolve', () => {
          store.dispatch(new TempEmploymentDatesUpdateAction({
            startDate: 'startDate',
            endDate: 'endDate'
          }));
          component.ngOnInit();
          expect(component.form.controls['startDate'].value).toEqual('startDate');
          expect(component.form.controls['endDate'].value).toEqual('endDate');
        });
      });

      describe('(coming from the currentEmployment)', () => {
        it('should set the value of the control the data from the resolve', () => {
          const currentEmployment = {
            dates: {
              startDate: 'current-startDate',
              endDate: 'current-endDate'
            }
          };
          currentEmployment$ = Observable.of(currentEmployment);
          component.ngOnInit();
          expect(component.form.controls['startDate'].value).toEqual(currentEmployment.dates.startDate);
          expect(component.form.controls['endDate'].value).toEqual(currentEmployment.dates.endDate);
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
            startDate: 'startDate',
            endDate: 'endDate'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given dates', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, {
            dates: component.form.value
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
            startDate: 'startDate',
            endDate: 'endDate'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp employment store with the given dates', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentDatesUpdateAction(component.form.value));
      });
    });
  });

  describe('HTML integration tests', () => {

    it('should display the progress pills and pills startDate', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });

    describe('with endDate not set to current', () => {
      it('should show the correct primary text using tempEmployment', () => {
        const primaryText = fixture.debugElement.query(By.css('.primary-text')).nativeElement.textContent;
        expect(primaryText).toEqual('When did you work at Company Name?');
      });

      it('should show the correct primary text using currentEmployment', () => {
        component.currentEmployment = {
          companyName: 'not_company'
        };
        fixture.detectChanges();
        const primaryText = fixture.debugElement.query(By.css('.primary-text')).nativeElement.textContent;
        expect(primaryText).toEqual('When did you work at not_company?');
      });

      it('should map the #startDate input to the startDate control', () => {
        const input = fixture.debugElement.query(By.css('#start-date')).nativeElement;
        const value = 'startDate';
        input.value = value;
        input.dispatchEvent(new Event('input'));

        expect(component.form.controls['startDate'].value).toEqual(value);
      });

      it('should map the #endDate input to the endDate control', () => {
        const input = fixture.debugElement.query(By.css('#end-date')).nativeElement;
        const value = 'endDate';
        input.value = value;
        input.dispatchEvent(new Event('input'));

        expect(component.form.controls['endDate'].value).toEqual(value);
      });

      it('should show required error when submit is pressed', () => {
        const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
        inputGroups.forEach(inputGroup => {
          expect(inputGroup.nativeElement.classList).not.toContain('error');
        });

        const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
        nextBtn.click();
        fixture.detectChanges();
        inputGroups.forEach(inputGroup => {
          expect(inputGroup.nativeElement.classList).toContain('error');
        });
        expect(fixture.debugElement.queryAll(By.css('.error-required')).length).toEqual(2);
      });
    });

    describe('with endDate set to current', () => {
      beforeEach(() => {
        store.dispatch(new TempEmploymentDatesUpdateAction({
          startDate: null,
          endDate: 'current'
        }));
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should show the correct primary text using TempEmployment', () => {
        const primaryText = fixture.debugElement.query(By.css('.primary-text')).nativeElement.textContent;
        expect(primaryText.trim()).toContain('When did you begin working at Company Name?');
        expect(primaryText.trim()).toContain('Please enter MM/YYYY');
      });

      it('should show the correct primary text using currentEmployment', () => {
        component.currentEmployment = {
          companyName: 'current company name'
        };
        fixture.detectChanges();
        const primaryText = fixture.debugElement.query(By.css('.primary-text')).nativeElement.textContent;
        expect(primaryText.trim()).toContain('When did you begin working at current company name?');
        expect(primaryText.trim()).toContain('Please enter MM/YYYY');
      });

      it('should map the #startDate input to the startDate control', () => {
        const input = fixture.debugElement.query(By.css('#start-date')).nativeElement;
        const value = 'startDate';
        input.value = value;
        input.dispatchEvent(new Event('input'));

        expect(component.form.controls['startDate'].value).toEqual(value);
      });

      it('not have an endDate input', () => {
        const input = fixture.debugElement.query(By.css('#end-date'));

        expect(input).toBeFalsy();
      });

      it('should show required error when submit is pressed', () => {
        const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
        inputGroups.forEach(inputGroup => {
          expect(inputGroup.nativeElement.classList).not.toContain('error');
        });

        const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
        nextBtn.click();
        fixture.detectChanges();
        inputGroups.forEach(inputGroup => {
          expect(inputGroup.nativeElement.classList).toContain('error');
        });
        expect(fixture.debugElement.queryAll(By.css('.error-required')).length).toEqual(1);
      });
    });
  });
});
