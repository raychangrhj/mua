import {
  TestBed,
  inject
} from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { BorrowerCacheService } from './borrower-cache.service';
import { customerReducer } from '../questions/customer/shared/ngrx/reducers/index.reducer';
import { incomeReducer } from '../questions/income/ngrx/reducers/index.reducer';
import { assetsReducer } from '../questions/assets/ngrx/reducers/index.reducer';
import { reducer } from '../questions/required-questions/ngrx/reducers/government-questions.reducer';

describe('BorrowerCacheService', () => {
  let service: BorrowerCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          customer: customerReducer,
          income: incomeReducer,
          assets: assetsReducer,
          governmentQuestions: reducer
        })
      ],
      providers: [BorrowerCacheService]
    });
  });

  beforeEach(inject([BorrowerCacheService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
