import { APP_INITIALIZER } from '@angular/core';

import { CONFIG_PROVIDER } from './config.provider'
import {
  configFactory,
  ConfigService
} from '../services/config.service';

describe('Config Provider', () => {
  it('should be a provider object for the ConfigService', () => {
    expect(CONFIG_PROVIDER).toEqual({
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    });
  });
});
