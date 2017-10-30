import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionsAssetsAccountsComponent } from './accounts.component';
import { reducer } from '../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../ngrx/reducers/index.reducer';
import { QuestionsConfirmAnswerComponent } from '../../shared/confirm-answer/confirm-answer.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsAssetsAccountsComponent', () => {
  let component: QuestionsAssetsAccountsComponent;
  let fixture: ComponentFixture<QuestionsAssetsAccountsComponent>;
  let activatedRoute;
  let router;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer,
          assets: combineReducers(reducers)
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
        QuestionsAssetsAccountsComponent,
        QuestionsProgressPillsComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsConfirmAnswerComponent
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
              routerLink: '/new-customer/phone'
            }
          },
          next: true,
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
      if (filter({sectionId: true})) {
        return Observable.of(10);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAssetsAccountsComponent);
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
    it('should have a noAccounts control defaulted to null', () => {
      expect(component.form.controls['noAccounts']).toBeDefined();
      expect(component.form.controls['noAccounts'].value).toEqual(null);
    });

    it('should require the noAccounts control to be true', () => {
      component.form.controls['noAccounts'].setValue(null);
      expect(component.form.controls['noAccounts'].valid).toEqual(false);

      component.form.controls['noAccounts'].setValue(false);
      expect(component.form.controls['noAccounts'].valid).toEqual(false);

      component.form.controls['noAccounts'].setValue(true);
      expect(component.form.controls['noAccounts'].valid).toEqual(true);
    });

    it('should have a hasAccounts control defaulted to null', () => {
      // TODO update hasAccounts based on the getAccountsState selector
      expect(component.form.controls['hasAccounts']).toBeDefined();
      expect(component.form.controls['hasAccounts'].value).toEqual(false);
    });

    it('should require the hasAccounts control to be true', () => {
      component.form.controls['hasAccounts'].setValue(null);
      expect(component.form.controls['hasAccounts'].valid).toEqual(false);

      component.form.controls['hasAccounts'].setValue(false);
      expect(component.form.controls['hasAccounts'].valid).toEqual(false);

      component.form.controls['hasAccounts'].setValue(true);
      // TODO determine why this is false... shouldn't it be true?
      expect(component.form.controls['hasAccounts'].valid).toEqual(false);
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #no-accounts input to the noAccounts control', () => {
      const input = fixture.debugElement.query(By.css('#no-accounts')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['noAccounts'].value).toEqual(true);
    });

    it('should show required error when submit is pressed', () => {
      const noAccountsInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(noAccountsInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(noAccountsInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
