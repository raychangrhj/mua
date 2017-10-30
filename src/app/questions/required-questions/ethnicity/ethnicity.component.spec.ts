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

import { QuestionsRequiredQuestionsEthnicityComponent } from './ethnicity.component';
import {
  initialNavigationState,
  reducer as navReducer
} from '../../shared/ngrx/reducers/navigation.reducer';
import { reducer as govReducer } from '../ngrx/reducers/government-questions.reducer';
import { ActionBtnGroupComponent } from '../../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../shared/progress-pills/progress-pills.component';
import { By } from '@angular/platform-browser';
import { GovernmentQuestionsEthnicityUpdateAction } from '../ngrx/actions/government-questions.action';
import { AccessibleAttributesDirective } from '../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';

describe('QuestionsRequiredQuestionsEthnicityComponent', () => {
  let component: QuestionsRequiredQuestionsEthnicityComponent;
  let fixture: ComponentFixture<QuestionsRequiredQuestionsEthnicityComponent>;
  let activatedRoute;
  let router;
  let store;

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
        QuestionsRequiredQuestionsEthnicityComponent,
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
    fixture = TestBed.createComponent(QuestionsRequiredQuestionsEthnicityComponent);
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
    it('should have the hispanic control with no default value', () => {
      expect(component.form.controls['hispanic']).toBeDefined();
      expect(component.form.controls['hispanic'].value).toEqual(null);
    });

    it('should have the mexican control with no default value', () => {
      expect(component.form.controls['mexican']).toBeDefined();
      expect(component.form.controls['mexican'].value).toEqual(null);
    });

    it('should have the puertoRican control with no default value', () => {
      expect(component.form.controls['puertoRican']).toBeDefined();
      expect(component.form.controls['puertoRican'].value).toEqual(null);
    });

    it('should have the cuban control with no default value', () => {
      expect(component.form.controls['cuban']).toBeDefined();
      expect(component.form.controls['cuban'].value).toEqual(null);
    });

    it('should have the otherHispanic control with no default value', () => {
      expect(component.form.controls['otherHispanic']).toBeDefined();
      expect(component.form.controls['otherHispanic'].value).toEqual(null);
    });

    it('should have the otherHispanicText control with no default value', () => {
      expect(component.form.controls['otherHispanicText']).toBeDefined();
      expect(component.form.controls['otherHispanicText'].value).toEqual(null);
    });

    it('should have the nonHispanic control with no default value', () => {
      expect(component.form.controls['nonHispanic']).toBeDefined();
      expect(component.form.controls['nonHispanic'].value).toEqual(null);
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
      beforeEach(() => {
        store.dispatch(new GovernmentQuestionsEthnicityUpdateAction({
          hispanic: true,
          mexican: true,
          puertoRican: true,
          cuban: true,
          otherHispanic: {
            selected: true,
            other: 'other',
          },
          nonHispanic: true,
          optOut: true,
        }));
        component.ngOnInit();
      });

      it('should set the value of the control to "yes" if the store is true OnInit', () => {
        expect(component.form.controls['hispanic'].value).toEqual(true);
        expect(component.form.controls['mexican'].value).toEqual(true);
        expect(component.form.controls['puertoRican'].value).toEqual(true);
        expect(component.form.controls['cuban'].value).toEqual(true);
        expect(component.form.controls['otherHispanic'].value).toEqual(true);
        expect(component.form.controls['otherHispanicText'].value).toEqual('other');
        expect(component.form.controls['nonHispanic'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });

      it('should not continue to subscribe to the store after setting the value', () => {
        store.dispatch(new GovernmentQuestionsEthnicityUpdateAction({
          hispanic: false,
          mexican: false,
          puertoRican: false,
          cuban: false,
          otherHispanic: {
            selected: false,
            other: 'something else',
          },
          nonHispanic: false,
          optOut: false,
        }));
        expect(component.form.controls['hispanic'].value).toEqual(true);
        expect(component.form.controls['mexican'].value).toEqual(true);
        expect(component.form.controls['puertoRican'].value).toEqual(true);
        expect(component.form.controls['cuban'].value).toEqual(true);
        expect(component.form.controls['otherHispanic'].value).toEqual(true);
        expect(component.form.controls['otherHispanicText'].value).toEqual('other');
        expect(component.form.controls['nonHispanic'].value).toEqual(true);
        expect(component.form.controls['optOut'].value).toEqual(true);
      });
    });
  });

  it('should unsubscribe from the valueChanges once the component is destroyed', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    spyOn(component.form.controls['hispanic'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['mexican'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['puertoRican'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['cuban'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['otherHispanic'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['otherHispanicText'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['nonHispanic'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });
    spyOn(component.form.controls['optOut'].valueChanges, 'subscribe').and.returnValue({
      unsubscribe: unsubscribeSpy
    });

    component.ngOnInit();
    expect(component.form.controls['hispanic'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['mexican'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['puertoRican'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['cuban'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherHispanic'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['otherHispanicText'].valueChanges.subscribe).not.toHaveBeenCalled();
    expect(component.form.controls['nonHispanic'].valueChanges.subscribe).toHaveBeenCalledTimes(1);
    expect(component.form.controls['optOut'].valueChanges.subscribe).not.toHaveBeenCalled();

    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(6);
  });

  it('should have a method to remove the required validator on optOut when any other option is selected', () => {
    component.form.controls['optOut'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['hispanic'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['hispanic'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['mexican'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['mexican'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['puertoRican'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['puertoRican'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['cuban'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['cuban'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['otherHispanic'].setValue(true);
    component.form.controls['otherHispanicText'].setValue('text');
    expect(component.form.valid).toBeTruthy();
    component.form.controls['otherHispanic'].setValue(null);
    component.form.controls['otherHispanicText'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['nonHispanic'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['nonHispanic'].setValue(null);
    expect(component.form.valid).toBeFalsy();

    component.form.controls['optOut'].setValue(true);
    expect(component.form.valid).toBeTruthy();
    component.form.controls['optOut'].setValue(null);
    expect(component.form.valid).toBeFalsy();
  });

  it('should have the otherHispanicChange method', () => {
    expect(component.otherHispanicChange).toEqual(jasmine.any(Function));
  });

  describe('otherHispanicChange', () => {
    it('should require otherHispanicText when otherHispanic is valid', () => {
      component.form.controls['otherHispanic'].setValue(true);
      component.otherHispanicChange();
      expect(component.form.controls['otherHispanicText'].valid).toBeFalsy();

      component.form.controls['otherHispanic'].setValue(false);
      component.otherHispanicChange();
      expect(component.form.controls['otherHispanicText'].valid).toBeTruthy();
    });

    it('should clear the otherHispanicText whenever the otherHispanic option is deselected', () => {
      component.form.controls['otherHispanic'].setValue(true);
      component.otherHispanicChange();
      component.form.controls['otherHispanicText'].setValue('some text');

      component.form.controls['otherHispanic'].setValue(false);
      component.otherHispanicChange();
      expect(component.form.controls['otherHispanicText'].value).toEqual(null);
    });
  });

  it('should have the optOutChange method', () => {
    expect(component.optOutChange).toEqual(jasmine.any(Function));
  });

  describe('optOutChange', () => {
    beforeEach(() => {
      component.form.controls['hispanic'].setValue('something');
      component.form.controls['mexican'].setValue('something');
      component.form.controls['puertoRican'].setValue('something');
      component.form.controls['cuban'].setValue('something');
      component.form.controls['otherHispanic'].setValue('something');
      component.form.controls['otherHispanicText'].setValue('something');
      component.form.controls['nonHispanic'].setValue('something');
    });

    it('should disable and clear all the other inputs when the user opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      expect(component.form.controls['hispanic'].value).toEqual(null);
      expect(component.form.controls['hispanic'].disabled).toEqual(true);

      expect(component.form.controls['mexican'].value).toEqual(null);
      expect(component.form.controls['mexican'].disabled).toEqual(true);

      expect(component.form.controls['puertoRican'].value).toEqual(null);
      expect(component.form.controls['puertoRican'].disabled).toEqual(true);

      expect(component.form.controls['cuban'].value).toEqual(null);
      expect(component.form.controls['cuban'].disabled).toEqual(true);

      expect(component.form.controls['otherHispanic'].value).toEqual(null);
      expect(component.form.controls['otherHispanic'].disabled).toEqual(true);

      expect(component.form.controls['otherHispanicText'].value).toEqual(null);
      expect(component.form.controls['otherHispanicText'].disabled).toEqual(true);

      expect(component.form.controls['nonHispanic'].value).toEqual(null);
      expect(component.form.controls['nonHispanic'].disabled).toEqual(true);
    });

    it('should re-enable all the other inputs when the user deselects opts out', () => {
      component.form.controls['optOut'].setValue(true);
      component.optOutChange();

      component.form.controls['optOut'].setValue(false);
      component.optOutChange();

      expect(component.form.controls['hispanic'].disabled).toEqual(false);
      expect(component.form.controls['mexican'].disabled).toEqual(false);
      expect(component.form.controls['puertoRican'].disabled).toEqual(false);
      expect(component.form.controls['cuban'].disabled).toEqual(false);
      expect(component.form.controls['otherHispanic'].disabled).toEqual(false);
      expect(component.form.controls['otherHispanicText'].disabled).toEqual(false);
      expect(component.form.controls['nonHispanic'].disabled).toEqual(false);
    });
  });

  it('should have the otherHispanicTextChange method', () => {
    expect(component.otherHispanicTextChange).toEqual(jasmine.any(Function));
  });

  describe('otherHispanicTextChange', () => {
    beforeEach(() => {
      component.form.controls['otherHispanic'].setValue(false);
    });

    it('should enable the otherHispanic option when otherHispanicText is entered', () => {
      component.form.controls['otherHispanicText'].setValue('something');
      component.otherHispanicTextChange();

      expect(component.form.controls['otherHispanic'].value).toEqual(true);
      expect(component.form.valid).toEqual(true);
    });

    it('should not enable the otherHispanic option when otherHispanicText is a blank string', () => {
      component.form.controls['otherHispanicText'].setValue('   ');
      component.otherHispanicTextChange();

      expect(component.form.controls['otherHispanic'].value).toEqual(false);
      expect(component.form.valid).toEqual(false);
    });
  });

  describe('setting up onSubmitMethod', () => {
    beforeEach(() => {
      component.form = ({
        valid: true,
        value: {
          hispanic: 'hispanic',
          mexican: 'mexican',
          puertoRican: 'puertoRican',
          cuban: 'cuban',
          otherHispanic: 'otherHispanic',
          otherHispanicText: 'otherHispanicText',
          nonHispanic: 'nonHispanic',
          optOut: 'optOut'
        }
      } as FormGroup);
      component.onSubmit();
    });

    it('should dispatch an event to update the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new GovernmentQuestionsEthnicityUpdateAction({
        hispanic: component.form.value.hispanic,
        mexican: component.form.value.mexican,
        puertoRican: component.form.value.puertoRican,
        cuban: component.form.value.cuban,
        otherHispanic: {
          selected: component.form.value.otherHispanic,
          other: component.form.value.otherHispanicText,
        },
        nonHispanic: component.form.value.nonHispanic,
        optOut: component.form.value.optOut
      }));
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #hispanic input to the hispanic control', () => {
      const input = fixture.debugElement.query(By.css('#hispanic')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['hispanic'].value).toEqual(true);
    });

    it('should map the #mexican input to the mexican control', () => {
      const input = fixture.debugElement.query(By.css('#mexican')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['mexican'].value).toEqual(true);
    });

    it('should map the #puertoRican input to the puertoRican control', () => {
      const input = fixture.debugElement.query(By.css('#puertoRican')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['puertoRican'].value).toEqual(true);
    });

    it('should map the #cuban input to the cuban control', () => {
      const input = fixture.debugElement.query(By.css('#cuban')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['cuban'].value).toEqual(true);
    });

    it('should map the #otherHispanic input to the otherHispanic control', () => {
      const input = fixture.debugElement.query(By.css('#otherHispanic')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['otherHispanic'].value).toEqual(true);
    });

    it('should map the #otherHispanicText input to the otherHispanicText control', () => {
      const input = fixture.debugElement.query(By.css('#otherHispanicText')).nativeElement;
      const value = 'Some text';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['otherHispanicText'].value).toEqual(value);
    });

    it('should map the #nonHispanic input to the nonHispanic control', () => {
      const input = fixture.debugElement.query(By.css('#nonHispanic')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['nonHispanic'].value).toEqual(true);
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

    it('should check the otherHispanic input when the user enters text into the otherHispanicText input', () => {
      const otherHispanicText = fixture.debugElement.query(By.css('#otherHispanicText')).nativeElement;
      otherHispanicText.value = 'Some text';
      otherHispanicText.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const otherHispanic = fixture.debugElement.query(By.css('#otherHispanic')).nativeElement;
      expect(otherHispanic.checked).toEqual(true);
    });

    it('should uncheck and disable all inputs when the opt out option is checked', () => {
      const hispanic = fixture.debugElement.query(By.css('#hispanic')).nativeElement;
      hispanic.checked = true;
      hispanic.dispatchEvent(new Event('change'));
      const mexican = fixture.debugElement.query(By.css('#mexican')).nativeElement;
      mexican.checked = true;
      mexican.dispatchEvent(new Event('change'));
      const puertoRican = fixture.debugElement.query(By.css('#puertoRican')).nativeElement;
      puertoRican.checked = true;
      puertoRican.dispatchEvent(new Event('change'));
      const cuban = fixture.debugElement.query(By.css('#cuban')).nativeElement;
      cuban.checked = true;
      cuban.dispatchEvent(new Event('change'));
      const otherHispanic = fixture.debugElement.query(By.css('#otherHispanic')).nativeElement;
      otherHispanic.checked = true;
      otherHispanic.dispatchEvent(new Event('change'));
      const otherHispanicText = fixture.debugElement.query(By.css('#otherHispanicText')).nativeElement;
      otherHispanicText.value = 'some text';
      otherHispanicText.dispatchEvent(new Event('input'));
      const nonHispanic = fixture.debugElement.query(By.css('#nonHispanic')).nativeElement;
      nonHispanic.checked = true;
      nonHispanic.dispatchEvent(new Event('change'));

      const optOut = fixture.debugElement.query(By.css('#optOut')).nativeElement;
      optOut.checked = true;
      optOut.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(hispanic.checked).toEqual(false);
      expect(hispanic.disabled).toEqual(true);

      expect(mexican.checked).toEqual(false);
      expect(mexican.disabled).toEqual(true);

      expect(puertoRican.checked).toEqual(false);
      expect(puertoRican.disabled).toEqual(true);

      expect(cuban.checked).toEqual(false);
      expect(cuban.disabled).toEqual(true);

      expect(otherHispanic.checked).toEqual(false);
      expect(otherHispanic.disabled).toEqual(true);

      expect(otherHispanicText.value).toEqual('');
      expect(otherHispanicText.disabled).toEqual(true);

      expect(nonHispanic.checked).toEqual(false);
      expect(nonHispanic.disabled).toEqual(true);
    });

    it('should require the "otherHispanicText" field when the "otherHispanic" field is selected', () => {
      const inputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(inputGroup.classList).not.toContain('error');

      const otherHispanic = fixture.debugElement.query(By.css('#otherHispanic')).nativeElement;
      otherHispanic.checked = true;
      otherHispanic.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(inputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.input-group-otherHispanic .error-required'))).toBeTruthy();
    });
  });
});
