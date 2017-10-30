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

import { QuestionsIncomeEmploymentTitleComponent } from './title.component';
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
  TempEmploymentJobTitleUpdateAction
} from '../../ngrx/actions/temp-employment/temp-employment.action';
import { EmploymentUpdateAction } from '../../ngrx/actions/employment/employment.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsIncomeEmploymentTitleComponent', () => {
  let component: QuestionsIncomeEmploymentTitleComponent;
  let fixture: ComponentFixture<QuestionsIncomeEmploymentTitleComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentEmployment$;

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
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeEmploymentTitleComponent,
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
      if (filter({currentEmployment: true})) {
        return currentEmployment$;
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeEmploymentTitleComponent);
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

  describe('the component form', () => {
    it('should have the title control with no default value', () => {
      expect(component.form.controls['title']).toBeDefined();
      expect(component.form.controls['title'].value).toEqual(null);
    });

    it('should require the title control', () => {
      component.form.controls['title'].setValue(null);
      expect(component.form.controls['title'].valid).toBeFalsy();

      component.form.controls['title'].setValue('title');
      expect(component.form.controls['title'].valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      describe('(coming from the tempEmployment)', () => {
        it('should set the value of the control the data from the resolve', () => {
          store.dispatch(new TempEmploymentJobTitleUpdateAction('title'));
          component.ngOnInit();
          expect(component.form.controls['title'].value).toEqual('title');
        });
      });

      describe('(coming from the current employment)', () => {
        it('should set the value of the control the data from the resolve', () => {
          const currentEmployment = {
            title: 'something here'
          };
          currentEmployment$ = Observable.of(currentEmployment);
          component.ngOnInit();
          expect(component.form.controls['title'].value).toEqual('something here');
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
            title: 'title'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given job title', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new EmploymentUpdateAction(
          component.currentEmployment,
          Object.assign({}, component.currentEmployment, component.form.value)
        ));
      });
    });

    describe('without a currentEmployment', () => {
      beforeEach(() => {
        component.currentEmployment = null;
        component.form = ({
          valid: true,
          value: {
            title: 'title'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the temp employment store with the given job title', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempEmploymentJobTitleUpdateAction(component.form.value.title));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should include the company name from temp employment in the title', () => {
      store.dispatch(new TempEmploymentCompanyNameUpdateAction('companyName'));
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual('What do you do at companyName?');
    });

    it('should include the company name from current employment in the title', () => {
      component.currentEmployment = {
        title: 'title',
        companyName: 'some company name'
      };
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.primary-text')).nativeElement;

      expect(header.textContent.trim()).toEqual('What do you do at some company name?');
    });

    it('should map the #employer input to the employer control', () => {
      const input = fixture.debugElement.query(By.css('#title')).nativeElement;
      const value = 'title';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['title'].value).toEqual(value);
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
