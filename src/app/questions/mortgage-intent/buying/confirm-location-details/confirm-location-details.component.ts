import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import 'rxjs/add/operator/take';

import { PropertyLocationState } from '../../shared/ngrx/reducers/property-location/property-location.reducer';
import { Store } from '@ngrx/store';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getMortgagePropertyLocationState,
  State
} from '../../shared/ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-property-location-confirm',
  templateUrl: './confirm-location-details.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './confirm-location-details.component.scss']
})
export class QuestionsMortgageIntentConfirmLocationDetailsComponent extends QuestionsBaseComponent implements OnInit {

  public propertyLocation: PropertyLocationState;

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getMortgagePropertyLocationState)
      .take(1)
      .subscribe((propertyLocation: PropertyLocationState) => {
        this.propertyLocation = propertyLocation;
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
  ) {
    super(router, activatedRoute, store);
  }

}
