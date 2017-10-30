import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../models/app-config.module';

@Injectable()
export class ConfigService<T extends AppConfig> {

  private config: T;

  public load() {
    return (this.http.get('/config')
      .map((res: Response): AppConfig => {
        this.config = res.json();
        return this.config;
      })
      .toPromise()) as Promise<T>;
  }

  public getConfig(): T {
    return this.config;
  }

  constructor(private http: Http) { }

}

export function configFactory (configService: ConfigService<AppConfig>) {
  return () => configService.load();
}
