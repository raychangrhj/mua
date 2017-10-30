import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import * as fromAuthentication from '../actions/authentication.action';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import {
  AuthenticationPreFill,
  AuthenticationPreFillResponse,
  AuthenticationResponse,
} from '../../../../../../models/service-responses';
import { DOBUpdateAction } from '../../../shared/ngrx/actions/dob/dob.action';
import { EmailUpdateAction } from '../../../shared/ngrx/actions/email/email.action';
import { NameUpdateAction } from '../../../shared/ngrx/actions/name/name.action';
import { PhoneUpdateAction } from '../../../shared/ngrx/actions/phone/phone.action';
import { SSNUpdateAction } from '../../../shared/ngrx/actions/ssn/ssn.action';
import { AddressUpdateAction } from '../../../shared/ngrx/actions/address/address.action';
import { Go } from '../../../../../ngrx/actions/router.action';
import {
  AuthenticationAnswerSubmitAction,
  AuthenticationAuthenticateAction,
  AuthenticationByDebitAction,
  AuthenticationQuestionUpdateAction,
  AuthenticationSuccessAction
} from '../actions/authentication.action';
import {
  AuthenticationAnswerState,
  AuthenticationDebitForm,
  AuthenticationForm
} from '../reducers/authentication.reducer';
import { ApplicationRcifIdUpdateAction } from '../../../../../ngrx/actions/application.action';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  authenticate$: Observable<Action> = this.actions$
    .ofType<AuthenticationAuthenticateAction>(fromAuthentication.AUTHENTICATE)
    .map(action => action.payload)
    .switchMap((authenticationForm: AuthenticationForm): Observable<Action> => {
      if (!authenticationForm.username || !authenticationForm.password) {
        return empty();
      }

      return this.authenticationService
        .authenticate(authenticationForm)
        .take(1)
        .switchMap((authResponse: AuthenticationResponse): Action[] => {
          const validAuth = authResponse && authResponse.data;
          return [
            new AuthenticationQuestionUpdateAction({
              description: validAuth && authResponse.data.question,
              id: validAuth && authResponse.data.id,
              questionId: validAuth && authResponse.data.questionId,
              sessionId: validAuth && authResponse.data.sessionId,
              version: validAuth && authResponse.data.version,
              email: validAuth && authResponse.data.email
            }),
            new Go({
              path: ['/existing-customer/online-banking/security-question']
            })
          ]
        });
    });

  @Effect()
  authenticateByDebit$: Observable<Action> = this.actions$
    .ofType<AuthenticationByDebitAction>(fromAuthentication.BY_DEBIT)
    .map(action => action.payload)
    .switchMap((authenticationForm: AuthenticationDebitForm): Observable<Action> => {
      if (!authenticationForm.cardNumber || !authenticationForm.pinNumber) {
        return empty();
      }

      return this.authenticationService
        .authenticateByDebit(authenticationForm)
        .take(1)
        .switchMap((authResponse: AuthenticationPreFillResponse): Action[] => [
          new AuthenticationSuccessAction(authResponse && authResponse.data || null)
        ])
    });

  @Effect()
  authenticateAnswerSubmit$: Observable<Action> = this.actions$
    .ofType<AuthenticationAnswerSubmitAction>(fromAuthentication.ANSWER_SUBMIT)
    .map(action => action.payload)
    .switchMap((answerState: AuthenticationAnswerState): Observable<Action> => {
      if (!answerState) {
        return empty();
      }

      return this.authenticationService
        .authenticateAnswer(answerState)
        .take(1)
        .switchMap((authResponse: AuthenticationPreFillResponse): Action[] => [
          new AuthenticationSuccessAction(authResponse && authResponse.data || null)
        ]);
    });

  @Effect()
  authenticated$: Observable<Action> = this.actions$
    .ofType<AuthenticationSuccessAction>(fromAuthentication.SUCCESS)
    .map(action => action.payload)
    .switchMap((authenticationPreFill: AuthenticationPreFill): Action[] => {
      return [
        new ApplicationRcifIdUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.rcifId : null
        ),
        new DOBUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.dob : null
        ),
        new EmailUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.email : null
        ),
        new NameUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.name : {
            first: null,
            middle: null,
            last: null,
            suffix: null
          }
        ),
        new PhoneUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.phone : {
            number: null,
            type: null
          }
        ),
        new SSNUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.ssn : null
        ),
        new AddressUpdateAction(
          authenticationPreFill.customer ? authenticationPreFill.customer.address : {
            street: null,
            unit: null,
            city: null,
            state: null,
            zip: null
          }
        ),
        new Go({path: ['/existing-customer/confirm-address']})
      ]
    });

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) { }
}
