import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ConfigService } from './services/config.service';
import { CONFIG_PROVIDER } from './providers/config.provider';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    ConfigService,
    CONFIG_PROVIDER
  ]
})
export class RegionsAppConfigModule { }
