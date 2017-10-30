import { APP_INITIALIZER } from '@angular/core';

import {
  lenderFactory,
  LenderService
} from '../services/lender.service';

export const LENDER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: lenderFactory,
  deps: [LenderService],
  multi: true
};
