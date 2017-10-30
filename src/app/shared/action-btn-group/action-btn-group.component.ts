import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges
} from '@angular/core';

import {
  ActionBtnGroupLinkOptions,
  ActionBtnGroupSaveAndExitLinkObject
} from '../../../models/action-btn-group-link-options';

@Component({
  selector: 'regions-action-btn-group',
  templateUrl: './action-btn-group.component.html',
  styleUrls: ['./action-btn-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBtnGroupComponent implements OnChanges {

  @Input('linkOptions')
  private linkOptions: ActionBtnGroupLinkOptions;

  @Input('valid')
  public valid = true;

  public options: ActionBtnGroupLinkOptions;

  public ngOnChanges() {
    if (this.valid === undefined) {
      this.valid = true;
    }
    if (this.linkOptions) {
      this.options = JSON.parse(JSON.stringify(this.linkOptions));
      if (this.options.cancel) {
        this.options.cancel.text = this.options.cancel.text || 'Cancel';
      }
      if (this.options.back) {
        this.options.back.text = this.options.back.text || 'Back';
      }
      if (this.options.next && this.options.next === !!this.options.next) {
        this.options.next = 'Next';
      }
      if (this.options.save && this.options.save === !!this.options.save) {
        this.options.save = 'Save';
      }
      if (this.options.saveAndExit) {
        if (this.options.saveAndExit === !!this.options.saveAndExit) {
          this.options.saveAndExit = {
            text: null,
            link: null
          };
        }
        this.options.saveAndExit = this.options.saveAndExit as ActionBtnGroupSaveAndExitLinkObject;
        this.options.saveAndExit.text = this.options.saveAndExit.text || 'Save and Exit';
        this.options.saveAndExit.link = this.options.saveAndExit.link || {
          routerLink: '/save-and-exit'
        };
      }
    }
  }
}
