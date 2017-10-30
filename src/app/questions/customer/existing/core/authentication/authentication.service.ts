import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import {
  AuthenticationPreFillResponse,
  AuthenticationResponse
} from '../../../../../../models/service-responses';
import { ConfigService } from '../../../../../config/services/config.service';
import { AppConfig } from '../../../../../config/models/app-config.module';
import {
  AuthenticationAnswerState,
  AuthenticationDebitForm,
  AuthenticationForm
} from '../../ngrx/reducers/authentication.reducer';

@Injectable()
export class AuthenticationService {

  private serviceContext: string;

  public authenticate(authForm: AuthenticationForm): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.serviceContext}prefill/cq/olb`, authForm)
  }

  public authenticateByDebit(authForm: AuthenticationDebitForm): Observable<AuthenticationPreFillResponse> {
    return this.http.post<AuthenticationPreFillResponse>(`${this.serviceContext}prefill/atm`, authForm)
  }

  public authenticateAnswer(authenticationAnswerState: AuthenticationAnswerState): Observable<AuthenticationPreFillResponse> {
    return this.http.post<AuthenticationPreFillResponse>(`${this.serviceContext}prefill/acq/olb`, authenticationAnswerState)
  }

  constructor(private http: HttpClient, private configService: ConfigService<AppConfig>) {
    this.serviceContext = configService.getConfig().serviceContext;
  }

}
