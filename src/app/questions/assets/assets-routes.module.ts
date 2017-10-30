import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ProgressUpdateService } from '../core/progress-update.service';
import { TwoColumnComponent } from '../../shared/two-column/two-column.component';
import { includeLazyLoadOfLender } from '../../loan-officer-manager/loan-officer-manager-routes.module';
import { QuestionsAssetsAccountsComponent } from './acounts/accounts.component';
import { QuestionsAssetsAccountsBankNameComponent } from './acounts/bank-name/bank-name.component';
import { QuestionsAssetsAccountsTypeComponent } from './acounts/type/type.component';
import { QuestionsAssetsAccountsBalanceComponent } from './acounts/balance/balance.component';
import { QuestionsAssetsGiftsAmountComponent } from './gifts/amount/amount.component';
import { QuestionsAssetsGiftsRelationshipComponent } from './gifts/relationship/relationship.component';
import { QuestionsAssetsGiftsWhoComponent } from './gifts/who/who.component';
import { QuestionsAssetsGiftsComponent } from './gifts/gifts.component';
import { AccountService } from './core/account.service';
import { GiftService } from './core/gift.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full'
  },
  {
    path: 'accounts',
    resolve: {
      progressUpdate: ProgressUpdateService
    },
    data: {
      sectionId: 40,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/assets/gift'],
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
          saveAction: ['/assets/accounts/type'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/accounts'
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
          saveAction: ['/assets/accounts/balance'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/accounts/bank-name'
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
          saveAction: ['/assets/accounts'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/accounts/type'
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
              saveAction: ['/assets/accounts'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/accounts'
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
              saveAction: ['/assets/accounts'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/accounts'
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
              saveAction: ['/assets/accounts'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/accounts'
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
      sectionId: 40,
    },
    children: [
      {
        path: '',
        // canActivate: [],
        component: TwoColumnComponent,
        data: {
          saveAction: ['/required-questions'],
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
          saveAction: ['/assets/gift/relationship'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/gift'
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
          saveAction: ['/assets/gift/amount'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/gift/benefactor'
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
          saveAction: ['/assets/gift'],
          actionBtnGroupLinkOptions: {
            back: {
              link: {
                routerLink: '/assets/gift/relationship'
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
              saveAction: ['/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/gift'
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
              saveAction: ['/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/gift'
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
              saveAction: ['/assets/gift'],
              actionBtnGroupLinkOptions: {
                cancel: {
                  link: {
                    routerLink: '/assets/gift'
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
export class QuestionsAssetsRoutingModule { }
