import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from '../../utils';
import { SendPassword } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
var ForgottenPasswordComponent = /** @class */ (function () {
    function ForgottenPasswordComponent(store, traductions, styles) {
        this.store = store;
        this.traductions = traductions;
        this.styles = styles;
        this.emailPlaceholder = 'Your email';
        this.sendButtonTraduction = 'Send';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ForgottenPasswordComponent.prototype.ngOnInit = function () {
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    };
    ForgottenPasswordComponent.prototype.send = function () {
        this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
    };
    ForgottenPasswordComponent.ctorParameters = function () { return [
        { type: Store },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] }
    ]; };
    __decorate([
        ViewChild('email')
    ], ForgottenPasswordComponent.prototype, "emailInput", void 0);
    ForgottenPasswordComponent = __decorate([
        Component({
            selector: 'auth-lib-forgotten-password',
            template: "<mat-form-field>\n  <input matInput [placeholder]=\"emailPlaceholder\" #email>\n</mat-form-field>\n\n<button \n  mat-raised-button\n  type=\"button\" \n  (click)=\"send()\" \n  [disabled]=\"!(this.emailInput && this.emailInput.nativeElement && this.emailInput.nativeElement.value)\"\n  [ngStyle]=\"{\n    'background-color': buttonsBackgroundColor,\n    'color': buttonsColor\n  }\"\n>\n  {{ sendButtonTraduction }}\n</button>\n",
            styles: ["mat-form-field{font-size:12px;margin-right:30px;width:230px}"]
        }),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(AUTH_STYLES))
    ], ForgottenPasswordComponent);
    return ForgottenPasswordComponent;
}());
export { ForgottenPasswordComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290dGVuLXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZvcmdvdHRlbi1wYXNzd29yZC9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFvQixNQUFNLGFBQWEsQ0FBQztBQU85RTtJQVNFLG9DQUNVLEtBQXVCLEVBQ0csV0FBNEMsRUFDakQsTUFBa0M7UUFGdkQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDRyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFUakUscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLHlCQUFvQixHQUFHLE1BQU0sQ0FBQztRQUU5QiwyQkFBc0IsR0FBRyxTQUFTLENBQUM7UUFDbkMsaUJBQVksR0FBRyxPQUFPLENBQUM7SUFNbkIsQ0FBQztJQUVMLDZDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQseUNBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Z0JBZmdCLEtBQUs7Z0RBQ25CLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxXQUFXOztJQVhEO1FBQW5CLFNBQVMsQ0FBQyxPQUFPLENBQUM7a0VBQXdCO0lBRGhDLDBCQUEwQjtRQUx0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLHdiQUFrRDs7U0FFbkQsQ0FBQztRQVlHLFdBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FaWCwwQkFBMEIsQ0EwQnRDO0lBQUQsaUNBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbmltcG9ydCB7IEF1dGhTdGF0ZSB9IGZyb20gJy4uLy4uL3N0b3JlL3JlZHVjZXInO1xuaW1wb3J0IHsgU2VuZFBhc3N3b3JkIH0gZnJvbSAnLi4vLi4vc3RvcmUvYWN0aW9ucyc7XG5pbXBvcnQgeyBBVVRIX1RSQURVQ1RJT05TLCBBVVRIX1NUWUxFUywgQXV0aE1vZHVsZUNvbmZpZyB9IGZyb20gJy4uLy4uL3Rva2VuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXV0aC1saWItZm9yZ290dGVuLXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZvcmdvdHRlbi1wYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZvcmdvdHRlbi1wYXNzd29yZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnZW1haWwnKSBlbWFpbElucHV0OiBFbGVtZW50UmVmO1xuXG4gIGVtYWlsUGxhY2Vob2xkZXIgPSAnWW91ciBlbWFpbCc7XG4gIHNlbmRCdXR0b25UcmFkdWN0aW9uID0gJ1NlbmQnO1xuXG4gIGJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSAnIzNmNTFiNSc7XG4gIGJ1dHRvbnNDb2xvciA9ICd3aGl0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXV0aFN0YXRlPixcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChBVVRIX1NUWUxFUykgcHJpdmF0ZSBzdHlsZXM6IEF1dGhNb2R1bGVDb25maWdbJ3N0eWxlcyddLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW1haWxQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbWFpbFBsYWNlaG9sZGVyJywgdGhpcy5lbWFpbFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLnNlbmRCdXR0b25UcmFkdWN0aW9uID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdidXR0b25zLnNlbmQnLCB0aGlzLnNlbmRCdXR0b25UcmFkdWN0aW9uKTtcblxuICAgIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNCYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IpO1xuICAgIHRoaXMuYnV0dG9uc0NvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0NvbG9yJywgdGhpcy5idXR0b25zQ29sb3IpO1xuICB9XG5cbiAgc2VuZCgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTZW5kUGFzc3dvcmQodGhpcy5lbWFpbElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKTtcbiAgfVxufVxuIl19