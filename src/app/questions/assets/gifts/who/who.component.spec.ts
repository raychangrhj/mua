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

import { QuestionsAssetsGiftsWhoComponent } from './who.component';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { reducers } from '../../ngrx/reducers/index.reducer';
import { reducer } from '../../../shared/ngrx/reducers/navigation.reducer';
import { GiftStateObject } from '../../ngrx/reducers/gifts/gifts.reducer';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { GiftUpdateAction } from '../../ngrx/actions/gifts/gifts.action';
import { TempGiftWhoUpdateAction } from '../../ngrx/actions/temp-gifts/temp-gifts.action';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsAssetsGiftsWhoComponent', () => {
  let component: QuestionsAssetsGiftsWhoComponent;
  let fixture: ComponentFixture<QuestionsAssetsGiftsWhoComponent>;
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
        QuestionsAssetsGiftsWhoComponent,
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
    fixture = TestBed.createComponent(QuestionsAssetsGiftsWhoComponent);
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

  describe('setting up onSubmitMethod', () => {
    describe('with a currentGift', () => {
      beforeEach(() => {
        component.currentGift = {
          id: 12345
        };
        component.form = ({
          valid: true,
          value: {
            who: 'who'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the value in the store with the gift givers name "who"', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new GiftUpdateAction(
          component.currentGift,
          Object.assign({}, component.currentGift, {
            who: 'who'
          }))
        );
      });
    });

    describe('without a currentGift', () => {
      beforeEach(() => {
        component.currentGift = null;
        component.form = ({
          valid: true,
          value: {
            who: 'who'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should update the temp gift givers name "who"', () => {
        expect(store.dispatch).toHaveBeenCalledWith(new TempGiftWhoUpdateAction('who'));
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #who input to the who control', () => {
      const input = fixture.debugElement.query(By.css('#who')).nativeElement;
      const value = 'me';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['who'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const whoInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(whoInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(whoInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
