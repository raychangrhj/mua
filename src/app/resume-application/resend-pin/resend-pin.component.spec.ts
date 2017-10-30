import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ResendPinComponent } from './resend-pin.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../questions/shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../shared/inputs/input-group.directive';

describe('ResendPinComponent', () => {
  let component: ResendPinComponent;
  let fixture: ComponentFixture<ResendPinComponent>;
  let activatedRoute;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
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
        ResendPinComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        ActionBtnGroupComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute], (_router_, _activatedRoute_) => {
    router = _router_;
    spyOn(router, 'navigate');

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          saveAndExit: {
            link: {
              routerLink: '/welcome'
            },
            text: 'Return to Application Start'
          }
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendPinComponent);
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
    it('should have a email control defaulted to null', () => {
      expect(component.form.controls['email']).toBeDefined();
      expect(component.form.controls['email'].value).toEqual(null);
    });

    it('should require the email control, and validate it is an email', () => {
      component.form.controls['email'].setValue(null);
      expect(component.form.valid).toEqual(false);

      component.form.controls['email'].setValue('2003-03-03');
      expect(component.form.valid).toEqual(false);

      component.form.controls['email'].setValue('calvin@cox.com');
      expect(component.form.valid).toEqual(true);
    });
  });

  describe('onSubmit method', () => {
    describe('with an invalid form', () => {
      beforeEach(() => {
        component.form = ({
          valid: false,
          value: {
            email: 'email'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should not route the user to the save action', () => {
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    describe('with a valid form', () => {
      beforeEach(() => {
        component.form = ({
          valid: true,
          value: {
            email: 'email'
          }
        } as FormGroup);
        component.onSubmit();
      });

      it('should route the user to the save action', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/foo']);
      });
    });
  });

  describe('HTML integration tests', () => {
    it('should map the #email input to the email control', () => {
      const input = fixture.debugElement.query(By.css('#email')).nativeElement;
      const value = 'calvin@cox.com';
      input.value = value;
      input.dispatchEvent(new Event('input'));

      expect(component.form.controls['email'].value).toEqual(value);
    });

    it('should show required error when submit is pressed', () => {
      const emailInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(emailInputGroup.classList).not.toContain('error');

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      expect(emailInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-required'))).toBeTruthy();
    });

    it('should show formatting error when value is not an email', () => {
      const emailInputGroup = fixture.debugElement.query(By.css('.input-group')).nativeElement;
      expect(emailInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#email')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(emailInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-email'))).toBeTruthy();
    });
  });
});
