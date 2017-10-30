import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from './authentication.service';
import { ConfigService } from '../../../../../config/services/config.service';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { AuthenticationResponse } from '../../../../../../models/service-responses';

describe('AuthenticationService', () => {
  let http;
  let service;
  let mockBackend;
  let mockResponse;
  let serviceContext;
  beforeEach(() => {
    serviceContext = 'api/';

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthenticationService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        {
          provide: ConfigService,
          useValue: {
            getConfig: () => ({
              serviceContext
            })
          }
        }
      ]
    });
  });

  beforeEach(inject([HttpClient, AuthenticationService, XHRBackend], (_http_, _service_, _mockBackend_) => {
    http = _http_;
    spyOn(http, 'post').and.callThrough();

    service = _service_;
    mockBackend = _mockBackend_;
  }));

  beforeEach(() => {
    mockResponse = ({
      didAccountAuthenticateSuccessfully: false,
      data: {
        id: 'foo'
      }
    } as AuthenticationResponse);

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a authenticate method on it', () => {
    expect(service.authenticate).toEqual(jasmine.any(Function));
  });

  // TODO get this test working again...
  xdescribe('authenticate', () => {
    it('should post the provided authForm to the "/authenticate" url and return an observable of the result', () => {
      service.authenticate({
        username: 'username',
        password: 'password'
      }).subscribe((response) => {
        expect(response).toEqual(mockResponse.data);
        expect(http.post).toHaveBeenCalledWith(serviceContext + 'prefill/cq/olb', {
          username: 'username',
          password: 'password'
        });
      });
    });
  });

  it('should have a authenticateByDebit method on it', () => {
    expect(service.authenticateByDebit).toEqual(jasmine.any(Function));
  });

  // TODO get this test working again...
  xdescribe('authenticateByDebit', () => {
    it('should post the provided debitCard to the "/authenticate/debit-card" url and return an observable of the result', () => {
      service.authenticateByDebit({
        cardNumber: 'cardNumber',
        pinNumber: 'pinNumber'
      }).subscribe((response => {
        expect(response).toEqual(mockResponse.data);
        expect(http.post).toHaveBeenCalledWith(serviceContext + 'authenticate/debit-card', {
          cardNumber: 'cardNumber',
          pinNumber: 'pinNumber'
        });
      }));
    });
  });
});
