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
  Store,
  StoreModule
} from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { GeneralCoBorrowerInquiryComponent } from './co-borrower-inquiry.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { QuestionsProgressPillsComponent } from '../../questions/shared/progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../../questions/shared/ngrx/reducers/navigation.reducer';
import { BorrowerCacheService } from '../../core/borrower-cache.service';
import { By } from '@angular/platform-browser';
import { AccessibleAttributesDirective } from '../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../shared/inputs/input-group.directive';

describe('GeneralCoBorrowerInquiryComponent', () => {
  let component: GeneralCoBorrowerInquiryComponent;
  let fixture: ComponentFixture<GeneralCoBorrowerInquiryComponent>;
  let router;
  let store;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer
        })
      ],
      providers: [
        {
          provide: BorrowerCacheService,
          useValue: jasmine.createSpyObj('BorrowerCacheService', ['switchCustomerType'])
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        GeneralCoBorrowerInquiryComponent,
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
    fixture = TestBed.createComponent(GeneralCoBorrowerInquiryComponent);
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
    it('should have the coBorrower control with no default value', () => {
      expect(component.form.controls['coBorrower']).toBeDefined();
      expect(component.form.controls['coBorrower'].value).toEqual(null);
    });

    it('should require the coBorrower control', () => {
      component.form.controls['coBorrower'].setValue(null);
      expect(component.form.controls['coBorrower'].valid).toBeFalsy();

      component.form.controls['coBorrower'].setValue('coBorrower');
      expect(component.form.controls['coBorrower'].valid).toBeTruthy();
    });
  });

  describe('setting up the onSubmitMethod', () => {
    describe('with the coBorrower set to "yes"', () => {
      it('should route the user to the co-borrower hand-off page', () => {
        component.form = ({
          valid: true,
          value: {
            coBorrower: 'yes'
          }
        } as FormGroup);
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/co-borrower-inquiry/hand-off']);
      });
    });

    describe('with the coBorrower set to "no"', () => {
      it('should route the user to the patriot act page', () => {
        component.form = ({
          valid: true,
          value: {
            coBorrower: 'no'
          }
        } as FormGroup);
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['/confirm-submission']);
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #yes input to the coBorrower control', () => {
      const input = fixture.debugElement.query(By.css('#yes')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['coBorrower'].value).toEqual('yes');
    });

    it('should map the #no input to the coBorrower control', () => {
      const input = fixture.debugElement.query(By.css('#no')).nativeElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(component.form.controls['coBorrower'].value).toEqual('no');
    });

    it('should show required error when submit is pressed', () => {
      const fieldset = fixture.debugElement.query(By.css('fieldset')).nativeElement;
      expect(fieldset.classList).not.toContain('error');
      expect(fixture.debugElement.query(By.css('fieldset.error span.error-text'))).toBeFalsy();

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(fieldset.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('fieldset.error span.error-text'))).toBeTruthy();
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
