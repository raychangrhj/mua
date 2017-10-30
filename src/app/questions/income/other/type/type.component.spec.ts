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
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsIncomeOtherIncomeTypeComponent } from './type.component';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import {
  OtherIncomeAddAction,
  OtherIncomeUpdateAction
} from '../../ngrx/actions/other/other.action';
import { TempOtherIncomeTypeUpdateAction } from '../../ngrx/actions/temp-other/temp-other.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { initialOtherIncomeStateObject } from '../../ngrx/reducers/other/other.reducer';
import { KeysToArrayPipe } from '../../../../shared/keys-to-array.pipe';
import { incomeTypes } from '../../../../shared/select-definitions';

describe('QuestionsIncomeOtherIncomeTypeComponent', () => {
  let component: QuestionsIncomeOtherIncomeTypeComponent;
  let fixture: ComponentFixture<QuestionsIncomeOtherIncomeTypeComponent>;
  let activatedRoute;
  let router;
  let store;
  let currentOtherIncome$;

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
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        QuestionsIncomeOtherIncomeTypeComponent,
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

    currentOtherIncome$ = Observable.of(null);

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
      if (filter({currentOtherIncome: true})) {
        return currentOtherIncome$;
      }
      if (filter({sectionId: true})) {
        return Observable.of(10);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIncomeOtherIncomeTypeComponent);
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

  it('should have the incomeTypes defaulted on the component', () => {
    expect(component.incomeTypes).toEqual(incomeTypes);
  });

  it('should have the onChangeOfIncomeType method', () => {
    expect(component.onChangeOfIncomeType).toEqual(jasmine.any(Function));
  });

  describe('onChangeOfIncomeType', () => {
    it('should require the explain control when the option value is other', () => {
      component.form.controls['explain'].setValue(null);
      expect(component.form.controls['explain'].valid).toEqual(true);

      component.form.controls['option'].setValue('other');
      component.onChangeOfIncomeType();
      expect(component.form.controls['explain'].valid).toEqual(false);
    });

    it('should not require the explain control when the option value is not other', () => {
      component.form.controls['explain'].setValue(null);
      expect(component.form.controls['explain'].valid).toEqual(true);

      component.form.controls['option'].setValue('not_other');
      component.onChangeOfIncomeType();
      expect(component.form.controls['explain'].valid).toEqual(true);
    });
  });

  describe('the component form', () => {
    it('should have the option control with no default value', () => {
      expect(component.form.controls['option']).toBeDefined();
      expect(component.form.controls['option'].value).toBeFalsy();
    });

    it('should require the option control', () => {
      component.form.controls['option'].setValue(null);
      expect(component.form.controls['option'].valid).toBeFalsy();

      component.form.controls['option'].setValue('option');
      expect(component.form.controls['option'].valid).toBeTruthy();
    });

    it('should have the explain control with no default value', () => {
      expect(component.form.controls['explain']).toBeDefined();
      expect(component.form.controls['explain'].value).toBeFalsy();
    });

    it('should not require the explain control', () => {
      component.form.controls['explain'].setValue(null);
      expect(component.form.controls['explain'].valid).toBeTruthy();
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentOtherIncome (non-rental option)', () => {
      beforeEach(() => {
        component.currentOtherIncome = {
          id: 12345
        };
        component.form.controls['option'].setValue('option');
        component.form.controls['explain'].setValue('explain');
        component.onSubmit();
      });

      it('should update the value in the store with the given other income type', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeUpdateAction(
          component.currentOtherIncome,
          Object.assign({}, component.currentOtherIncome, {
            type: component.form.value,
          }, {
            rentalLocation: {
              street: null,
              unit: null,
              city: null,
              state: null,
              zip: null
            }
          }))
        );
      });
    });

    describe('with a currentOtherIncome (rental option)', () => {
      beforeEach(() => {
        component.currentOtherIncome = {
          id: 12345
        };
        component.form.controls['option'].setValue('rental');
        component.onSubmit();
      });

      it('should update the value in the store with the given other income type', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeUpdateAction(
          component.currentOtherIncome,
          Object.assign({}, component.currentOtherIncome, {
            type: component.form.value,
          }, {}))
        );
        expect(component.saveAction).toEqual(null);
        expect(router.navigate).toHaveBeenCalledWith(['../../../../../rental-location/edit'], {
          relativeTo: activatedRoute
        })
      });
    });

    describe('without a currentOtherIncome (non-rental option)', () => {
      beforeEach(() => {
        component.currentOtherIncome = null;
        component.form.controls['option'].setValue('option');
        component.form.controls['explain'].setValue('explain');
        component.onSubmit();
      });

      it('should add the income to the incomes array', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new OtherIncomeAddAction(
          Object.assign({},
            initialOtherIncomeStateObject,
            {
              type: component.form.value
            }
          )
        ));
        expect(router.navigate).toHaveBeenCalledWith([`${component.baseUrl}/income/other-income`])
      });
    });

    describe('without a currentOtherIncome (rental option)', () => {
      beforeEach(() => {
        component.currentOtherIncome = null;
        component.form.controls['option'].setValue('rental');
        component.onSubmit();
      });

      it('should update the value in the temp other income store with the given other income type', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempOtherIncomeTypeUpdateAction(component.form.value));
        expect(router.navigate).toHaveBeenCalledWith([`${component.baseUrl}/income/other-income/rental-location`])
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #option input to the option control', () => {
      const input = fixture.debugElement.query(By.css('#option')).nativeElement;
      const value = 'alimony';
      input.value = value;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['option'].value).toEqual(value);
    });

    it('should map the #explain input to the explain control', () => {
      const option = fixture.debugElement.query(By.css('#option')).nativeElement;
      option.value = 'other';
      option.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('#explain')).nativeElement;
      const value = 'explain';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['explain'].value).toEqual(value);
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

    it('should show required error for explain when submit is pressed and option is "other"', () => {
      const option = fixture.debugElement.query(By.css('#option')).nativeElement;
      option.value = 'other';
      option.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      const inputGroup = fixture.debugElement.query(By.css('.input-group-explain')).nativeElement;
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
