import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import {
  LoanOfficer,
  LoanOfficerResponse
} from '../models/loan-officer-response';
import { ApplicationState } from '../../ngrx/reducers/application.reducer';
import { ApplicationLoanOfficerIdUpdateAction } from '../../ngrx/actions/application.action';

@Injectable()
export class LenderService {

  private mlo: LoanOfficer = null;

  private getLoanOfficerData(mlo: string | string[]) {
    if (mlo !== 'crc') {
      mlo = mlo[1];
      mlo = mlo.split('&')[0];
    }

    return this.http.post(`/api/locator/officer/website/${mlo}`, {})
      .map((response: LoanOfficerResponse) => {
        this.mlo = response.data.mortgageLoanOfficerData;
        this.store.dispatch(new ApplicationLoanOfficerIdUpdateAction(
          this.mlo.loanOfficerId
        ));
        return this.mlo;
      })
      .toPromise();
  }

  public getMLO(): LoanOfficer {
    return this.mlo;
  }

  public load(): Promise<LoanOfficer> {
    const mlo: string | string[] = this.location.path(true).split('mlo=');
    return Array.isArray(mlo) && mlo[1] ? this.getLoanOfficerData(mlo) : this.getLoanOfficerData('crc')
  }

  constructor(
    private http: HttpClient,
    private store: Store<ApplicationState>,
    private location: Location
  ) { }

}

export function lenderFactory (lenderService: LenderService) {
  return () => lenderService.load();
}
