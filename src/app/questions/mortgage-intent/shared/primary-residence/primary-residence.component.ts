import {
  Component,
  OnInit
} from '@angular/core';
import 'rxjs/add/operator/take';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  getMortgagePrimaryResidenceState,
  getMortgageTypeState,
  State
} from '../../shared/ngrx/reducers/index.reducer';
import { PrimaryResidenceUpdateAction } from '../ngrx/actions/primary-residence/primary-residence.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';

@Component({
  selector: 'regions-primary-residence',
  templateUrl: './primary-residence.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './primary-residence.component.scss']
})
export class QuestionsMortgageIntentPrimaryResidenceComponent extends QuestionsBaseComponent implements OnInit {

  private editMode: boolean;
  private viewMode: string;

  public ngOnInit() {
    super.ngOnInit();

    // TODO determine if we can test this...
    this.editMode = this.router.url.indexOf('/edit') > 0;
    this.store.select(getMortgageTypeState)
      .take(1)
      .subscribe((type: string) => {
        this.viewMode = type === 'buy' ? 'buying' : type;
      });

    this.store.select(getMortgagePrimaryResidenceState)
      .take(1)
      .subscribe((primaryResidence: boolean) => {
        if (primaryResidence !== null) {
          this.form.controls['primaryResidence'].setValue(
            primaryResidence ? 'yes' : 'no'
          );
        }
      });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      const primaryResidence: boolean = this.form.controls['primaryResidence'].value === 'yes';
      const saveAction = primaryResidence
        ? [`/mortgage-intent/${this.viewMode}/confirm`]
        : [`/mortgage-intent/${this.viewMode}/primary-use${this.editMode ? '/edit' : ''}`];

      this.store.dispatch(new PrimaryResidenceUpdateAction(
        primaryResidence
      ));
      this.router.navigate(saveAction);
    };
    this.form = formBuilder.group({
      primaryResidence: [null, Validators.required]
    });
  }

}
