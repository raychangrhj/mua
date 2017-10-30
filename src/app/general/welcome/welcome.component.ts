import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import 'rxjs/add/operator/take';

import { WelcomeRouterData } from '../../../models/welcome-router-data';
import { BaseComponent } from '../../shared/base/base.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'regions-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './welcome.component.scss']
})
export class GeneralWelcomeComponent extends BaseComponent implements OnInit {

  public options: WelcomeRouterData;
  public isCoBorrower$: Observable<boolean>;

  public ngOnInit() {
    this.activatedRoute.data
      .take(1)
      .subscribe((data: WelcomeRouterData): void => {
        this.options = data;
      });

    this.isCoBorrower$ = this.activatedRoute.data.map(data => data.isCoBorrowerPage);
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {
    super(router, activatedRoute);
  }

}
