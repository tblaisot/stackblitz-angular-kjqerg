import { ComponentRef, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import { SnackBarContainerComponent } from './snack-bar-container.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService extends MatSnackBar {

    /**
     * Attaches the snack bar container component to the overlay.
     */
    private _attachSnackBarContainer(overlayRef: OverlayRef,
                                     config: MatSnackBarConfig): SnackBarContainerComponent {

        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || (this as any)._injector, new WeakMap([
            [MatSnackBarConfig, config]
        ]));

        const containerPortal =
            new ComponentPortal(SnackBarContainerComponent, config.viewContainerRef, injector);
        const containerRef: ComponentRef<SnackBarContainerComponent> = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    }
}
