import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { QuestionsBaseComponent } from '../../shared/questions-base/questions-base.component';
import { GiftStateObject } from '../ngrx/reducers/gifts/gifts.reducer';
import { GiftDeleteAction } from '../ngrx/actions/gifts/gifts.action';
import { TempGiftClearAction } from '../ngrx/actions/temp-gifts/temp-gifts.action';
import {
  AssetsState,
  getGiftsState
} from '../ngrx/reducers/index.reducer';
import { NavigationCompleteSectionAction } from '../../shared/ngrx/actions/navigation.action';

@Component({
  selector: 'regions-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['../../../shared/top-level.component.scss', './gifts.component.scss']
})
export class QuestionsAssetsGiftsComponent extends QuestionsBaseComponent implements OnInit, OnDestroy {

  private gifts: GiftStateObject[];
  private giftsStateObject$: Subscription;
  private sectionId: number;

  public displayGifts: any[];
  public baseUrl: string;

  public removeGift(i: number) {
    this.store.dispatch(new GiftDeleteAction(this.gifts[i]));
  }

  public ngOnDestroy() {
    this.giftsStateObject$.unsubscribe();
  }

  public ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.data.map(obj => obj.sectionId).take(1).subscribe((sectionId: number) => {
      this.sectionId = sectionId;
    });

    this.store.dispatch(new TempGiftClearAction());

    this.activatedRoute.data.map(obj => obj.sectionId).take(1).subscribe((sectionId: number) => {
      this.baseUrl = sectionId === 40 ? '' : '/co-borrower';

      this.giftsStateObject$ = this.store.select(getGiftsState)
        .subscribe((gifts: GiftStateObject[]) => {
          this.gifts = gifts;
          this.displayGifts = [];

          if (gifts.length) {
            this.form.controls['hasGifts'].enable();
            this.form.controls['hasGifts'].setValue(true);

            this.form.controls['noGifts'].disable();
          } else {
            this.form.controls['hasGifts'].setValue(false);
            this.form.controls['hasGifts'].disable();

            this.form.controls['noGifts'].enable();
          }

          gifts.forEach((gift: GiftStateObject, i: number) => {
            this.displayGifts.push({
              title: gift.who,
              answers: [{
                title: 'Benefactor',
                response: Observable.of(gift.who),
                returnLink: `${this.baseUrl}/assets/gift/${i}/benefactor/edit`
              }, {
                title: 'Benefactor Relationship',
                response: Observable.of(gift.relationship),
                returnLink: `${this.baseUrl}/assets/gift/${i}/relationship/edit`
              }, {
                title: 'Gift Amount',
                response: Observable.of(gift.amount),
                returnLink: `${this.baseUrl}/assets/gift/${i}/amount/edit`,
                type: 'currency'
              }]
            });
          });
        });
    });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AssetsState>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new NavigationCompleteSectionAction(this.sectionId));
    };
    this.form = formBuilder.group({
      noGifts: [null, Validators.requiredTrue],
      hasGifts: [null, Validators.requiredTrue]
    });
  }

}
