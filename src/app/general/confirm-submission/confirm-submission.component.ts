import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { ApplicationCompleteService } from '../core/application-complete.service';
import {
  ApplicationState,
  getApplicationState
} from '../../ngrx/reducers/application.reducer';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'regions-confirm-submission',
  templateUrl: './confirm-submission.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './confirm-submission.component.scss']
})
export class GeneralConfirmSubmissionComponent extends BaseComponent implements OnInit {

  private applicationState: ApplicationState;

  public onSubmit() {
    this.applicationCompleteService.submit(this.applicationState)
      .take(1)
      .subscribe(() => {
        this.router.navigate(['/thanks']);
      });
  }

  public ngOnInit() {
    this.store.select(getApplicationState)
      .take(1)
      .subscribe((applicationState: ApplicationState) => {
        this.applicationState = applicationState;
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<ApplicationState>,
    protected applicationCompleteService: ApplicationCompleteService
  ) {
    super(router, activatedRoute);
  }

}
