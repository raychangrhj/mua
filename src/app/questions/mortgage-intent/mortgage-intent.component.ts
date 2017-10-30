import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { QuestionsBaseComponent } from '../shared/questions-base/questions-base.component';
import { MortgageTypeUpdateAction } from './shared/ngrx/actions/mortgage-type/mortgage-type.action';
import { ActionBtnGroupLinkOptions } from '../../../models/action-btn-group-link-options';
import { getCustomerTypeState } from '../customer/shared/ngrx/reducers/index.reducer';
import { getMortgageTypeState } from './shared/ngrx/reducers/index.reducer';
import { State as MortgageIntentState } from './refinance/ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-options',
  templateUrl: './mortgage-intent.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './mortgage-intent.component.scss']
})
export class QuestionsMortgageIntentComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private actionButtons$: Subscription;

  public actionBtnLinkOptions: ActionBtnGroupLinkOptions;

  public ngOnDestroy() {
    this.actionButtons$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getMortgageTypeState)
      .take(1)
      .subscribe((type: string) => {
        this.form.controls['loanType'].setValue(type || null);
      });

    this.actionButtons$ = this.actionBtnLinkOptions$
      .subscribe((actionBtnLinkOptions: ActionBtnGroupLinkOptions) => {
        this.actionBtnLinkOptions = actionBtnLinkOptions;
      });

    this.store.select(getCustomerTypeState)
      .subscribe((type: string) => {
        this.actionBtnLinkOptionsSubject$.next({
          back: {
            link: {
              routerLink: type === 'existing' ? '/existing-customer/confirm' : '/new-customer/confirm'
            }
          },
          next: true,
          saveAndExit: true
        });
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<MortgageIntentState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      const loanTypeIsBuy: boolean = this.form.controls['loanType'].value === 'buy';
      const saveAction: any[] = loanTypeIsBuy ? ['/mortgage-intent/buying'] : ['/mortgage-intent/refinance'];

      this.store.dispatch(new MortgageTypeUpdateAction(
        this.form.controls['loanType'].value
      ));
      this.router.navigate(saveAction);
    };
    this.form = formBuilder.group({
      loanType: [null, Validators.required]
    });
  }

}
