import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routes.module';
import { environment } from '../environments/environment';
import { RouterEffects } from './ngrx/effects/router.effect';
import { TestingComponent } from './testing/testing.component';
import { RegionsAppConfigModule } from './config/config.module';
import { RegionsManagingLoanOfficerModule } from './lender/lender.module';
import { applicationReducer } from './ngrx/reducers/application.reducer';

export class InitStoreDevTools {
  static forRoot (env) {
    return !env.production
      ? StoreDevtoolsModule.instrument({
        maxAge: 20
      })
      : [];
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent
  ],
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    // third party
    AgmCoreModule.forRoot({
      clientId: 'gme-regionsbank',
      libraries: ['places']
    }),
    StoreModule.forRoot({
      application: applicationReducer
    }),
    EffectsModule.forRoot([RouterEffects]),
    InitStoreDevTools.forRoot(environment),
    // our npm
    RegionsAppConfigModule,
    RegionsManagingLoanOfficerModule,
    // our local
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
