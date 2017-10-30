import { APP_INITIALIZER } from '@angular/core';

import { LENDER_PROVIDER } from './lender.provider';
import {
  lenderFactory,
  LenderService
} from '../services/lender.service';

describe('Lender Provider', () => {
  it('should be a provider object for the LenderService', () => {
    expect(LENDER_PROVIDER).toEqual({
      provide: APP_INITIALIZER,
      useFactory: lenderFactory,
      deps: [LenderService],
      multi: true
    });
  });
});
