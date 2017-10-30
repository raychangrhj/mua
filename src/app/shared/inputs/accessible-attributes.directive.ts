import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormControl
} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';

@Directive({
  selector: '[regionsAccessibleAttributes]'
})
export class AccessibleAttributesDirective implements OnInit, OnDestroy {
  @Input('regionsAccessibleAttributes')
  private regionsAccessibleAttributes: FormControl;
  @Input('formSubmitObservable')
  private formSubmitObservable: Subject<boolean>;
  private formSubmitAttempted = false;
  private statusSubscription: Subscription;
  private isRequired: boolean;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  private onStatusChange() {
    const invalid = (
      this.regionsAccessibleAttributes.touched && this.regionsAccessibleAttributes.invalid
    ) || (
      !this.regionsAccessibleAttributes.touched && this.formSubmitAttempted
    );
    this.renderer.setAttribute(this.el.nativeElement, 'aria-invalid', invalid.toString());
    if (invalid) {
      this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.el.nativeElement.id + '-error');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'aria-describedby');
    }
  }
  public ngOnInit() {
    const hasFormControlValidator =
      this.regionsAccessibleAttributes
      && this.regionsAccessibleAttributes.validator
      && this.regionsAccessibleAttributes.validator(this.regionsAccessibleAttributes);
    this.isRequired = hasFormControlValidator && this.regionsAccessibleAttributes.validator(this.regionsAccessibleAttributes).required;
    if (this.isRequired) {
      this.renderer.setAttribute(this.el.nativeElement, 'required', 'true');
      this.renderer.setAttribute(this.el.nativeElement, 'aria-required', 'true');
    }
    // On Change
    this.regionsAccessibleAttributes.valueChanges.take(1).subscribe(() => {
      if (this.regionsAccessibleAttributes.dirty) {
        this.onStatusChange();
        this.statusSubscription = this.regionsAccessibleAttributes.statusChanges.subscribe(() => {
          this.onStatusChange();
        });
      }
    });
    // On Submit
    if (this.formSubmitObservable) {
      this.formSubmitObservable.subscribe((val: boolean) => {
        this.formSubmitAttempted = val;
        this.onStatusChange();
      });
    }
  }
  public ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
}

