import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  Store,
  Action
} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import * as NavigationActions from '../actions/navigation.action';
import { DataStore } from '../../../../../models/service-responses';
import { ApplicationSubmitService } from '../../../core/application-submit.service';
import { ApplicationState } from '../../../../ngrx/reducers/application.reducer';
import { Observable } from 'rxjs/Observable';
import { NavigationSectionState } from '../reducers/navigation.reducer';
import { Go } from '../../../../ngrx/actions/router.action';
import { ApplicationIdUpdateAction } from '../../../../ngrx/actions/application.action';

@Injectable()
export class ApplicationSubmitEffect {
  @Effect()
  submit$: Observable<Action> = this.actions$
    .ofType(NavigationActions.COMPLETE_SECTION)
    .map((action: NavigationActions.NavigationCompleteSectionAction) => action.payload)
    .switchMap((sectionId: number): Observable<Action> => {
      let nextNavSection: NavigationSectionState;
      return this.store
        .take(1)
        .mergeMap((dataStore: DataStore): Observable<Action> => {
          const data: DataStore = Object.assign({}, dataStore);
          const application: ApplicationState & DataStore = Object.assign({}, data.application);

          const buildDataObject = {
            10: () => {
              Object.assign(application, {customer: data.customer});
              nextNavSection = data.navigation.sections.find(section => section.id === 20);
            },
            20: () => {
              if (data.mortgageIntent.mortgageType === 'buy') {
                Object.assign(application, {
                  mortgageIntent: {
                    propertyLocation: data.mortgageIntent.propertyLocation,
                    primaryUse: data.mortgageIntent.primaryUse,
                    primaryResidence: data.mortgageIntent.primaryResidence,
                    mortgageType: data.mortgageIntent.mortgageType,
                    buying: {
                      cost: data.mortgageIntent.cost,
                      downPayment: data.mortgageIntent.downPayment
                    }
                  }
                });
              } else if (data.mortgageIntent.mortgageType === 'pre-qualification') {
                Object.assign(application, {
                  mortgageIntent: {
                    primaryUse: data.mortgageIntent.primaryUse,
                    primaryResidence: data.mortgageIntent.primaryResidence,
                    mortgageType: data.mortgageIntent.mortgageType,
                    preQualification: {
                      cost: data.mortgageIntent.cost,
                      downPayment: data.mortgageIntent.downPayment
                    }
                  }
                });
              } else {
                Object.assign(
                  application, {
                    mortgageIntent: Object.assign(data.mortgageIntent, {
                      refinance: data.refinance
                    })
                  }
                );
              }
              nextNavSection = data.navigation.sections.find(section => section.id === 30);
            },
            30: () => {
              data.income.other.forEach((income, index) => income.id = index);
              data.income.employment.forEach((employment, index) => employment.id = index);
              Object.assign(application, {
                income: {
                  other: data.income.other,
                  employment: data.income.employment
                }
              });
              nextNavSection = data.navigation.sections.find(section => section.id === 40);
            },
            40: () => {
              data.assets.gifts.forEach((gift, index) => gift.id = index);
              data.assets.accounts.forEach((account, index) => account.id = index);
              Object.assign(application, {
                assets: {
                  gifts: data.assets.gifts,
                  accounts: data.assets.accounts
                }
              });
              nextNavSection = data.navigation.sections.find(section => section.id === 50);
            },
            50: () => {
              Object.assign(application, {governmentQuestions: data.governmentQuestions});
              nextNavSection = data.navigation.sections.find(section => section.id === 200);
            },
            60: () => {
              Object.assign(application, {customer: data.customer});
              nextNavSection = data.navigation.sections.find(section => section.id === 80);
            },
            80: () => {
              data.income.other.forEach((income, index) => income.id = index);
              data.income.employment.forEach((employment, index) => employment.id = index);
              Object.assign(application, {
                income: {
                  other: data.income.other,
                  employment: data.income.employment
                }
              });
              nextNavSection = data.navigation.sections.find(section => section.id === 90);
            },
            90: () => {
              data.assets.gifts.forEach((gift, index) => gift.id = index);
              data.assets.accounts.forEach((account, index) => account.id = index);
              Object.assign(application, {
                assets: {
                  gifts: data.assets.gifts,
                  accounts: data.assets.accounts
                }
              });
              nextNavSection = data.navigation.sections.find(section => section.id === 100);
            },
            100: () => {
              Object.assign(application, {governmentQuestions: data.governmentQuestions});
              nextNavSection = data.navigation.sections.find(section => section.id === 300);
            },
            'default': () => Observable.empty()
          };
          const executeSection = buildDataObject[sectionId];
          executeSection ? executeSection() : buildDataObject['default']();

          return this.applicationSubmitService.submit(application)
            .take(1)
            .mergeMap((response): Action[] => {
              const responseHasId: string = response && response.data && response.data.id;
              const actions: Action[] = [new Go({
                path: nextNavSection.baseLink
              }), new ApplicationIdUpdateAction(responseHasId)];
              return responseHasId ? actions : [actions[0]];
            });
        });
    });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private applicationSubmitService: ApplicationSubmitService
  ) {}
}
