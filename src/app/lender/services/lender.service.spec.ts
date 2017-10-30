import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { LenderService } from './lender.service';
import { RouterTestingModule } from '@angular/router/testing';
import { applicationReducer } from '../../ngrx/reducers/application.reducer';
import { LoanOfficerResponse } from '../models/loan-officer-response';

describe('LenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({
          application: applicationReducer
        })
      ],
      providers: [
        LenderService
      ]
    });
  });

  it('should be created', inject([LenderService], (service: LenderService) => {
    expect(service).toBeTruthy();
  }));
});
