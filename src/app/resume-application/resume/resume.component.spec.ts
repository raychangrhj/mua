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
import { StoreModule } from '@ngrx/store';

import { ResumeComponent } from './resume.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { reducer } from '../../questions/shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../shared/inputs/input-group.directive';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
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
        ResumeComponent,
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
          next: 'Resume',
          back: {
            link: {
              routerLink: '/welcome'
            }
          }
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
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

    it('should require the email control and validate it as an email', () => {
      component.form.controls['email'].setValue(null);
      expect(component.form.controls['email'].valid).toEqual(false);

      component.form.controls['email'].setValue('2003-03-03');
      expect(component.form.controls['email'].valid).toEqual(false);

      component.form.controls['email'].setValue('calvin@cox.com');
      expect(component.form.controls['email'].valid).toEqual(true);
    });

    it('should have a ssn control defaulted to null', () => {
      expect(component.form.controls['ssn']).toBeDefined();
      expect(component.form.controls['ssn'].value).toEqual(null);
    });

    it('should require the ssn control and validate it as 4 digits', () => {
      component.form.controls['ssn'].setValue(null);
      expect(component.form.controls['ssn'].valid).toEqual(false);

      component.form.controls['ssn'].setValue(200);
      expect(component.form.controls['ssn'].valid).toEqual(false);

      component.form.controls['ssn'].setValue(1144);
      expect(component.form.controls['ssn'].valid).toEqual(true);
    });

    it('should have a pin control defaulted to null', () => {
      expect(component.form.controls['pin']).toBeDefined();
      expect(component.form.controls['pin'].value).toEqual(null);
    });

    it('should require the pin control', () => {
      component.form.controls['pin'].setValue(null);
      expect(component.form.controls['pin'].valid).toEqual(false);

      component.form.controls['pin'].setValue('pin');
      expect(component.form.controls['pin'].valid).toEqual(true);
    });
  });

  describe('onSubmit method', () => {
    describe('with an invalid form', () => {
      beforeEach(() => {
        component.form = ({
          valid: false,
          value: {
            email: 'email',
            ssn: 'ssn',
            pin: 'pin'
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
            email: 'email',
            ssn: 'ssn',
            pin: 'pin'
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
      const email = fixture.debugElement.query(By.css('#email')).nativeElement;
      const value = 'calvin@cox.com';
      email.value = value;
      email.dispatchEvent(new Event('input'));

      expect(component.form.controls['email'].value).toEqual(value);
    });

    it('should map the #ssn input to the ssn control', () => {
      const ssn = fixture.debugElement.query(By.css('#ssn')).nativeElement;
      const value = 4455;
      ssn.value = value;
      ssn.dispatchEvent(new Event('input'));

      expect(component.form.controls['ssn'].value).toEqual(value);
    });

    it('should map the #pin input to the pin control', () => {
      const pin = fixture.debugElement.query(By.css('#pin')).nativeElement;
      const value = 'pin';
      pin.value = value;
      pin.dispatchEvent(new Event('input'));

      expect(component.form.controls['pin'].value).toEqual(value);
    });

    it('should show required errors when submit is pressed', () => {
      const inputGroups = fixture.debugElement.queryAll(By.css('.input-group'));
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).not.toContain('error');
      });

      const nextBtn = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
      nextBtn.click();
      fixture.detectChanges();
      inputGroups.forEach(inputGroup => {
        expect(inputGroup.nativeElement.classList).toContain('error');
      });
      expect(fixture.debugElement.queryAll(By.css('.error-required')).length).toEqual(3);
    });

    it('should show formatting error when value is not an email', () => {
      const emailInputGroup = fixture.debugElement.query(By.css('.input-group-email')).nativeElement;
      expect(emailInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#email')).nativeElement;
      input.value = 'calvin';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(emailInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-email'))).toBeTruthy();
    });

    it('should show formatting error when value is not last 4 of ssn', () => {
      const ssnInputGroup = fixture.debugElement.query(By.css('.input-group-ssn')).nativeElement;
      expect(ssnInputGroup.classList).not.toContain('error');

      const input = fixture.debugElement.query(By.css('#ssn')).nativeElement;
      input.value = '123456';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(ssnInputGroup.classList).toContain('error');
      expect(fixture.debugElement.query(By.css('.error-pattern'))).toBeTruthy();
    });
  });
});
