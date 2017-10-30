import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[regionsInputGroup]'
})
export class InputGroupDirective implements OnChanges, OnInit, OnDestroy {

  @Input('formSubmitAttempted')
  private formSubmitAttempted: boolean;
  @Input('regionsInputGroup')
  private regionsInputGroup: FormControl;
  // This points to the css reference for styling
  private errorString = 'error';
  private stateChanges$: Subscription;

  public nativeElement: HTMLElement;

  private updateErrorClass() {
    const hasError = (this.formSubmitAttempted && !this.regionsInputGroup.dirty)
      || (this.regionsInputGroup.dirty && !this.regionsInputGroup.valid);
    this.nativeElement.classList[hasError ? 'add' : 'remove'](this.errorString);
  }

  public hasError(): boolean {
    return this.regionsInputGroup.invalid;
  }

  public focusInput() {
    const input: HTMLElement = (this.nativeElement.querySelector('[formControlName]') as HTMLElement);
    if (input && input.focus) {
      input.focus();
    }
  }

  public ngOnChanges() {
    this.updateErrorClass();
  }

  public ngOnDestroy() {
    this.stateChanges$.unsubscribe();
  }

  public ngOnInit() {
    this.stateChanges$ = this.regionsInputGroup.statusChanges.subscribe(() => {
      this.updateErrorClass();
    });
  }

  constructor(
    private el: ElementRef
  ) {
    this.nativeElement = el.nativeElement;
  }

}
