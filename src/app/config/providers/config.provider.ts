import { APP_INITIALIZER } from '@angular/core';

import {
  configFactory,
  ConfigService
} from '../services/config.service';

export const CONFIG_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [ConfigService],
  multi: true
};
