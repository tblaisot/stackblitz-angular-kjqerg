import { ComponentRef, Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SnackBarContainerComponent } from './snack-bar-container.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService extends MatSnackBar {

    constructor(
        _overlay: Overlay,
        _live: LiveAnnouncer,
        _injector: Injector,
        _breakpointObserver: BreakpointObserver,
        @Optional() @SkipSelf() _parentSnackBar: MatSnackBar,
        @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) _defaultConfig: MatSnackBarConfig
    ) {
        super(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar, _defaultConfig);
        (this as any)._attachSnackBarContainer = this.__attachSnackBarContainer;
    }


    /**
     * Attaches the snack bar container component to the overlay.
     */
    private __attachSnackBarContainer(overlayRef: OverlayRef,
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

    /**
     * Opens a snackbar with a message and an optional action.
     * @param title The title to show in the snackbar.
     * @param description The message to show in the snackbar.
     * @param config Additional configuration options for the snackbar.
     */
    openMessage(title: string, description: string, config?: MatSnackBarConfig): MatSnackBarRef<SnackBarComponent> {
        const _config = {...(this as any)._defaultConfig, ...config};

        _config.data = {title, description};

        if (!_config.announcementMessage) {
            _config.announcementMessage = `${title} ${description}`;
        }

        return this.openFromComponent(SnackBarComponent, _config);
    }
}
