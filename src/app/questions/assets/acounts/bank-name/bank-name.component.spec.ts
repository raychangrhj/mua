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

import { QuestionsAssetsAccountsBankNameComponent } from './bank-name.component';
import { AccountStateObject } from '../../ngrx/reducers/accounts/accounts.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { AccountUpdateAction } from '../../ngrx/actions/acounts/acounts.action';
import { TempAccountBankNameUpdateAction } from '../../ngrx/actions/temp-accounts/temp-accounts.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsAssetsAccountsBankNameComponent', () => {
  let component: QuestionsAssetsAccountsBankNameComponent;
  let fixture: ComponentFixture<QuestionsAssetsAccountsBankNameComponent>;
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
        QuestionsAssetsAccountsBankNameComponent,
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
    fixture = TestBed.createComponent(QuestionsAssetsAccountsBankNameComponent);
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
    it('should have a bankName control defaulted to null', () => {
      expect(component.form.controls['bankName']).toBeDefined();
      expect(component.form.controls['bankName'].value).toEqual(null);
    });

    it('should require the bankName control, and validate it is an bankName', () => {
      component.form.controls['bankName'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['bankName'].setValue('bankName');
      expect(component.form.valid).toEqual(true);
    });
  });

  describe('setting up onSubmitMethod', () => {
    describe('with a currentAccount', () => {
      beforeEach(() => {
        component.currentAccount = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            bankName: 'bankName'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given bank name', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new AccountUpdateAction(
          component.currentAccount,
          Object.assign({}, component.currentAccount, {
            bankName: 'bankName'
          }))
        );
      });
    });

    describe('without a currentAccount', () => {
      beforeEach(() => {
        component.currentAccount = null;
        component.form = ({
          valid: true,
          value: {
            bankName: 'bankName'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the temp bank name', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempAccountBankNameUpdateAction('bankName'));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #bank-name input to the bankName control', () => {
      const input = fixture.debugElement.query(By.css('#bank-name')).nativeElement;
      const value = 'calvin@cox.com';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['bankName'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const bankNameInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(bankNameInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(bankNameInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
