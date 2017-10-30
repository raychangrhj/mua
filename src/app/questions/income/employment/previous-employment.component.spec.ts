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

import { QuestionsIncomePreviousEmploymentComponent } from './previous-employment.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import {
  initialNavigationState,
  reducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducers } from '../ngrx/reducers/index.reducer';
import { QuestionsConfirmAnswerComponent } from '../../shared/confirm-answer/confirm-answer.component';
import { By } from '@angular/platform-browser';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';

describe('QuestionsIncomePreviousEmploymentComponent', () => {
  let component: QuestionsIncomePreviousEmploymentComponent;
  let fixture: ComponentFixture<QuestionsIncomePreviousEmploymentComponent>;
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
        QuestionsIncomePreviousEmploymentComponent,
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
    fixture = TestBed.createComponent(QuestionsIncomePreviousEmploymentComponent);
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

  describe('HTML integration tests', () => {
    it('should map the #no-previous-employment input to the noPrevEmployment control', () => {
      const input = fixture.debugElement.query(By.css('#no-previous-employment')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['noPrevEmployment'].value).toEqual(true);
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

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
