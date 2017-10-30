import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'regions-progress-pills',
  templateUrl: './progress-pills.component.html',
  styleUrls: ['./progress-pills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsProgressPillsComponent {

  @Input('pills')
  public pills = [];

  @Input('title')
  public title = '';

}
