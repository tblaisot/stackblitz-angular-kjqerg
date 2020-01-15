import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

const FULL_PERCENT = 100;
const UPDATE_INTERVAL = 100;

@Component({
    selector: 'df-timer-bar',
    template: `
        <mat-progress-bar mode="determinate" [value]="percentage"></mat-progress-bar>
    `,
    styles: [`

    `],
    encapsulation: ViewEncapsulation.None,
})
export class TimerBarComponent implements OnInit, OnDestroy {
    percentage: number = FULL_PERCENT;

    @Input() duration: number = 0;

    private timerId: any | null = null;

    ngOnInit(): void {
        if(this.duration > 0) {
            this.timerId = setInterval(() => {
                this.percentage -= (FULL_PERCENT / (this.duration / UPDATE_INTERVAL));
                if (this.timerId && this.percentage <= 0) {
                    clearInterval(this.timerId);
                    this.timerId = null;
                }
            }, UPDATE_INTERVAL)
        }
    }

    ngOnDestroy(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }


}
