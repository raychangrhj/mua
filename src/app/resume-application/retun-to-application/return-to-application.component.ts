import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'regions-return-to-application',
  templateUrl: './return-to-application.component.html',
  styleUrls: ['../../shared/top-level.component.scss', './return-to-application.component.scss']
})
export class ReturnToApplicationComponent extends BaseComponent { }
// TODO update this component to pull linkOptions off route
