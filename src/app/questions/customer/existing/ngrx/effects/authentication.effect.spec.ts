import {
  async,
  inject,
  TestBed
} from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/skip';

import { AuthenticationEffects } from './authentication.effect';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import {
  AuthenticationPreFill,
  AuthenticationResponse,
} from '../../../../../../models/service-responses';
import {
  AuthenticationAuthenticateAction,
  AuthenticationByDebitAction,
  AuthenticationQuestionUpdateAction,
  AuthenticationSuccessAction,
} from '../actions/authentication.action';
import { DOBUpdateAction } from '../../../shared/ngrx/actions/dob/dob.action';
import { EmailUpdateAction } from '../../../shared/ngrx/actions/email/email.action';
import { NameUpdateAction } from '../../../shared/ngrx/actions/name/name.action';
import { PhoneUpdateAction } from '../../../shared/ngrx/actions/phone/phone.action';
import { SSNUpdateAction } from '../../../shared/ngrx/actions/ssn/ssn.action';
import { AddressUpdateAction } from '../../../shared/ngrx/actions/address/address.action';
import { Go } from '../../../../../ngrx/actions/router.action';
import { reducer } from '../reducers/authentication.reducer';
import { ApplicationRcifIdUpdateAction } from '../../../../../ngrx/actions/application.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('AuthenticationEffects', () => {
  let effects: AuthenticationEffects;
  let service: any;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          authentication: reducer
        })
      ],
      providers: [
        AuthenticationEffects,
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj('AuthenticationService', [
            'authenticate',
            'authenticateByDebit'
          ]),
        },
        { provide: Actions, useFactory: getActions }
      ],
    });
  });

  beforeEach(inject([AuthenticationEffects, AuthenticationService, Actions], (_effects_, _service_, _actions$_) => {
    effects = _effects_;
    service = _service_;
    actions$ = _actions$_;
  }));

  describe('authenticate$', () => {
    it('should return a new AuthenticationQuestionUpdateAction, with the security question, on success', () => {
      const authResponse: AuthenticationResponse = ({
        data: {
          question: 'This question',
          questionId: 'questionId',
          id: 'id',
          sessionId: 'sessionId',
          version: 'version',
          email: 'email'
        }
      } as AuthenticationResponse);

      actions$.stream = Observable.of(new AuthenticationAuthenticateAction({
        username: 'username',
        password: 'password'
      }));
      service.authenticate.and.returnValue(Observable.of(authResponse));

      effects.authenticate$
        .take(1)
        .subscribe(data => {
          expect(data).toEqual(new AuthenticationQuestionUpdateAction({
            description: authResponse.data.question,
            id: authResponse.data.id,
            questionId: authResponse.data.questionId,
            sessionId: authResponse.data.sessionId,
            version: authResponse.data.version,
            email: authResponse.data.email
          }));
        });

      effects.authenticate$
        .skip(1)
        .take(1)
        .subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/existing-customer/online-banking/security-question']
          }));
        });
    });

    it('should not do anything if the authenticationForm does not have username and password', async(() => {
      actions$.stream = Observable.of(new AuthenticationAuthenticateAction({
        username: null,
        password: null
      }));

      expect(() => effects.authenticate$.subscribe()).not.toThrow();
    }));
  });

  describe('authenticateByDebit$', () => {
    it('should return a new fromAuthentication.AuthenticationSuccessAction, with the customerResponse, on success', () => {
      const authenticationPreFill: AuthenticationPreFill = {
        customer: {
          rcifId: '1332450097000',
          name: {
            first: 'JAMES',
            middle: '',
            last: 'RHODES',
            suffix: ''
          },
          email: 'rhodes544@gmail.com',
          dob: '10/6/1992',
          phone: {
            number: '9018332806',
            type: ''
          },
          ssn: '408732606',
          address: {
            street: '1421 GREENTREE VALLEY CT APT 2',
            unit: '',
            city: 'MEMPHIS',
            state: 'TN',
            zip: '381196101'
          }
        }
      };

      actions$.stream = Observable.of(new AuthenticationByDebitAction({
        cardNumber: 'cardNumber',
        pinNumber: 'pinNumber'
      }));
      service.authenticateByDebit.and.returnValue(Observable.of({
        data: authenticationPreFill
      }));

      effects.authenticateByDebit$
        .take(1)
        .subscribe(data => {
          expect(data).toEqual(new AuthenticationSuccessAction(authenticationPreFill));
        });

      effects.authenticateByDebit$
        .skip(1)
        .take(1)
        .subscribe(data => {
          expect(data).toEqual(new Go({
            path: ['/existing-customer/online-banking/security-question']
          }));
        });
    });

    it('should not do anything if the authenticationForm does not have cardNumber and pinNumber', async(() => {
      actions$.stream = Observable.of(new AuthenticationByDebitAction({
        cardNumber: null,
        pinNumber: null
      }));

      expect(() => effects.authenticateByDebit$.subscribe()).not.toThrow();
    }));
  });

  describe('authenticated$', () => {
    it('should return an array of actions to update the store with customer data', () => {
      const authenticationPreFill: AuthenticationPreFill = {
        customer: {
          rcifId: '1332450097000',
          name: {
            first: 'JAMES',
            middle: '',
            last: 'RHODES',
            suffix: ''
          },
          email: 'rhodes544@gmail.com',
          dob: '10/6/1992',
          phone: {
            number: '9018332806',
            type: ''
          },
          ssn: '408732606',
          address: {
            street: '1421 GREENTREE VALLEY CT APT 2',
            unit: '',
            city: 'MEMPHIS',
            state: 'TN',
            zip: '381196101'
          }
        }
      };

      actions$.stream = Observable.of(new AuthenticationSuccessAction(authenticationPreFill));

      effects.authenticated$.skip(0).take(1).subscribe(data => {
        expect(data).toEqual(new ApplicationRcifIdUpdateAction(authenticationPreFill.customer.rcifId));
      });
      effects.authenticated$.skip(1).take(1).subscribe(data => {
        expect(data).toEqual(new DOBUpdateAction(authenticationPreFill.customer.dob));
      });
      effects.authenticated$.skip(2).take(1).subscribe(data => {
        expect(data).toEqual(new EmailUpdateAction(authenticationPreFill.customer.email));
      });
      effects.authenticated$.skip(3).take(1).subscribe(data => {
        expect(data).toEqual(new NameUpdateAction(authenticationPreFill.customer.name));
      });
      effects.authenticated$.skip(4).take(1).subscribe(data => {
        expect(data).toEqual(new PhoneUpdateAction(authenticationPreFill.customer.phone));
      });
      effects.authenticated$.skip(5).take(1).subscribe(data => {
        expect(data).toEqual(new SSNUpdateAction(authenticationPreFill.customer.ssn));
      });
      effects.authenticated$.skip(6).take(1).subscribe(data => {
        expect(data).toEqual(new AddressUpdateAction(authenticationPreFill.customer.address));
      });
      effects.authenticated$.skip(7).take(1).subscribe(data => {
        expect(data).toEqual(new Go({path: ['/existing-customer/confirm-address']}));
      });
    });

    it('should not do anything if the authenticationForm does not have cardNumber and pinNumber', async(() => {
      actions$.stream = Observable.of(new AuthenticationByDebitAction({
        cardNumber: null,
        pinNumber: null
      }));

      expect(() => effects.authenticateByDebit$.subscribe()).not.toThrow();
    }));
  });
});
