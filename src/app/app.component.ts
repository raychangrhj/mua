import {
  Component,
  OnInit
} from '@angular/core';

import { LenderService } from './lender/services/lender.service';
import { ConfigService } from './config/services/config.service';
import { AppConfig } from './config/models/app-config.module';
import { LoanOfficer } from './lender/models/loan-officer-response';

@Component({
  selector: 'regions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private config: AppConfig;
  private mlo: LoanOfficer;

  public ngOnInit() {
    if (!this.config) {
      console.error('Application config did not load');
    }
    if (!this.mlo) {
      console.error('MLO data did not load');
    }
  }

  constructor (
    configService: ConfigService<AppConfig>,
    lenderService: LenderService
  ) {
    this.config = configService.getConfig();
    this.mlo = lenderService.getMLO();
  }
}
