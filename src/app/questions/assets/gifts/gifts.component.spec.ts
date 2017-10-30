import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  FormGroup,
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

import { QuestionsAssetsGiftsComponent } from './gifts.component';
import { reducer } from '../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../ngrx/reducers/index.reducer';
import { QuestionsConfirmAnswerComponent } from '../../shared/confirm-answer/confirm-answer.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { NavigationCompleteSectionAction } from '../../shared/ngrx/actions/navigation.action';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';

describe('QuestionsAssetsGiftsComponent', () => {
  let component: QuestionsAssetsGiftsComponent;
  let fixture: ComponentFixture<QuestionsAssetsGiftsComponent>;
  let activatedRoute;
  let router;
  let store;
  let sectionId;

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
        QuestionsAssetsGiftsComponent,
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
        sectionId = 10;
        return Observable.of(sectionId);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAssetsGiftsComponent);
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
    it('should mark the section as complete in the data store', () => {
      store.dispatch.calls.reset();
      component.form = ({
        valid: true,
        value: {
          noGifts: true,
          hasGifts: true
        }
      } as FormGroup);
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(new NavigationCompleteSectionAction(sectionId));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #noGifts input to the noGifts control', () => {
      const input = fixture.debugElement.query(By.css('#no-gifts')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['noGifts'].value).toEqual(true);
    });

    it('should show required error when submit is pressed', () => {
      const noGiftsInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(noGiftsInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(noGiftsInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });
  });
});
