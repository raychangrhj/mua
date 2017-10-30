import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  initialNavigationState,
  reducer
} from '../ngrx/reducers/navigation.reducer';
import { QuestionsBaseComponent } from './questions-base.component';
import { reducers as customerReducers } from '../../customer/shared/ngrx/reducers/index.reducer';
import { reducers } from '../../mortgage-intent/shared/ngrx/reducers/index.reducer';

describe('QuestionsBaseComponent', () => {
  let component: QuestionsBaseComponent;
  let fixture: ComponentFixture<QuestionsBaseComponent>;
  let router;
  let store;
  let activePillTitle;
  let pills;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
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
      declarations: [QuestionsBaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute, Store], (_router_, _activatedRoute_, _store_) => {
    router = _router_;
    spyOn(router, 'navigate');

    store = _store_;
    spyOn(store, 'dispatch').and.callThrough();

    const navigation = JSON.parse(JSON.stringify(initialNavigationState));
    activePillTitle = navigation.sections.find(section => section.active).title;
    pills = navigation.sections.filter(section => section.required);
    pills = pills.map(section => section.complete ? 'solid' : 'empty');

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          back: {
            link: {
              routerLink: '/new-customer/email'
            }
          },
          next: true,
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should extend the BaseComponent calling super(...)', () => {
    expect(component.actionBtnLinkOptions$).toBeDefined();
    expect(component.ngOnInit).toBeDefined();
    expect(component.onSubmit).toBeDefined();
  });

  it('should have an pillsTitle$ for setting up the progress pills title', async(() => {
    component.pillsTitle$.subscribe(title => {
      expect(title).toEqual(activePillTitle);
    });
  }));

  it('should have an pills$ for setting up the progress pills', async(() => {
    component.pills$.subscribe(pillMap => {
      expect(pillMap).toEqual(pills);
    });
  }));

  it('should have the formSubmitAttempted boolean set to false', () => {
    component.formSubmitAttempted$.subscribe(val => {
      expect(val).toEqual(false);
    });
  });

  describe('onSubmit', () => {
    it('should not throw an error if there is no form', () => {
      delete component.form;
      expect(() => component.onSubmit()).not.toThrow();
    });

    it('should call the router.navigate method with the save action if there is no form', () => {
      component.form = null;
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/foo']);
    });

    it('should mark the formSubmitAttempted as true whenever the form exists and the submit is called', () => {
      component.form = ({
        valid: false
      }) as FormGroup;
      component.onSubmit();
      component.formSubmitAttempted$.subscribe(val => {
        expect(val).toEqual(true);
      });
    });

    it('should call the onSubmitMethod call back if the form is valid', () => {
      component.form = ({
        valid: true
      }) as FormGroup;
      component.onSubmitMethod = jasmine.createSpy('onSubmitMethod');
      component.onSubmit();
      expect(component.onSubmitMethod).toHaveBeenCalledTimes(1);
    });

    it('should not call the onSubmitMethod call back if it does not exist even if the form is valid', () => {
      component.form = ({
        valid: true
      }) as FormGroup;
      component.onSubmitMethod = null;
      expect(() => component.onSubmit()).not.toThrow();
    });

    it('should call the router.navigate method with the save action if the form is valid', () => {
      component.form = ({
        valid: true
      }) as FormGroup;
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/foo']);
    });

    it('should not call the router.navigate method with the save action if the form is invalid', () => {
      component.form = ({
        valid: false
      }) as FormGroup;
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
