import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetFootPrintByStateCodeResponse } from '../../../../models/service-responses';
import { ConfigService } from '../../../config/services/config.service';
import { AppConfig } from '../../../config/models/app-config.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PropertyLocationService {

  private serviceContext: string;

  public getFootprintByStateCode(stateCode: string): Observable<GetFootPrintByStateCodeResponse> {
    return this.http.get<GetFootPrintByStateCodeResponse>(`${this.serviceContext}app/footprint/code/${stateCode}`);
  }

  public getFootprintByStateName(stateName: string): Observable<GetFootPrintByStateCodeResponse> {
    return this.http.get<GetFootPrintByStateCodeResponse>(`${this.serviceContext}app/footprint/name/${stateName}`);
  }

  constructor(private http: HttpClient, config: ConfigService<AppConfig>) {
    this.serviceContext = config.getConfig().serviceContext;
  }

}
