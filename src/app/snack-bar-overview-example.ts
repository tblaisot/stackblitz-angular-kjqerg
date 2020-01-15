import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarService} from './snack-bar.service'

/**
 * @title Basic snack-bar
 */
@Component({
  selector: 'snack-bar-overview-example',
  templateUrl: 'snack-bar-overview-example.html',
  styleUrls: ['snack-bar-overview-example.css'],
})
export class SnackBarOverviewExample {
  constructor(private _snackBar: SnackBarService) {}

  openSnackBarNoDuration() {
    this._snackBar.openMessage("this is a title", "this is a description");
  }

  openSnackBar() {
    this._snackBar.openMessage("this is a title", "this is a description", {
      duration: 200000,
    });
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
