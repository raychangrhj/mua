import {
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {
  getNavigationActiveSectionTitleState,
  getNavigationPillsState
} from '../ngrx/reducers/navigation.reducer';
import { BaseComponent } from '../../../shared/base/base.component';
import { InputGroupDirective } from '../../../shared/inputs/input-group.directive';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'regions-question-base',
  template: '<div></div>'
})
export class QuestionsBaseComponent extends BaseComponent implements OnInit {

  public form: FormGroup;
  public pillsTitle$: Observable<string>;
  public pills$: Observable<string[]>;
  public formSubmitAttempted$: Subject<boolean> = new Subject();
  public onSubmitMethod: Function;

  @ViewChildren(InputGroupDirective)
  private inputGroupElem: QueryList<InputGroupDirective>;

  public onSubmit() {
    if (!this.form) {
      super.onSubmit();
      return
    }
    this.formSubmitAttempted$.next(true);
    if (this.form.valid) {
      if (this.onSubmitMethod) {
        this.onSubmitMethod();
      }
      super.onSubmit();
    } else {
      // TODO test this
      const errorInputGroups = this.inputGroupElem.find(elem => elem.hasError());
      if (errorInputGroups) {
        errorInputGroups.focusInput();
      }
    }
  }

  public ngOnInit() {
    super.ngOnInit();
    this.pillsTitle$ = this.store.select(getNavigationActiveSectionTitleState);
    this.pills$ = this.store.select(getNavigationPillsState);
    this.formSubmitAttempted$.next(false);
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<any>
  ) {
    super(router, activatedRoute);
  }

}
