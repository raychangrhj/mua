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

import { QuestionsNewCustomerNameComponent } from './name.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { NameUpdateAction } from '../../shared/ngrx/actions/name/name.action';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { KeysToArrayPipe } from '../../../../shared/keys-to-array.pipe';

describe('QuestionsNewCustomerNameComponent', () => {
  let component: QuestionsNewCustomerNameComponent;
  let fixture: ComponentFixture<QuestionsNewCustomerNameComponent>;
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
        QuestionsNewCustomerNameComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent,
        KeysToArrayPipe
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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsNewCustomerNameComponent);
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
    it('should have the first name control with no default value', () => {
      expect(component.form.controls['first']).toBeDefined();
      expect(component.form.controls['first'].value).toEqual(null);
    });

    it('should require the first control', () => {
      component.form.controls['first'].setValue(null);
      expect(component.form.controls['first'].valid).toBeFalsy();

      component.form.controls['first'].setValue('first');
      expect(component.form.controls['first'].valid).toBeTruthy();
    });

    it('should have the middle name control with no default value', () => {
      expect(component.form.controls['middle']).toBeDefined();
      expect(component.form.controls['middle'].value).toEqual(null);
    });

    it('should not require the middle control', () => {
      component.form.controls['middle'].setValue(null);
      expect(component.form.controls['middle'].valid).toBeTruthy();
    });

    it('should have the last name control with no default value', () => {
      expect(component.form.controls['last']).toBeDefined();
      expect(component.form.controls['last'].value).toEqual(null);
    });

    it('should require the last control', () => {
      component.form.controls['last'].setValue(null);
      expect(component.form.controls['last'].valid).toBeFalsy();

      component.form.controls['last'].setValue('last');
      expect(component.form.controls['last'].valid).toBeTruthy();
    });

    it('should have the suffix control with no default value', () => {
      expect(component.form.controls['suffix']).toBeDefined();
      expect(component.form.controls['suffix'].value).toEqual(null);
    });

    it('should not require the suffix control', () => {
      component.form.controls['suffix'].setValue(null);
      expect(component.form.controls['suffix'].valid).toBeTruthy();
    });

    it('should not update form controls if their is no data in the store', () => {
      store.dispatch(new NameUpdateAction({
        first: null,
        last: null
      }));
      component.ngOnInit();

      expect(component.form.controls['first'].value).toEqual(null);
      expect(component.form.controls['last'].value).toEqual(null);
      expect(component.form.controls['middle'].value).toEqual(null);
      expect(component.form.controls['suffix'].value).toEqual(null);
    });

    describe('with previous data in the store', () => {
      beforeEach(() => {
        store.dispatch(new NameUpdateAction({
          first: 'first',
          middle: 'middle',
          last: 'last',
          suffix: 'suffix'
        }));
        component.ngOnInit();
      });

      it('should set the value of the controls to the store data OnInit', () => {
        expect(component.form.controls['first'].value).toEqual('first');
        expect(component.form.controls['last'].value).toEqual('last');
        expect(component.form.controls['middle'].value).toEqual('middle');
        expect(component.form.controls['suffix'].value).toEqual('suffix');
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new NameUpdateAction({
          first: 'nope',
          last: 'nothing'
        }));
        expect(component.form.controls['first'].value).toEqual('first');
        expect(component.form.controls['last'].value).toEqual('last');
        expect(component.form.controls['middle'].value).toEqual('middle');
        expect(component.form.controls['suffix'].value).toEqual('suffix');
      });
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          name: 'name'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new NameUpdateAction(
        component.form.value
      ));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #first-name input to the first control', () => {
      const input = fixture.debugElement.query(By.css('#first-name')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['first'].value).toEqual(value);
    });

    it('should map the #middle-name input to the middle control', () => {
      const input = fixture.debugElement.query(By.css('#middle-name')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['middle'].value).toEqual(value);
    });

    it('should map the #last-name input to the last control', () => {
      const input = fixture.debugElement.query(By.css('#last-name')).nativeElement;
      const value = '1234123412341234';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['last'].value).toEqual(value);
    });

    it('should map the #suffix input to the suffix control', () => {
      const input = fixture.debugElement.query(By.css('#suffix')).nativeElement;
      const value = 'jr';
      input.value = value;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['suffix'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).not.toContain('error');
      });

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      inputGroups.filter(inputGroup => {
        const classList = inputGroup.nativeElement.classList;
        return classList.contains('input-group-first') || classList.contains('input-group-last');
      }).forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).toContain('error');
      });
      expect(fixture.debugElement.queryAll(By.css('.error-required')).length).toEqual(2);
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
