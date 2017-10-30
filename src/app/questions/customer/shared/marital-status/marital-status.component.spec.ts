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

import { QuestionsCustomerMaritalStatusComponent } from './marital-status.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../ngrx/reducers/index.reducer';
import { MaritalStatusUpdateAction } from '../ngrx/actions/marital-status/marital-status.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsCustomerMaritalStatusComponent', () => {
  let component: QuestionsCustomerMaritalStatusComponent;
  let fixture: ComponentFixture<QuestionsCustomerMaritalStatusComponent>;
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
          customer: combineReducers(reducers)
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
        QuestionsCustomerMaritalStatusComponent,
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
              routerLink: '/new-customer/address-information'
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
    fixture = TestBed.createComponent(QuestionsCustomerMaritalStatusComponent);
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
    it('should have the marital-status control with no default value', () => {
      expect(component.form.controls['maritalStatus']).toBeDefined();
      expect(component.form.controls['maritalStatus'].value).toEqual(null);
    });

    it('should require the maritalStatus control', () => {
      component.form.controls['maritalStatus'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['maritalStatus'].setValue('marital-status');
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new MaritalStatusUpdateAction('married'));
        component.ngOnInit();
      });

      it('should set the value of the control to the store data OnInit', () => {
        expect(component.form.controls['maritalStatus'].value).toEqual('married');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new MaritalStatusUpdateAction('divorced'));
        expect(component.form.controls['maritalStatus'].value).toEqual('married');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          maritalStatus: 'maritalStatus'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new MaritalStatusUpdateAction(
        component.form.value.maritalStatus
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #marital-status input to the maritalStatus control', () => {
      let input = fixture.debugElement.query(By.css('#married')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['maritalStatus'].value).toEqual('married');

      input = fixture.debugElement.query(By.css('#separated')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['maritalStatus'].value).toEqual('separated');

      input = fixture.debugElement.query(By.css('#unmarried')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['maritalStatus'].value).toEqual('unmarried');
    });

    it('should show required error when submit is pressed', () => {
      const fieldset = fixture.debugElement.query(By.css('fieldset')).nativeElement;
      expect(fieldset.classList).not.toContain('error');
      expect(fixture.debugElement.query(By.css('fieldset.error span.error-text'))).toBeFalsy();

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(fieldset.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('fieldset.error span.error-text'))).toBeTruthy();
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
