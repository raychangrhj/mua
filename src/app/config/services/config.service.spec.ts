import {
  TestBed,
  inject,
  async
} from '@angular/core/testing';
import {
  HttpModule,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {
  configFactory,
  ConfigService
} from './config.service';
import { AppConfig } from '../models/app-config.module';

describe('ConfigService', () => {
  let service: ConfigService<AppConfig>;
  let configJSON: AppConfig;
  beforeEach(() => {
    configJSON = {
      serviceContext: 'serviceContext',
      environment: 'environment',
      loggingEndpoint: 'loggingEndpoint',
      loggingLevel: 'loggingLevel'
    };
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ConfigService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    });
  });

  beforeEach(inject([ConfigService, XHRBackend], (_service_: ConfigService<AppConfig>, mockBackend) => {
    service = _service_;
    mockBackend.connections.subscribe(connection => {
      if (connection.request.url === '/config') {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(configJSON)
        })));
      }
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the public load method for getting data from the "/config" url', () => {
    expect(service.load).toEqual(jasmine.any(Function));
  });

  describe('load Method', () => {
    it('should return a config object as a promise', async(() => {
      service.load().then((config: AppConfig) => {
        expect(config).toEqual(configJSON);
      });
    }));
  });

  it('should have the public getConfig method for getting the local AppConfig', () => {
    expect(service.getConfig).toEqual(jasmine.any(Function));
  });

  describe('getConfig Method', () => {
    it('should return the local AppConfig object', async(() => {
      service.load().then(result => {
        expect(service.getConfig()).toEqual(result);
      });
    }));
  });

  it('should have a factory method for loading the AppConfig', () => {
    expect(configFactory).toEqual(jasmine.any(Function));

  });

  describe('configFactory Function', () => {
    it('should return a function that wraps the ConfigService.load method', () => {
      const fakeConfigService = jasmine.createSpyObj('ConfigService', ['load']);
      const result = configFactory(fakeConfigService);

      expect(result).toEqual(jasmine.any(Function));
      result();
      expect(fakeConfigService.load).toHaveBeenCalledWith();
      expect(fakeConfigService.load).toHaveBeenCalledTimes(1);
    });
  });
});
