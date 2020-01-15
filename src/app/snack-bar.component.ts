import {Component, ViewEncapsulation, Inject, ChangeDetectionStrategy} from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
@Component({
  selector: 'df-snack-bar',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'mat-simple-snackbar',
  }
})
export class SnackBarComponent {
  /** Data that was injected into the snack bar. */
  data: {title:string, description: string};

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.data = data;
  }

  close(): void {
    this.snackBarRef.dismiss();
  }
}
