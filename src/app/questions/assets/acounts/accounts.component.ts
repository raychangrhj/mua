import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import {
  AssetsState,
  getAccountsState
} from '../ngrx/reducers/index.reducer';
import { Store } from '@ngrx/store';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { TempAccountClearAction } from '../ngrx/actions/temp-accounts/temp-accounts.action';
import { AccountStateObject } from '../ngrx/reducers/accounts/accounts.reducer';
import { Subscription } from 'rxjs/Subscription';
import { AccountDeleteAction } from '../ngrx/actions/acounts/acounts.action';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { getMortgageTypeState } from '../../mortgage-intent/shared/ngrx/reducers/index.reducer';
import { NavigationCompleteSectionAction } from '../../shared/ngrx/actions/navigation.action';

@Component({
  selector: 'regions-account',
  templateUrl: './accounts.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './accounts.component.scss']
})
export class QuestionsAssetsAccountsComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private accounts: AccountStateObject[];
  private accountsStateObject$: Subscription;

  public displayAccounts: any[];
  public baseUrl: string;

  public removeAccount(i: number) {
    this.store.dispatch(new AccountDeleteAction(this.accounts[i]));
  }

  public ngOnDestroy() {
    this.accountsStateObject$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new TempAccountClearAction());

    this.activatedRoute.data.map(obj => obj.sectionId).take(1).subscribe((sectionId: number) => {
      this.baseUrl = sectionId === 40 ? '' : '/co-borrower';

      this.store.select(getMortgageTypeState)
        .take(1)
        .subscribe((type: string) => {
          if (type === 'refinance') {
            this.onSubmitMethod = () => {
              this.saveAction = ['/required-questions'];
              this.store.dispatch(new NavigationCompleteSectionAction(sectionId));
            };
          }
        });

      this.accountsStateObject$ = this.store.select(getAccountsState)
        .subscribe((accounts: AccountStateObject[]) => {
          this.accounts = accounts;
          this.displayAccounts = [];

          if (accounts.length) {
            this.form.controls['hasAccounts'].enable();
            this.form.controls['hasAccounts'].setValue(true);

            this.form.controls['noAccounts'].disable();
          } else {
            this.form.controls['hasAccounts'].setValue(false);
            this.form.controls['hasAccounts'].disable();

            this.form.controls['noAccounts'].enable();
          }

          accounts.forEach((account: AccountStateObject, i: number) => {
            this.displayAccounts.push({
              title: account.bankName,
              answers: [{
                title: 'Bank Name',
                response: Observable.of(account.bankName),
                returnLink: `${this.baseUrl}/assets/accounts/${i}/bank-name/edit`
              }, {
                title: 'Account Type',
                response: Observable.of(account.type),
                returnLink: `${this.baseUrl}/assets/accounts/${i}/type/edit`,
                type: 'account-type'
              }, {
                title: 'Account Balance',
                response: Observable.of(account.balance),
                returnLink: `${this.baseUrl}/assets/accounts/${i}/balance/edit`,
                type: 'currency'
              }]
            });
          });
        });
    });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AssetsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);

    this.form = formBuilder.group({
      noAccounts: [null, Validators.requiredTrue],
      hasAccounts: [null, Validators.requiredTrue]
    });
  }

}
