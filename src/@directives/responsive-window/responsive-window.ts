/**
 * @name responsive-window
 * @description responsiveWindow Directive in ngx-responsive
 *
 * @license MIT
 */
import { DoCheck, Directive, Input, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ResponsiveState } from '../../@core/providers/responsive-state/responsive-state';

@Directive({
    selector: "[responsive-window]"
})
export class ResponsiveWindowDirective implements OnInit, OnDestroy, DoCheck {

    private _noRepeat: string;
    private element: HTMLElement;

    @Input( 'responsive-window' ) name: string;

    constructor(
        private _responsiveState: ResponsiveState,
        private el: ElementRef,
        private cd: ChangeDetectorRef ) {
            this.element = el.nativeElement;
        }
    public ngOnInit(): void {
        this._responsiveState.registerWindow( this );
    }

    public ngDoCheck(): void {
        const _update = this._ifValueChanged( this._noRepeat, this.name );
        if ( _update ) {
            this._responsiveState.unregisterWindow( this );
            this._responsiveState.registerWindow( this );
            this.cd.markForCheck();
        }
    }
    public ngOnDestroy() {
        this._responsiveState.unregisterWindow( this );
    }

    public getWidth() {
        return this.element.offsetWidth;
    }

    private _ifValueChanged( oldValue: any, newValue: any ): boolean {
        if ( oldValue === newValue ) {
            return false;
        } else {
            this._noRepeat = newValue;
            return true;
        }
    }
}
