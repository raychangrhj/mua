import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { InitStoreDevTools } from './app.module';

describe('AppModule', () => {
  it('should have a method which determines if we are in "prod" mode and not include NGRX/Store Dev Tools', () => {
    expect(InitStoreDevTools.forRoot).toEqual(jasmine.any(Function));
    let result = InitStoreDevTools.forRoot({
      production: true
    });
    expect(result).toEqual([]);

    result = InitStoreDevTools.forRoot({
      production: false
    });
    expect(result).toEqual(StoreDevtoolsModule.instrument({
      maxAge: 20
    }));
  });
});
