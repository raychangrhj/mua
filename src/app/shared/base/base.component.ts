import {
  AfterViewInit,
  Component,
  HostBinding,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/merge';
import { Subject } from 'rxjs/Subject';

import { ActionBtnGroupLinkOptions } from '../../../models/action-btn-group-link-options';
import { InputGroupDirective } from '../inputs/input-group.directive';

@Component({
  selector: 'regions-base',
  template: '<div></div>',
})
export class BaseComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.role')
  private role = 'main';

  @ViewChildren(InputGroupDirective)
  private inputGroup: QueryList<InputGroupDirective>;

  @ViewChildren('pageHeading')
  private heading;

  protected actionBtnLinkOptionsSubject$: Subject<ActionBtnGroupLinkOptions>;

  public saveAction: string[];
  public actionBtnLinkOptions$: Observable<ActionBtnGroupLinkOptions>;

  public onSubmit() {
    if (this.saveAction && Array.isArray(this.saveAction) && this.saveAction.length) {
      this.router.navigate(this.saveAction);
    }
  }

  public ngAfterViewInit() {
    if (this.inputGroup && this.inputGroup.first) {
      this.inputGroup.first.focusInput();
    } else if (this.heading && this.heading.first) {
      this.heading.first.nativeElement.focus();
    }
  }

  public ngOnInit() {
    this.actionBtnLinkOptionsSubject$ = new Subject();

    this.actionBtnLinkOptions$ = Observable.merge(
      this.actionBtnLinkOptionsSubject$,
      this.activatedRoute.data.map((obj): ActionBtnGroupLinkOptions => obj.actionBtnGroupLinkOptions),
    );

    this.activatedRoute.data
      .map((obj): any[] => obj.saveAction)
      .take(1)
      .subscribe((saveAction: any[]): void => {
        this.saveAction = saveAction;
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) { }

}
