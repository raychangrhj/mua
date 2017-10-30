import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

import { QuestionsConfirmComponent } from './confirm.component';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsConfirmAnswerComponent } from '../confirm-answer/confirm-answer.component';
import { reducers as customerReducers } from '../../customer/shared/ngrx/reducers/index.reducer';
import { QuestionsProgressPillsComponent } from '../progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../ngrx/reducers/navigation.reducer';
import { NavigationCompleteSectionAction } from '../ngrx/actions/navigation.action';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import { reducers } from '../../mortgage-intent/shared/ngrx/reducers/index.reducer';

describe('QuestionsConfirmComponent', () => {
  let component: QuestionsConfirmComponent;
  let fixture: ComponentFixture<QuestionsConfirmComponent>;
  let activatedRoute;
  let sectionId$;
  let answers;
  let router;
  let answers$;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          customer: combineReducers(customerReducers),
          mortgageIntent: combineReducers(reducers),
          navigation: reducer
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
        QuestionsConfirmComponent,
        ActionBtnGroupComponent,
        QuestionsConfirmAnswerComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([ActivatedRoute, Store, Router], (_activatedRoute_, _store_, _router_) => {
    store = _store_;
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();

    router = _router_;
    spyOn(router, 'navigate');

    answers = [{
      title: 'Primary Borrower Name',
      returnLink: '/new-customer/name/edit',
      selector: 'name'
    }, {
      title: 'Primary Borrower Phone',
      returnLink: '/new-customer/phone/edit',
      selector: 'phone'
    }, {
      title: 'Primary Borrower Email',
      returnLink: '/new-customer/email/edit',
      selector: 'email'
    }, {
      title: 'Primary Borrower DOB',
      returnLink: '/new-customer/date-of-birth/edit',
      selector: 'dob'
    }, {
      title: 'Primary Borrower SSN',
      returnLink: '/new-customer/ssn/edit',
      selector: 'ssn'
    }, {
      title: 'Current Address',
      returnLink: '/new-customer/address/edit',
      selector: 'address'
    }, {
      title: 'At Current Address Since',
      returnLink: '/new-customer/address-information/edit',
      selector: 'address info'
    }, {
      title: 'Marital Status',
      returnLink: '/new-customer/marital-status/edit',
      selector: 'marital status'
    }];
    answers$ = Observable.of(answers);
    spyOn(answers$, 'take').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
      if (filter({sectionId: true})) {
        sectionId$ = Observable.of(10);
        spyOn(sectionId$, 'take').and.callThrough();
        return sectionId$;
      }
      if (filter({answers: true})) {
        return answers$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsConfirmComponent);
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

  it('should have an array of all questions in this section from the activated route data', () => {
    expect(component.confirmAnswers).toEqual(answers);
  });

  describe('confirmAnswers', () => {
    it('should have an observable of each response from the data store', () => {
      // the progress pill and pill title are using select so answers length + 2
      expect(store.select).toHaveBeenCalledTimes(answers.length + 2);
      component.confirmAnswers.forEach(answer => {
        expect(answer.response).toBeDefined();
      });
    });

    it('should only get the route data answers one time', () => {
      expect(answers$.take).toHaveBeenCalledWith(1);
    });

    it('should not attempt to gather responses if the answers array is undefined', () => {
      answers$ = Observable.of(undefined);
      expect(() => {
        component.ngOnInit()
      }).not.toThrow();
    });
  });

  describe('onSubmit', () => {
    it('should dispatch a new NavigationCompleteSectionAction with the sectionTitle from the route data', () => {
      component.onSubmit();
      expect(sectionId$.take).toHaveBeenCalledWith(1);
      expect(store.dispatch).toHaveBeenCalledWith(new NavigationCompleteSectionAction(
        10
      ));
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('HTML integration tests', () => {
    it('should render a regions-confirm-answer for each confirmAnswer object', () => {
      const htmlAnswers = fixture.debugElement.queryAll(By.css('regions-confirm-answer'));
      expect(htmlAnswers.length).toEqual(answers.length);

      htmlAnswers.forEach(((htmlAnswer, i) => {
        expect(htmlAnswer.query(By.css('.title')).nativeElement.textContent).toEqual(answers[i].title);
        expect(htmlAnswer.query(By.css('.edit')).nativeElement.textContent).toEqual('Edit');
      }));
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
