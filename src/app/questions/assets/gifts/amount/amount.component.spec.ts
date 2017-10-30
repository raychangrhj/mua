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

import { QuestionsAssetsGiftsAmountComponent } from './amount.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import { GiftStateObject } from '../../ngrx/reducers/gifts/gifts.reducer';
import { By } from '@angular/platform-browser';
import {
  GiftAddAction,
  GiftUpdateAction
} from '../../ngrx/actions/gifts/gifts.action';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsAssetsGiftsAmountComponent', () => {
  let component: QuestionsAssetsGiftsAmountComponent;
  let fixture: ComponentFixture<QuestionsAssetsGiftsAmountComponent>;
  let activatedRoute;
  let router;
  let store;
  let activatedRouteParams$;
  let currentGift$: Observable<GiftStateObject>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: reducer,
          assets: combineReducers(reducers)
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
        QuestionsAssetsGiftsAmountComponent,
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

    currentGift$ = Observable.of(undefined);

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
      if (filter({currentGift: true})) {
        return currentGift$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAssetsGiftsAmountComponent);
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

  it('should have a forms object', () => {
    expect(component.form).toEqual(jasmine.any(Object));
  });

  describe('component form', () => {
    it('should have a amount control defaulted to null', () => {
      expect(component.form.controls['amount']).toBeDefined();
      expect(component.form.controls['amount'].value).toEqual(null);
    });

    it('should require the amount control, and validate it is a number or currency', () => {
      component.form.controls['amount'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['amount'].setValue('anything');
      expect(component.form.valid).toEqual(false);

      component.form.controls['amount'].setValue('$1,000.0');
      expect(component.form.valid).toEqual(false);

      component.form.controls['amount'].setValue('1000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['amount'].setValue('$1000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['amount'].setValue('$1,000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['amount'].setValue('$1,000.00');
      expect(component.form.valid).toEqual(true);
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentGift', () => {
      beforeEach(() => {
        component.currentGift = {
          id: 12345
        };
        component.tempGift = {
          id: 654321
        };
        component.form = ({
          valid: true,
          value: {
            amount: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given gift amount removing the "$" and ","', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new GiftUpdateAction(
          component.currentGift,
          Object.assign({}, component.currentGift, {
            amount: 10000
          }))
        );
      });

      it('should update the value in the store with the given gift amount even if it\'s a number', () => {
        component.form = ({
          valid: true,
          value: {
            amount: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new GiftUpdateAction(
          component.currentGift,
          Object.assign({}, component.currentGift, {
            amount: 10000
          }))
        );
      });
    });

    describe('without a currentGift', () => {
      beforeEach(() => {
        component.currentGift = null;
        component.tempGift = {
          id: 654321
        };
        component.form = ({
          valid: true,
          value: {
            amount: '$10,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should add a gift with the gift amount and all temp gift information', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new GiftAddAction(
          Object.assign({}, component.tempGift, {
            amount: 10000
          })
        ));
      });

      it('should update the value in the store with the given gift amount even if it\'s a number', () => {
        component.form = ({
          valid: true,
          value: {
            amount: 10000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new GiftAddAction(
          Object.assign({}, component.tempGift, {
            amount: 10000
          })
        ));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #amount input to the amount control', () => {
      const input = fixture.debugElement.query(By.css('#amount')).nativeElement;
      const value = '10000';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['amount'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const amountInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(amountInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(amountInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should show formatting error when value is not an amount', () => {
      const amountInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(amountInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#amount')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(amountInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
    });
  });
});
