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

import { QuestionsAssetsAccountsBalanceComponent } from './balance.component';
import { AccountStateObject } from '../../ngrx/reducers/accounts/accounts.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import {
  AccountAddAction,
  AccountUpdateAction
} from '../../ngrx/actions/acounts/acounts.action';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsAssetsAccountsBalanceComponent', () => {
  let component: QuestionsAssetsAccountsBalanceComponent;
  let fixture: ComponentFixture<QuestionsAssetsAccountsBalanceComponent>;
  let activatedRoute;
  let router;
  let store;
  let activatedRouteParams$;
  let currentAccount$: Observable<AccountStateObject>;

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
        QuestionsAssetsAccountsBalanceComponent,
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

    currentAccount$ = Observable.of(undefined);

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
      if (filter({currentAccount: true})) {
        return currentAccount$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAssetsAccountsBalanceComponent);
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
    it('should have a balance control defaulted to null', () => {
      expect(component.form.controls['balance']).toBeDefined();
      expect(component.form.controls['balance'].value).toEqual(null);
    });

    it('should require the balance control, and validate it is an number/currency', () => {
      component.form.controls['balance'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['balance'].setValue('anything');
      expect(component.form.valid).toEqual(false);

      component.form.controls['balance'].setValue('$1,000.0');
      expect(component.form.valid).toEqual(false);

      component.form.controls['balance'].setValue('1000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['balance'].setValue('$1000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['balance'].setValue('$1,000');
      expect(component.form.valid).toEqual(true);

      component.form.controls['balance'].setValue('$1,000.00');
      expect(component.form.valid).toEqual(true);
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentAccount', () => {
      beforeEach(() => {
        component.currentAccount = {
          id: 12345
        };
        component.tempAccount = {
          id: 54321
        };
        component.form = ({
          valid: true,
          value: {
            balance: '$1,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given balance', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new AccountUpdateAction(
          component.currentAccount,
          Object.assign({}, component.currentAccount, {
            balance: 1000
          }))
        );
      });

      it('should update the value in the store with the given balance even if the balance is a number', () => {
        component.form = ({
          valid: true,
          value: {
            balance: 1000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new AccountUpdateAction(
          component.currentAccount,
          Object.assign({}, component.currentAccount, {
            balance: 1000
          }))
        );
      });
    });

    describe('without a currentAccount', () => {
      beforeEach(() => {
        component.currentAccount = null;
        component.tempAccount = {
          id: 54321
        };
        component.form = ({
          valid: true,
          value: {
            balance: '$1,000'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given balance removing the "$" and ","', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new AccountAddAction(
          Object.assign({}, component.tempAccount, {
            balance: 1000
          }))
        );
      });

      it('should update the value in the store with the given balance even if the balance is a number', () => {
        component.form = ({
          valid: true,
          value: {
            balance: 1000
          }
        } as FormGroup);
        component.onSubmit();
        expect(store.dispatch).toHaveBeenCalledWith(new AccountAddAction(
          Object.assign({}, component.tempAccount, {
            balance: 1000
          }))
        );
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #balance input to the balance control', () => {
      const input = fixture.debugElement.query(By.css('#balance')).nativeElement;
      const value = '10';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['balance'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const balanceInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(balanceInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(balanceInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should show formatting error when value is not a number/currency', () => {
      const balanceInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(balanceInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#balance')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(balanceInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
    });
  });
});
