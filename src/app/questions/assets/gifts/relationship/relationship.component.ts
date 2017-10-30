import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import { GiftStateObject } from '../../ngrx/reducers/gifts/gifts.reducer';
import { GiftUpdateAction } from '../../ngrx/actions/gifts/gifts.action';
import { TempGiftRelationshipUpdateAction } from '../../ngrx/actions/temp-gifts/temp-gifts.action';
import {
  AssetsState,
  getTempGiftRelationshipState
} from '../../ngrx/reducers/index.reducer';

@Component({
  selector: 'regions-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './relationship.component.scss']
})
export class QuestionsAssetsGiftsRelationshipComponent extends QuestionsBaseComponent implements OnInit {

  public currentGift: GiftStateObject;

  public ngOnInit() {
    super.ngOnInit();

    const currentGift$ = this.activatedRoute.data.map((data => data.currentGift)).take(1);
    const tempGift$ = this.store.select(getTempGiftRelationshipState).take(1);

    Observable.forkJoin(currentGift$, tempGift$)
      .subscribe((resolves: [GiftStateObject, string]) => {
        if (resolves[0]) {
          this.currentGift = resolves[0];
          this.form.controls['relationship'].setValue(resolves[0].relationship);
        } else {
          this.form.controls['relationship'].setValue(resolves[1]);
        }
      }).unsubscribe();
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AssetsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      if (this.currentGift) {
        this.store.dispatch(new GiftUpdateAction(this.currentGift, Object.assign({},
          this.currentGift,
          {
            relationship: this.form.value.relationship
          }
        )));
      } else {
        this.store.dispatch(new TempGiftRelationshipUpdateAction(this.form.value.relationship));
      }
    };
    this.form = formBuilder.group({
      relationship: [null, Validators.required]
    });
  }

}
