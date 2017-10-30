import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TwoColumnComponent } from '../../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../../loan-officer-manager/loan-officer-manager-routes.module';
import { ProgressUpdateService } from '../../core/progress-update.service';
import { QuestionsAssetsAccountsComponent } from '../../assets/acounts/accounts.component';
import { QuestionsAssetsAccountsBankNameComponent } from '../../assets/acounts/bank-name/bank-name.component';
import { QuestionsAssetsAccountsTypeComponent } from '../../assets/acounts/type/type.component';
import { QuestionsAssetsAccountsBalanceComponent } from '../../assets/acounts/balance/balance.component';
import { AccountService } from '../../assets/core/account.service';
import { QuestionsAssetsGiftsComponent } from '../../assets/gifts/gifts.component';
import { QuestionsAssetsGiftsWhoComponent } from '../../assets/gifts/who/who.component';
import { QuestionsAssetsGiftsRelationshipComponent } from '../../assets/gifts/relationship/relationship.component';
import { QuestionsAssetsGiftsAmountComponent } from '../../assets/gifts/amount/amount.component';
import { GiftService } from '../../assets/core/gift.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 90,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/gift'],
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsAccountsComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'bank-name',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/accounts/type'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/account'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsAccountsBankNameComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'type',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/accounts/balance'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/accounts/bank-name'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsAccountsTypeComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'balance',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/account'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/accounts/type'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsAccountsBalanceComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: ':index',
        children: [
          {
            path: 'bank-name/edit',
            resolve: {
              currentAccount: AccountService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/account'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/account'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsAccountsBankNameComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'type/edit',
            resolve: {
              currentAccount: AccountService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/account'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/account'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsAccountsTypeComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'balance/edit',
            resolve: {
              currentAccount: AccountService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/account'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/account'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsAccountsBalanceComponent
            }, includeLazyLoadOfLender]
          }
        ]
      }
    ]
  },
  {
    path: 'gift',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 90,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/required-questions'],
          actionBtnGroupLinkOptions: {
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsGiftsComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'benefactor',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/gift/relationship'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/gift'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsGiftsWhoComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'relationship',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/gift/amount'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/gift/benefactor'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsGiftsRelationshipComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: 'amount',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/co-borrower/assets/gift'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/co-borrower/assets/gift/relationship'
              }
            },
            next: true,
            saveAndExit: true
          }
        },
        children: [{
          path: '',
          outlet: 'content',
          component: QuestionsAssetsGiftsAmountComponent
        }, includeLazyLoadOfLender]
      },
      {
        path: ':index',
        children: [
          {
            path: 'benefactor/edit',
            resolve: {
              currentGift: GiftService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/gift'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsGiftsWhoComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'relationship/edit',
            resolve: {
              currentGift: GiftService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/gift'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsGiftsRelationshipComponent
            }, includeLazyLoadOfLender]
          },
          {
            path: 'amount/edit',
            resolve: {
              currentGift: GiftService
            },
            // canActivate: [],
            component: TwoColumnComponent,
            data: {
              saveAction: ['/co-borrower/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/co-borrower/assets/gift'
                  }
                },
                save: true,
                saveAndExit: true
              }
            },
            children: [{
              path: '',
              outlet: 'content',
              component: QuestionsAssetsGiftsAmountComponent
            }, includeLazyLoadOfLender]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsCoBorrowerAssetsRoutingModule { }
