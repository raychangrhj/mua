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

import { QuestionsRequiredQuestionsRaceComponent } from './race.component';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducer as govReducer } from '../ngrx/reducers/government-questions.reducer';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { GovernmentQuestionsRaceUpdateAction } from '../ngrx/actions/government-questions.action';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsRequiredQuestionsRaceComponent', () => {
  let component: QuestionsRequiredQuestionsRaceComponent;
  let fixture: ComponentFixture<QuestionsRequiredQuestionsRaceComponent>;
  let activatedRoute;
  let router;
  let store;
  let storeData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          navigation: navReducer,
          governmentQuestions: govReducer
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
        QuestionsRequiredQuestionsRaceComponent,
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

    storeData = {
      americanIndian: {
        selected: true,
        tribe: 'other'
      },
      asian: true,
      asianIndian: true,
      chinese: true,
      filipino: true,
      japanese: true,
      korean: true,
      vietnamese: true,
      otherAsian: {
        selected: true,
        other: 'other'
      },
      africanAmerican: true,
      pacificIslander: true,
      nativeHawaiian: true,
      guamanian: true,
      samoan: true,
      otherPacificIslander: {
        selected: true,
        other: 'other'
      },
      white: true,
      optOut: true,
    };

    activatedRoute = _activatedRoute_;
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
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRequiredQuestionsRaceComponent);
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

  describe('the component form', () => {
    it('should have the americanIndian control with no default value', () => {
      expect(component.form.controls['americanIndian']).toBeDefined();
      expect(component.form.controls['americanIndian'].value).toEqual(null);
    });

    it('should have the americanIndianText control with no default value', () => {
      expect(component.form.controls['americanIndianText']).toBeDefined();
      expect(component.form.controls['americanIndianText'].value).toEqual(null);
    });

    it('should have the asian control with no default value', () => {
      expect(component.form.controls['asian']).toBeDefined();
      expect(component.form.controls['asian'].value).toEqual(null);
    });

    it('should have the asianIndian control with no default value', () => {
      expect(component.form.controls['asianIndian']).toBeDefined();
      expect(component.form.controls['asianIndian'].value).toEqual(null);
    });

    it('should have the chinese control with no default value', () => {
      expect(component.form.controls['chinese']).toBeDefined();
      expect(component.form.controls['chinese'].value).toEqual(null);
    });

    it('should have the filipino control with no default value', () => {
      expect(component.form.controls['filipino']).toBeDefined();
      expect(component.form.controls['filipino'].value).toEqual(null);
    });

    it('should have the japanese control with no default value', () => {
      expect(component.form.controls['japanese']).toBeDefined();
      expect(component.form.controls['japanese'].value).toEqual(null);
    });

    it('should have the korean control with no default value', () => {
      expect(component.form.controls['korean']).toBeDefined();
      expect(component.form.controls['korean'].value).toEqual(null);
    });

    it('should have the vietnamese control with no default value', () => {
      expect(component.form.controls['vietnamese']).toBeDefined();
      expect(component.form.controls['vietnamese'].value).toEqual(null);
    });

    it('should have the otherAsian control with no default value', () => {
      expect(component.form.controls['otherAsian']).toBeDefined();
      expect(component.form.controls['otherAsian'].value).toEqual(null);
    });

    it('should have the otherAsianText control with no default value', () => {
      expect(component.form.controls['otherAsianText']).toBeDefined();
      expect(component.form.controls['otherAsianText'].value).toEqual(null);
    });

    it('should have the africanAmerican control with no default value', () => {
      expect(component.form.controls['africanAmerican']).toBeDefined();
      expect(component.form.controls['africanAmerican'].value).toEqual(null);
    });

    it('should have the pacificIslander control with no default value', () => {
      expect(component.form.controls['pacificIslander']).toBeDefined();
      expect(component.form.controls['pacificIslander'].value).toEqual(null);
    });

    it('should have the nativeHawaiian control with no default value', () => {
      expect(component.form.controls['nativeHawaiian']).toBeDefined();
      expect(component.form.controls['nativeHawaiian'].value).toEqual(null);
    });

    it('should have the guamanian control with no default value', () => {
      expect(component.form.controls['guamanian']).toBeDefined();
      expect(component.form.controls['guamanian'].value).toEqual(null);
    });

    it('should have the somoan control with no default value', () => {
      expect(component.form.controls['samoan']).toBeDefined();
      expect(component.form.controls['samoan'].value).toEqual(null);
    });

    it('should have the otherPacificIslander control with no default value', () => {
      expect(component.form.controls['otherPacificIslander']).toBeDefined();
      expect(component.form.controls['otherPacificIslander'].value).toEqual(null);
    });

    it('should have the otherPacificIslanderText control with no default value', () => {
      expect(component.form.controls['otherPacificIslanderText']).toBeDefined();
      expect(component.form.controls['otherPacificIslanderText'].value).toEqual(null);
    });

    it('should have the white control with no default value', () => {
      expect(component.form.controls['white']).toBeDefined();
      expect(component.form.controls['white'].value).toEqual(null);
    });

    it('should have the optOut control with no default value', () => {
      expect(component.form.controls['optOut']).toBeDefined();
      expect(component.form.controls['optOut'].value).toEqual(null);
    });

    it('should require the optOut control', () => {
      component.form.controls['optOut'].setValue(null);
      expect(component.form.valid).toBeFalsy();

      component.form.controls['optOut'].setValue(true);
      expect(component.form.valid).toBeTruthy();
    });

    describe('with previous data in the store', () => {
      it('should set the value of the control to "yes" if the store is true OnInit', () => {
        store.dispatch(new GovernmentQuestionsRaceUpdateAction(storeData));
        component.ngOnInit();
        expect(component.form.controls['americanIndian'].value).toEqual(true);
        expect(component.form.controls['americanIndianText'].value).toEqual('other');
        expect(component.form.controls['asian'].value).toEqual(true);
        expect(component.form.controls['asianIndian'].value).toEqual(true);
        expect(component.form.controls['chinese'].value).toEqual(true);
        expect(component.form.controls['filipino'].value).toEqual(true);
        expect(component.form.controls['japanese'].value).toEqual(true);
        expect(component.form.controls['korean'].value).toEqual(true);
        expect(component.form.controls['vietnamese'].value).toEqual(true);
        expect(component.form.controls['otherAsian'].value).toEqual(true);
        expect(component.form.controls['otherAsianText'].value).toEqual('other');
        expect(component.form.controls['africanAmerican'].value).toEqual(true);
        expect(component.form.controls['pacificIslander'].value).toEqual(true);
        expect(component.form.controls['nativeHawaiian'].value).toEqual(true);
        expect(component.form.controls['guamanian'].value).toEqual(true);
        expect(component.form.controls['samoan'].value).toEqual(true);
        expect(component.form.controls['otherPacificIslander'].value).toEqual(true);
        expect(component.form.controls['otherPacificIslanderText'].value).toEqual('other');
        expect(component.form.controls['white'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new GovernmentQuestionsRaceUpdateAction(storeData));
        component.ngOnInit();
        store.dispatch(new GovernmentQuestionsRaceUpdateAction({
          americanIndian: {
            selected: false,
            tribe: 'something else'
          },
          asian: false,
          asianIndian: false,
          chinese: false,
          filipino: false,
          japanese: false,
          korean: false,
          vietnamese: false,
          otherAsian: {
            selected: false,
            other: 'something else'
          },
          africanAmerican: false,
          pacificIslander: false,
          nativeHawaiian: false,
          guamanian: false,
          samoan: false,
          otherPacificIslander: {
            selected: false,
            other: 'something else'
          },
          white: false,
          optOut: false,
        }));
        expect(component.form.controls['americanIndian'].value).toEqual(true);
        expect(component.form.controls['americanIndianText'].value).toEqual('other');
        expect(component.form.controls['asian'].value).toEqual(true);
        expect(component.form.controls['asianIndian'].value).toEqual(true);
        expect(component.form.controls['chinese'].value).toEqual(true);
        expect(component.form.controls['filipino'].value).toEqual(true);
        expect(component.form.controls['japanese'].value).toEqual(true);
        expect(component.form.controls['korean'].value).toEqual(true);
        expect(component.form.controls['vietnamese'].value).toEqual(true);
        expect(component.form.controls['otherAsian'].value).toEqual(true);
        expect(component.form.controls['otherAsianText'].value).toEqual('other');
        expect(component.form.controls['africanAmerican'].value).toEqual(true);
        expect(component.form.controls['pacificIslander'].value).toEqual(true);
        expect(component.form.controls['nativeHawaiian'].value).toEqual(true);
        expect(component.form.controls['guamanian'].value).toEqual(true);
        expect(component.form.controls['samoan'].value).toEqual(true);
        expect(component.form.controls['otherPacificIslander'].value).toEqual(true);
        expect(component.form.controls['otherPacificIslanderText'].value).toEqual('other');
        expect(component.form.controls['white'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });
    });
  });

  it('should unsubscribe from the valueChanges once the component is destroyed', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    spyOn(component.form.controls['americanIndian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['americanIndianText'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['asian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['asianIndian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['chinese'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['filipino'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['japanese'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['korean'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['vietnamese'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['otherAsian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['otherAsianText'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['africanAmerican'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['pacificIslander'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['nativeHawaiian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['guamanian'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['samoan'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['otherPacificIslander'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['otherPacificIslanderText'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['white'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });
    spyOn(component.form.controls['optOut'].valueChanges, 'subscribe').and.returnValue({ unsubscribe: unsubscribeSpy });

    component.ngOnInit();
    expect(component.form.controls['americanIndian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['americanIndianText'].valueChanges.subscribe).not.toHaveBeenCalled();
    expect(component.form.controls['asian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['asianIndian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['chinese'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['filipino'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['japanese'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['korean'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['vietnamese'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherAsian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherAsianText'].valueChanges.subscribe).not.toHaveBeenCalled();
    expect(component.form.controls['africanAmerican'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['pacificIslander'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['nativeHawaiian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['guamanian'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['samoan'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherPacificIslander'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherPacificIslanderText'].valueChanges.subscribe).not.toHaveBeenCalled();
    expect(component.form.controls['white'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['optOut'].valueChanges.subscribe).not.toHaveBeenCalled();

    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(16);
  });

  it('should have a method to remove the required validator on optOut when any other option is selected', () => {
    component.form.controls['optOut'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['americanIndian'].setValue(true);
    component.form.controls['americanIndianText'].setValue('text');
    expect(component.form.valid).toBeTruthy();
    component.form.controls['americanIndian'].setValue(null);
    component.form.controls['americanIndianText'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['asian'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['asian'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['asianIndian'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['asianIndian'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['chinese'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['chinese'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['filipino'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['filipino'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['japanese'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['japanese'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['korean'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['korean'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['vietnamese'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['vietnamese'].setValue(null);

    component.form.controls['otherAsian'].setValue(true);
    component.form.controls['otherAsianText'].setValue('text');
    expect(component.form.valid).toBeTruthy();
    component.form.controls['otherAsian'].setValue(null);
    component.form.controls['otherAsianText'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['africanAmerican'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['africanAmerican'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['pacificIslander'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['pacificIslander'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['nativeHawaiian'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['nativeHawaiian'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['guamanian'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['guamanian'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['samoan'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['samoan'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['otherPacificIslander'].setValue(true);
    component.form.controls['otherPacificIslanderText'].setValue('text');
    expect(component.form.valid).toBeTruthy();
    component.form.controls['otherPacificIslander'].setValue(null);
    component.form.controls['otherPacificIslanderText'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['white'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['white'].setValue(null);
    expect(component.form.valid).toBeFalsy();
  });

  it('should have the optOutChange method', () => {
    expect(component.optOutChange).toEqual(jasmine.any(Function));
  });

  describe('optOutChange', () => {
    beforeEach(() => {
      component.form.controls['americanIndian'].setValue('something');
      component.form.controls['americanIndianText'].setValue('something');
      component.form.controls['asian'].setValue('something');
      component.form.controls['asianIndian'].setValue('something');
      component.form.controls['chinese'].setValue('something');
      component.form.controls['filipino'].setValue('something');
      component.form.controls['japanese'].setValue('something');
      component.form.controls['korean'].setValue('something');
      component.form.controls['vietnamese'].setValue('something');
      component.form.controls['otherAsian'].setValue('something');
      component.form.controls['otherAsianText'].setValue('something');
      component.form.controls['africanAmerican'].setValue('something');
      component.form.controls['pacificIslander'].setValue('something');
      component.form.controls['nativeHawaiian'].setValue('something');
      component.form.controls['guamanian'].setValue('something');
      component.form.controls['samoan'].setValue('something');
      component.form.controls['otherPacificIslander'].setValue('something');
      component.form.controls['otherPacificIslanderText'].setValue('something');
      component.form.controls['white'].setValue('something');
    });

    it('should disable and clear all the other inputs when the user opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      expect(component.form.controls['americanIndian'].value).toEqual(null);
      expect(component.form.controls['americanIndian'].disabled).toEqual(true);

      expect(component.form.controls['americanIndianText'].value).toEqual(null);
      expect(component.form.controls['americanIndianText'].disabled).toEqual(true);

      expect(component.form.controls['asian'].value).toEqual(null);
      expect(component.form.controls['asian'].disabled).toEqual(true);

      expect(component.form.controls['asianIndian'].value).toEqual(null);
      expect(component.form.controls['asianIndian'].disabled).toEqual(true);

      expect(component.form.controls['chinese'].value).toEqual(null);
      expect(component.form.controls['chinese'].disabled).toEqual(true);

      expect(component.form.controls['filipino'].value).toEqual(null);
      expect(component.form.controls['filipino'].disabled).toEqual(true);

      expect(component.form.controls['japanese'].value).toEqual(null);
      expect(component.form.controls['japanese'].disabled).toEqual(true);

      expect(component.form.controls['korean'].value).toEqual(null);
      expect(component.form.controls['korean'].disabled).toEqual(true);

      expect(component.form.controls['vietnamese'].value).toEqual(null);
      expect(component.form.controls['vietnamese'].disabled).toEqual(true);

      expect(component.form.controls['otherAsian'].value).toEqual(null);
      expect(component.form.controls['otherAsian'].disabled).toEqual(true);

      expect(component.form.controls['otherAsianText'].value).toEqual(null);
      expect(component.form.controls['otherAsianText'].disabled).toEqual(true);

      expect(component.form.controls['africanAmerican'].value).toEqual(null);
      expect(component.form.controls['africanAmerican'].disabled).toEqual(true);

      expect(component.form.controls['pacificIslander'].value).toEqual(null);
      expect(component.form.controls['pacificIslander'].disabled).toEqual(true);

      expect(component.form.controls['nativeHawaiian'].value).toEqual(null);
      expect(component.form.controls['nativeHawaiian'].disabled).toEqual(true);

      expect(component.form.controls['guamanian'].value).toEqual(null);
      expect(component.form.controls['guamanian'].disabled).toEqual(true);

      expect(component.form.controls['samoan'].value).toEqual(null);
      expect(component.form.controls['samoan'].disabled).toEqual(true);

      expect(component.form.controls['otherPacificIslander'].value).toEqual(null);
      expect(component.form.controls['otherPacificIslander'].disabled).toEqual(true);

      expect(component.form.controls['otherPacificIslanderText'].value).toEqual(null);
      expect(component.form.controls['otherPacificIslanderText'].disabled).toEqual(true);

      expect(component.form.controls['white'].value).toEqual(null);
      expect(component.form.controls['white'].disabled).toEqual(true);
    });

    it('should re-enable all the other inputs when the user deselects opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      component.form.controls['optOut'].setValue(false);
      component.optOutChange();

      expect(component.form.controls['americanIndian'].disabled).toEqual(false);
      expect(component.form.controls['americanIndianText'].disabled).toEqual(false);
      expect(component.form.controls['asian'].disabled).toEqual(false);
      expect(component.form.controls['asianIndian'].disabled).toEqual(false);
      expect(component.form.controls['chinese'].disabled).toEqual(false);
      expect(component.form.controls['filipino'].disabled).toEqual(false);
      expect(component.form.controls['japanese'].disabled).toEqual(false);
      expect(component.form.controls['korean'].disabled).toEqual(false);
      expect(component.form.controls['vietnamese'].disabled).toEqual(false);
      expect(component.form.controls['otherAsian'].disabled).toEqual(false);
      expect(component.form.controls['otherAsianText'].disabled).toEqual(false);
      expect(component.form.controls['africanAmerican'].disabled).toEqual(false);
      expect(component.form.controls['pacificIslander'].disabled).toEqual(false);
      expect(component.form.controls['nativeHawaiian'].disabled).toEqual(false);
      expect(component.form.controls['guamanian'].disabled).toEqual(false);
      expect(component.form.controls['samoan'].disabled).toEqual(false);
      expect(component.form.controls['otherPacificIslander'].disabled).toEqual(false);
      expect(component.form.controls['otherPacificIslanderText'].disabled).toEqual(false);
      expect(component.form.controls['white'].disabled).toEqual(false);
    });
  });

  it('should have the toggleRequireTextInput method', () => {
    expect(component.toggleRequireTextInput).toEqual(jasmine.any(Function));
  });

  describe('toggleRequireTextInput', () => {
    it('should require otherHispanicText when otherHispanic is valid', () => {
      component.form.controls['americanIndian'].setValue(true);
      component.toggleRequireTextInput('americanIndian');
      expect(component.form.controls['americanIndianText'].valid).toBeFalsy();

      component.form.controls['americanIndian'].setValue(false);
      component.toggleRequireTextInput('americanIndian');
      expect(component.form.controls['americanIndianText'].valid).toBeTruthy();
    });

    it('should clear the americanIndianText whenever the americanIndian option is deselected', () => {
      component.form.controls['americanIndian'].setValue(true);
      component.toggleRequireTextInput('americanIndian');
      component.form.controls['americanIndianText'].setValue('some text');

      component.form.controls['americanIndian'].setValue(false);
      component.toggleRequireTextInput('americanIndian');
      expect(component.form.controls['americanIndianText'].value).toEqual(null);
    });
  });

  it('should have the toggleCheckOnTextChange method', () => {
    expect(component.toggleCheckOnTextChange).toEqual(jasmine.any(Function));
  });

  describe('toggleCheckOnTextChange', () => {
    beforeEach(() => {
      component.form.controls['americanIndian'].setValue(false);
    });

    it('should enable the americanIndian option when americanIndianText is entered', () => {
      component.form.controls['americanIndianText'].setValue('something');
      component.toggleCheckOnTextChange('americanIndian');

      expect(component.form.controls['americanIndian'].value).toEqual(true);
      expect(component.form.valid).toEqual(true);
    });

    it('should not enable the americanIndian option when americanIndianText is a blank string', () => {
      component.form.controls['americanIndianText'].setValue('   ');
      component.toggleCheckOnTextChange('americanIndian');

      expect(component.form.controls['americanIndian'].value).toEqual(false);
      expect(component.form.valid).toEqual(false);
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          americanIndian: 'americanIndian',
          americanIndianText: 'americanIndianText',
          asian: 'asian',
          asianIndian: 'asianIndian',
          chinese: 'chinese',
          filipino: 'filipino',
          japanese: 'japanese',
          korean: 'korean',
          vietnamese: 'vietnamese',
          otherAsian: 'otherAsian',
          otherAsianText: 'otherAsianText',
          africanAmerican: 'africanAmerican',
          pacificIslander: 'pacificIslander',
          nativeHawaiian: 'nativeHawaiian',
          guamanian: 'guamanian',
          samoan: 'samoan',
          otherPacificIslander: 'otherPacificIslander',
          otherPacificIslanderText: 'otherPacificIslanderText',
          white: 'white',
          optOut: 'optOut'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsRaceUpdateAction({
        americanIndian: {
          selected: component.form.value.americanIndian,
          tribe: component.form.value.americanIndianText
        },
        asian: component.form.value.asian,
        asianIndian: component.form.value.asianIndian,
        chinese: component.form.value.chinese,
        filipino: component.form.value.filipino,
        japanese: component.form.value.japanese,
        korean: component.form.value.korean,
        vietnamese: component.form.value.vietnamese,
        otherAsian: {
          selected: component.form.value.otherAsian,
          other: component.form.value.otherAsianText
        },
        africanAmerican: component.form.value.africanAmerican,
        pacificIslander: component.form.value.pacificIslander,
        nativeHawaiian: component.form.value.nativeHawaiian,
        guamanian: component.form.value.guamanian,
        samoan: component.form.value.samoan,
        otherPacificIslander: {
          selected: component.form.value.otherPacificIslander,
          other: component.form.value.otherPacificIslanderText
        },
        white: component.form.value.white,
        optOut: component.form.value.optOut,
      }));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #americanIndian input to the americanIndian control', () => {
      const input = fixture.debugElement.query(By.css('#americanIndian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['americanIndian'].value).toEqual(true);
    });

    it('should map the #americanIndianText input to the americanIndianText control', () => {
      const input = fixture.debugElement.query(By.css('#americanIndianText')).nativeElement;
      const value = 'some text';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['americanIndianText'].value).toEqual(value);
    });

    it('should map the #asian input to the asian control', () => {
      const input = fixture.debugElement.query(By.css('#asian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['asian'].value).toEqual(true);
    });

    it('should map the #asianIndian input to the asianIndian control', () => {
      const input = fixture.debugElement.query(By.css('#asianIndian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['asianIndian'].value).toEqual(true);
    });

    it('should map the #chinese input to the chinese control', () => {
      const input = fixture.debugElement.query(By.css('#chinese')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['chinese'].value).toEqual(true);
    });

    it('should map the #filipino input to the filipino control', () => {
      const input = fixture.debugElement.query(By.css('#filipino')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['filipino'].value).toEqual(true);
    });

    it('should map the #japanese input to the japanese control', () => {
      const input = fixture.debugElement.query(By.css('#japanese')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['japanese'].value).toEqual(true);
    });

    it('should map the #korean input to the korean control', () => {
      const input = fixture.debugElement.query(By.css('#korean')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['korean'].value).toEqual(true);
    });

    it('should map the #vietnamese input to the vietnamese control', () => {
      const input = fixture.debugElement.query(By.css('#vietnamese')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['vietnamese'].value).toEqual(true);
    });

    it('should map the #otherAsian input to the otherAsian control', () => {
      const input = fixture.debugElement.query(By.css('#otherAsian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['otherAsian'].value).toEqual(true);
    });

    it('should map the #otherAsianText input to the otherAsianText control', () => {
      const input = fixture.debugElement.query(By.css('#otherAsianText')).nativeElement;
      const value = 'some text';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['otherAsianText'].value).toEqual(value);
    });

    it('should map the #africanAmerican input to the africanAmerican control', () => {
      const input = fixture.debugElement.query(By.css('#africanAmerican')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['africanAmerican'].value).toEqual(true);
    });

    it('should map the #pacificIslander input to the pacificIslander control', () => {
      const input = fixture.debugElement.query(By.css('#pacificIslander')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['pacificIslander'].value).toEqual(true);
    });

    it('should map the #nativeHawaiian input to the nativeHawaiian control', () => {
      const input = fixture.debugElement.query(By.css('#nativeHawaiian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['nativeHawaiian'].value).toEqual(true);
    });

    it('should map the #guamanian input to the guamanian control', () => {
      const input = fixture.debugElement.query(By.css('#guamanian')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['guamanian'].value).toEqual(true);
    });

    it('should map the #samoan input to the samoan control', () => {
      const input = fixture.debugElement.query(By.css('#samoan')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['samoan'].value).toEqual(true);
    });

    it('should map the #otherPacificIslander input to the otherPacificIslander control', () => {
      const input = fixture.debugElement.query(By.css('#otherPacificIslander')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['otherPacificIslander'].value).toEqual(true);
    });

    it('should map the #otherPacificIslanderText input to the otherPacificIslanderText control', () => {
      const input = fixture.debugElement.query(By.css('#otherPacificIslanderText')).nativeElement;
      const value = 'some text';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['otherPacificIslanderText'].value).toEqual(value);
    });

    it('should map the #white input to the white control', () => {
      const input = fixture.debugElement.query(By.css('#white')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['white'].value).toEqual(true);
    });

    it('should map the #optOut input to the optOut control', () => {
      const input = fixture.debugElement.query(By.css('#optOut')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['optOut'].value).toEqual(true);
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

    it('should check the americanIndian input when the user enters text into the americanIndianText input', () => {
      const americanIndianText = fixture.debugElement.query(By.css('#americanIndianText')).nativeElement;
      americanIndianText.value = 'Some text';
      americanIndianText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const americanIndian = fixture.debugElement.query(By.css('#americanIndian')).nativeElement;
      expect(americanIndian.checked).toEqual(true);
    });

    it('should check the otherAsian input when the user enters text into the otherAsianText input', () => {
      const otherAsianText = fixture.debugElement.query(By.css('#otherAsianText')).nativeElement;
      otherAsianText.value = 'Some text';
      otherAsianText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const otherAsian = fixture.debugElement.query(By.css('#otherAsian')).nativeElement;
      expect(otherAsian.checked).toEqual(true);
    });

    it('should check the otherPacificIslander input when the user enters text into the otherPacificIslanderText input', () => {
      const otherPacificIslanderText = fixture.debugElement.query(By.css('#otherPacificIslanderText')).nativeElement;
      otherPacificIslanderText.value = 'Some text';
      otherPacificIslanderText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const otherPacificIslander = fixture.debugElement.query(By.css('#otherPacificIslander')).nativeElement;
      expect(otherPacificIslander.checked).toEqual(true);
    });

    it('should uncheck and disable all inputs when the opt out option is checked', () => {
      const americanIndian = fixture.debugElement.query(By.css('#americanIndian')).nativeElement;
      americanIndian.checked = true;
      americanIndian.dispatchEvent(new Event('change'));
      const americanIndianText = fixture.debugElement.query(By.css('#americanIndianText')).nativeElement;
      americanIndianText.value = 'text';
      const asian = fixture.debugElement.query(By.css('#asian')).nativeElement;
      asian.checked = true;
      asian.dispatchEvent(new Event('change'));
      const asianIndian = fixture.debugElement.query(By.css('#asianIndian')).nativeElement;
      asianIndian.checked = true;
      asianIndian.dispatchEvent(new Event('change'));
      const chinese = fixture.debugElement.query(By.css('#chinese')).nativeElement;
      chinese.checked = true;
      chinese.dispatchEvent(new Event('change'));
      const filipino = fixture.debugElement.query(By.css('#filipino')).nativeElement;
      filipino.checked = true;
      filipino.dispatchEvent(new Event('change'));
      const japanese = fixture.debugElement.query(By.css('#japanese')).nativeElement;
      japanese.checked = true;
      japanese.dispatchEvent(new Event('change'));
      const korean = fixture.debugElement.query(By.css('#korean')).nativeElement;
      korean.checked = true;
      korean.dispatchEvent(new Event('change'));
      const vietnamese = fixture.debugElement.query(By.css('#vietnamese')).nativeElement;
      vietnamese.checked = true;
      vietnamese.dispatchEvent(new Event('change'));
      const otherAsian = fixture.debugElement.query(By.css('#otherAsian')).nativeElement;
      otherAsian.checked = true;
      otherAsian.dispatchEvent(new Event('change'));
      const otherAsianText = fixture.debugElement.query(By.css('#otherAsianText')).nativeElement;
      otherAsianText.value = 'text';
      otherAsianText.dispatchEvent(new Event('input'));
      const africanAmerican = fixture.debugElement.query(By.css('#africanAmerican')).nativeElement;
      africanAmerican.checked = true;
      africanAmerican.dispatchEvent(new Event('change'));
      const pacificIslander = fixture.debugElement.query(By.css('#pacificIslander')).nativeElement;
      pacificIslander.checked = true;
      pacificIslander.dispatchEvent(new Event('change'));
      const nativeHawaiian = fixture.debugElement.query(By.css('#nativeHawaiian')).nativeElement;
      nativeHawaiian.checked = true;
      nativeHawaiian.dispatchEvent(new Event('change'));
      const guamanian = fixture.debugElement.query(By.css('#guamanian')).nativeElement;
      guamanian.checked = true;
      guamanian.dispatchEvent(new Event('change'));
      const samoan = fixture.debugElement.query(By.css('#samoan')).nativeElement;
      samoan.checked = true;
      samoan.dispatchEvent(new Event('change'));
      const otherPacificIslander = fixture.debugElement.query(By.css('#otherPacificIslander')).nativeElement;
      otherPacificIslander.checked = true;
      otherPacificIslander.dispatchEvent(new Event('change'));
      const otherPacificIslanderText = fixture.debugElement.query(By.css('#otherPacificIslanderText')).nativeElement;
      otherPacificIslanderText.value = 'text';
      otherPacificIslanderText.dispatchEvent(new Event('input'));
      const white = fixture.debugElement.query(By.css('#white')).nativeElement;
      white.checked = true;
      white.dispatchEvent(new Event('change'));


      const optOut = fixture.debugElement.query(By.css('#optOut')).nativeElement;
      optOut.checked = true;
      optOut.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(americanIndian.checked).toEqual(false);
      expect(americanIndian.disabled).toEqual(true);

      expect(americanIndianText.value).toEqual('');
      expect(americanIndianText.disabled).toEqual(true);

      expect(asian.checked).toEqual(false);
      expect(asian.disabled).toEqual(true);

      expect(asianIndian.checked).toEqual(false);
      expect(asianIndian.disabled).toEqual(true);

      expect(chinese.checked).toEqual(false);
      expect(chinese.disabled).toEqual(true);

      expect(filipino.checked).toEqual(false);
      expect(filipino.disabled).toEqual(true);

      expect(japanese.checked).toEqual(false);
      expect(japanese.disabled).toEqual(true);

      expect(korean.checked).toEqual(false);
      expect(korean.disabled).toEqual(true);

      expect(vietnamese.checked).toEqual(false);
      expect(vietnamese.disabled).toEqual(true);

      expect(otherAsian.checked).toEqual(false);
      expect(otherAsian.disabled).toEqual(true);

      expect(otherAsianText.value).toEqual('');
      expect(otherAsianText.disabled).toEqual(true);

      expect(africanAmerican.checked).toEqual(false);
      expect(africanAmerican.disabled).toEqual(true);

      expect(pacificIslander.checked).toEqual(false);
      expect(pacificIslander.disabled).toEqual(true);

      expect(nativeHawaiian.checked).toEqual(false);
      expect(nativeHawaiian.disabled).toEqual(true);

      expect(guamanian.checked).toEqual(false);
      expect(guamanian.disabled).toEqual(true);

      expect(samoan.checked).toEqual(false);
      expect(samoan.disabled).toEqual(true);

      expect(otherPacificIslander.checked).toEqual(false);
      expect(otherPacificIslander.disabled).toEqual(true);

      expect(otherPacificIslanderText.value).toEqual('');
      expect(otherPacificIslanderText.disabled).toEqual(true);

      expect(white.checked).toEqual(false);
      expect(white.disabled).toEqual(true);
    });

    it('should require the "americanIndianText" field when the "americanIndian" field is selected', () => {
      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;

      const americanIndian = fixture.debugElement.query(By.css('#americanIndian')).nativeElement;
      americanIndian.checked = true;
      americanIndian.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      nextBtn.click();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#americanIndianText-error'))).toBeTruthy();

      const americanIndianText = fixture.debugElement.query(By.css('#americanIndianText')).nativeElement;
      americanIndianText.value = 'some text';
      americanIndianText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#americanIndianText-error'))).toBeFalsy();
    });

    it('should require the "otherAsianText" field when the "otherAsian" field is selected', () => {
      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;

      const otherAsian = fixture.debugElement.query(By.css('#otherAsian')).nativeElement;
      otherAsian.checked = true;
      otherAsian.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      nextBtn.click();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#otherAsianText-error'))).toBeTruthy();

      const otherAsianText = fixture.debugElement.query(By.css('#otherAsianText')).nativeElement;
      otherAsianText.value = 'some text';
      otherAsianText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#otherAsianText-error'))).toBeFalsy();
    });

    it('should require the "otherPacificIslanderText" field when the "otherPacificIslander" field is selected', () => {
      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;

      const otherPacificIslander = fixture.debugElement.query(By.css('#otherPacificIslander')).nativeElement;
      otherPacificIslander.checked = true;
      otherPacificIslander.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      nextBtn.click();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#otherPacificIslanderText-error'))).toBeTruthy();

      const otherPacificIslanderText = fixture.debugElement.query(By.css('#otherPacificIslanderText')).nativeElement;
      otherPacificIslanderText.value = 'some text';
      otherPacificIslanderText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#otherPacificIslanderText-error'))).toBeFalsy();
    });
  });
});
