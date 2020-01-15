import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { matSnackBarAnimations, MatSnackBarContainer } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-container',
  templateUrl: './snack-bar-container.component.html',
  styleUrls: ['./snack-bar-container.component.scss'],
  // In Ivy embedded views will be change detected from their declaration place, rather than
  // where they were stamped out. This means that we can't have the snack bar container be OnPush,
  // because it might cause snack bars that were opened from a template not to be out of date.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  animations: [matSnackBarAnimations.snackBarState],
  host: {
    '[attr.role]': '_role',
    'class': 'mat-snack-bar-container',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationEnd($event)'
  },
})
export class SnackBarContainerComponent extends MatSnackBarContainer {
}

