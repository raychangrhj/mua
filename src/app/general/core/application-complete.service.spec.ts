import {
  TestBed,
  inject
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { ApplicationCompleteService } from './application-complete.service';
import { ConfigService } from '../../config/services/config.service';
import { applicationReducer } from '../../ngrx/reducers/application.reducer';
import { reducer } from '../../questions/shared/ngrx/reducers/navigation.reducer';

describe('ApplicationCompleteService', () => {
  let service: ApplicationCompleteService;
  let configService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          navigation: reducer,
          application: applicationReducer
        })
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: jasmine.createSpyObj('ConfigService', ['getConfig'])
        },
        ApplicationCompleteService
      ]
    });
  });

  beforeEach(inject([ConfigService], (_configService_) => {
    configService = _configService_;
    configService.getConfig.and.returnValue({
      serviceContext: 'rest/'
    });
  }));

  beforeEach(inject([ApplicationCompleteService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
