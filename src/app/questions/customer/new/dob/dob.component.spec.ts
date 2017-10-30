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
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';

import { QuestionsNewCustomerDOBComponent } from './dob.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { DOBUpdateAction } from '../../shared/ngrx/actions/dob/dob.action';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsNewCustomerDOBComponent', () => {
  let component: QuestionsNewCustomerDOBComponent;
  let fixture: ComponentFixture<QuestionsNewCustomerDOBComponent>;
  let activatedRoute;
  let router;
  let activePillTitle;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          customer: combineReducers(reducers),
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
        QuestionsNewCustomerDOBComponent,
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
              routerLink: '/new-customer/email'
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
    fixture = TestBed.createComponent(QuestionsNewCustomerDOBComponent);
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
    it('should have a dob control defaulted to null', () => {
      expect(component.form.controls['dob']).toBeDefined();
      expect(component.form.controls['dob'].value).toEqual(null);
    });

    it('should require the dob control', () => {
      component.form.controls['dob'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['dob'].setValue('2003-03-03');
      expect(component.form.valid).toEqual(true);
    });

    it('should require the dob control be formatted correctly', () => {
      component.form.controls['dob'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['dob'].setValue('date');
      expect(component.form.valid).toEqual(false);

      component.form.controls['dob'].setValue('10-12-2012');
      expect(component.form.valid).toEqual(true);
      component.form.controls['dob'].setValue('01-30-2012');
      expect(component.form.valid).toEqual(true);
      component.form.controls['dob'].setValue('2012-1-30');
      expect(component.form.valid).toEqual(true);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new DOBUpdateAction('2010-10-10'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['dob'].value).toEqual('2010-10-10');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new DOBUpdateAction('2012-12-12'));
        expect(component.form.controls['dob'].value).toEqual('2010-10-10');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          dob: 'dob'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new DOBUpdateAction(
        component.form.value.dob
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #dob input to the dob control', () => {
      const dob = fixture.debugElement.query(By.css('#dob')).nativeElement;
      const value = '2003-03-03';
      dob.value = value;
      dob.dispatchEvent(new Event('input'));

      expect(component.form.controls['dob'].value).toEqual(value);
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

    it('should show formatting error when value is not a date', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#dob')).nativeElement;
      input.value = 'foo';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-date'))).toBeTruthy();
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
