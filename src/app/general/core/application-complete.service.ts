import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../config/services/config.service';
import { AppConfig } from '../../config/models/app-config.module';
import { DataStore } from '../../../models/service-responses';
import { ApplicationState } from '../../ngrx/reducers/application.reducer';

@Injectable()
export class ApplicationCompleteService {

  private serviceContext: string;

  public submit(data: ApplicationState): Observable<any> {
    return this.http.post(`${this.serviceContext}app/${data.id}/submit`, {});
  }

  constructor(
    private http: HttpClient,
    configService: ConfigService<AppConfig>
  ) {
    this.serviceContext = configService.getConfig().serviceContext
  }

}
