import { NgModule } from '@angular/core';

import { RoutingValidatorsService } from './routing-validators.service';
import { BorrowerCacheService } from './borrower-cache.service';

@NgModule({
  providers: [
    RoutingValidatorsService,
    BorrowerCacheService
  ]
})
export class CoreModule { }
