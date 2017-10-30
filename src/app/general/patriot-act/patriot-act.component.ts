import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'regions-patriot-act',
  templateUrl: './patriot-act.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './patriot-act.component.scss']
})
export class GeneralPatriotActComponent extends BaseComponent implements OnInit {

  public continueLink$: Observable<string>;
  public isCoBorrower$: Observable<boolean>;

  ngOnInit() {
    this.continueLink$ = this.activatedRoute.data.map(routeData => routeData.continueLink);
    this.isCoBorrower$ = this.activatedRoute.data.map(data => data.isCoBorrowerPage);
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {
    super(router, activatedRoute);
  }

}
