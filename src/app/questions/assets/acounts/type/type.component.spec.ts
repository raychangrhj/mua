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

import { QuestionsAssetsAccountsTypeComponent } from './type.component';
import { AccountStateObject } from '../../ngrx/reducers/accounts/accounts.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { AccountUpdateAction } from '../../ngrx/actions/acounts/acounts.action';
import { TempAccountUpdateTypeUpdateAction } from '../../ngrx/actions/temp-accounts/temp-accounts.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';
import { KeysToArrayPipe } from '../../../../shared/keys-to-array.pipe';

describe('QuestionsAssetsAccountsTypeComponent', () => {
  let component: QuestionsAssetsAccountsTypeComponent;
  let fixture: ComponentFixture<QuestionsAssetsAccountsTypeComponent>;
  let activatedRoute;
  let router;
  let store;
  let activatedRouteParams$;
  let currentAccount$: Observable<AccountStateObject>;
  let pipe: KeysToArrayPipe;

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
        QuestionsAssetsAccountsTypeComponent,
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
    pipe = new KeysToArrayPipe();
    fixture = TestBed.createComponent(QuestionsAssetsAccountsTypeComponent);
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
    it('should have a type control defaulted to null', () => {
      expect(component.form.controls['type']).toBeDefined();
      expect(component.form.controls['type'].value).toEqual(null);
    });

    it('should require the type control', () => {
      component.form.controls['type'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['type'].setValue('type');
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
            type: 'type'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the given bank account type', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new AccountUpdateAction(
          component.currentAccount,
          Object.assign({}, component.currentAccount, {
            type: 'type'
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
            type: 'type'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the temp bank account type', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempAccountUpdateTypeUpdateAction('type'));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #type input to the type control', () => {
      pipe = new KeysToArrayPipe();
      const input = fixture.debugElement.query(By.css('#type')).nativeElement;
      const value = pipe.transform(component.accountTypes)[0].key;
      input.value = value;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['type'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const typeInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(typeInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(typeInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
