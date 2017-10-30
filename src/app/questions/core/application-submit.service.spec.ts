import {
  TestBed,
  inject
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { ApplicationSubmitService } from './application-submit.service';
import { ConfigService } from '../../config/services/config.service';
import { applicationReducer } from '../../ngrx/reducers/application.reducer';
import { reducer } from '../shared/ngrx/reducers/navigation.reducer';

describe('ApplicationSubmitService', () => {
  let service: ApplicationSubmitService;
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
        ApplicationSubmitService
      ]
    });
  });

  beforeEach(inject([ConfigService], (_configService_) => {
    configService = _configService_;
    configService.getConfig.and.returnValue({
      serviceContext: 'rest/'
    });
  }));

  beforeEach(inject([ApplicationSubmitService], (_service_) => {
    service = _service_;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
