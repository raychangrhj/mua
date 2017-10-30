import { TestBed, inject } from '@angular/core/testing';

import { PropertyLocationService } from './property-location.service';
import { HttpClientModule } from '@angular/common/http';
import { RegionsAppConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/services/config.service';

describe('PropertyLocationService', () => {
  let configService;
  let serviceContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RegionsAppConfigModule
      ],
      providers: [PropertyLocationService]
    });
  });

  beforeEach(inject([ConfigService], (_configService_) => {
    serviceContext = 'foo/';
    configService = _configService_;

    spyOn(configService, 'getConfig').and.returnValue({
      serviceContext
    })
  }));

  it('should be created', inject([PropertyLocationService], (service: PropertyLocationService) => {
    expect(service).toBeTruthy();
  }));
});
