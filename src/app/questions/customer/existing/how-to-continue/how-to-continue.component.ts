import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { State } from '../../shared/ngrx/reducers/index.reducer';
import { TypeUpdateAction } from '../../shared/ngrx/actions/type/type.action';

@Component({
  selector: 'regions-how-to-continue',
  templateUrl: './how-to-continue.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './how-to-continue.component.scss']
})
export class QuestionsExistingCustomerHowToContinueComponent extends QuestionsBaseComponent implements OnInit {

  public ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new TypeUpdateAction('existing'));
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
  ) {
    super(router, activatedRoute, store);
  }

}
