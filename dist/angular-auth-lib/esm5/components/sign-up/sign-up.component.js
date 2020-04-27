import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { get } from 'lodash';
import { SignUp } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(traductions, styles, dialogRef, formBuilder, store) {
        this.traductions = traductions;
        this.styles = styles;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.store = store;
        this.usernamePlaceholder = 'Username';
        this.passwordPlaceholder = 'Password';
        this.firstNamePlaceholder = 'First name';
        this.lastNamePlaceholder = 'Last name';
        this.emailPlaceholder = 'Email';
        this.enterprisePlaceholder = 'Enterprise';
        this.signUpDialogTitle = 'Sign Up';
        this.signupButtonTraduction = 'Log in';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
        this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
        this.firstNamePlaceholder = get(this.traductions || {}, 'form.firstNamePlaceholder', this.firstNamePlaceholder);
        this.lastNamePlaceholder = get(this.traductions || {}, 'form.lastNamePlaceholder', this.lastNamePlaceholder);
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.enterprisePlaceholder = get(this.traductions || {}, 'form.enterprisePlaceholder', this.enterprisePlaceholder);
        this.signUpDialogTitle = get(this.traductions || {}, 'dialogs.signup', this.signUpDialogTitle);
        this.signupButtonTraduction = get(this.traductions || {}, 'buttons.signup', this.signupButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            enterprise: ''
        });
    };
    SignUpComponent.prototype.onSubmit = function () {
        var newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password'],
            firstName: this.userForm.value['firstName'],
            lastName: this.userForm.value['lastName'],
            email: this.userForm.value['email'],
            enterprise: this.userForm.value['enterprise'] || null
        };
        this.store.dispatch(new SignUp(newUser));
        this.dialogRef.close();
    };
    SignUpComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: MatDialogRef },
        { type: FormBuilder },
        { type: Store }
    ]; };
    SignUpComponent = __decorate([
        Component({
            selector: 'auth-lib-sign-up',
            template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button mat-raised-button type=\"submit\" [disabled]=\"userForm.invalid\" [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\">\n            {{ signupButtonTraduction }}\n        </button>\n    </form>\n</div>\n",
            styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container form #columns mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
        }),
        __param(0, Inject(AUTH_TRADUCTIONS)),
        __param(1, Inject(AUTH_STYLES))
    ], SignUpComponent);
    return SignUpComponent;
}());
export { SignUpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBSTdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQW9CLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU85RTtJQWdCRSx5QkFDb0MsV0FBNEMsRUFDakQsTUFBa0MsRUFDeEQsU0FBd0MsRUFDdkMsV0FBd0IsRUFDeEIsS0FBdUI7UUFKRyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFDeEQsY0FBUyxHQUFULFNBQVMsQ0FBK0I7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFsQmpDLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFDakMseUJBQW9CLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLFdBQVcsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDM0IsMEJBQXFCLEdBQUcsWUFBWSxDQUFDO1FBRXJDLHNCQUFpQixHQUFHLFNBQVMsQ0FBQztR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LEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ25DLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJO1NBQ3RELENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDeEIsQ0FBQzs7Z0RBMUNFLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxXQUFXO2dCQUNELFlBQVk7Z0JBQ1QsV0FBVztnQkFDakIsS0FBSzs7SUFyQlgsZUFBZTtRQUwzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLHN3REFBdUM7O1NBRXhDLENBQUM7UUFrQkcsV0FBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQWxCWCxlQUFlLENBNEQzQjtJQUFELHNCQUFDO0NBQUEsQUE1REQsSUE0REM7U0E1RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEF1dGhTdGF0ZSB9IGZyb20gJy4uLy4uL3N0b3JlL3JlZHVjZXInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy91c2VyLm1vZGVscyc7XG5pbXBvcnQgeyBTaWduVXAgfSBmcm9tICcuLi8uLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCB7IEFVVEhfVFJBRFVDVElPTlMsIEF1dGhNb2R1bGVDb25maWcsIEFVVEhfU1RZTEVTIH0gZnJvbSAnLi4vLi4vdG9rZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdXRoLWxpYi1zaWduLXVwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZ24tdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaWduLXVwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lnblVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlckZvcm06IEZvcm1Hcm91cDtcblxuICB1c2VybmFtZVBsYWNlaG9sZGVyID0gJ1VzZXJuYW1lJztcbiAgcGFzc3dvcmRQbGFjZWhvbGRlciA9ICdQYXNzd29yZCc7XG4gIGZpcnN0TmFtZVBsYWNlaG9sZGVyID0gJ0ZpcnN0IG5hbWUnO1xuICBsYXN0TmFtZVBsYWNlaG9sZGVyID0gJ0xhc3QgbmFtZSc7XG4gIGVtYWlsUGxhY2Vob2xkZXIgPSAnRW1haWwnO1xuICBlbnRlcnByaXNlUGxhY2Vob2xkZXIgPSAnRW50ZXJwcmlzZSc7XG5cbiAgc2lnblVwRGlhbG9nVGl0bGUgPSAnU2lnbiBVcCc7XG5cbiAgc2lnbnVwQnV0dG9uVHJhZHVjdGlvbiA9ICdMb2cgaW4nO1xuICBidXR0b25zQmFja2dyb3VuZENvbG9yID0gJyMzZjUxYjUnO1xuICBidXR0b25zQ29sb3IgPSAnd2hpdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQVVUSF9UUkFEVUNUSU9OUykgcHJpdmF0ZSB0cmFkdWN0aW9uczogQXV0aE1vZHVsZUNvbmZpZ1sndHJhZHVjdGlvbnMnXSxcbiAgICBASW5qZWN0KEFVVEhfU1RZTEVTKSBwcml2YXRlIHN0eWxlczogQXV0aE1vZHVsZUNvbmZpZ1snc3R5bGVzJ10sXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNpZ25VcENvbXBvbmVudD4sXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXV0aFN0YXRlPlxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlcm5hbWVQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS51c2VybmFtZVBsYWNlaG9sZGVyJywgdGhpcy51c2VybmFtZVBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLnBhc3N3b3JkUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0ucGFzc3dvcmRQbGFjZWhvbGRlcicsIHRoaXMucGFzc3dvcmRQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5maXJzdE5hbWVQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5maXJzdE5hbWVQbGFjZWhvbGRlcicsIHRoaXMuZmlyc3ROYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMubGFzdE5hbWVQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5sYXN0TmFtZVBsYWNlaG9sZGVyJywgdGhpcy5sYXN0TmFtZVBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmVtYWlsUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0uZW1haWxQbGFjZWhvbGRlcicsIHRoaXMuZW1haWxQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5lbnRlcnByaXNlUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0uZW50ZXJwcmlzZVBsYWNlaG9sZGVyJywgdGhpcy5lbnRlcnByaXNlUGxhY2Vob2xkZXIpO1xuXG4gICAgdGhpcy5zaWduVXBEaWFsb2dUaXRsZSA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZGlhbG9ncy5zaWdudXAnLCB0aGlzLnNpZ25VcERpYWxvZ1RpdGxlKTtcblxuICAgIHRoaXMuc2lnbnVwQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5zaWdudXAnLCB0aGlzLnNpZ251cEJ1dHRvblRyYWR1Y3Rpb24pO1xuICAgIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNCYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IpO1xuICAgIHRoaXMuYnV0dG9uc0NvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0NvbG9yJywgdGhpcy5idXR0b25zQ29sb3IpO1xuXG4gICAgdGhpcy51c2VyRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgdXNlcm5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBlbnRlcnByaXNlOiAnJ1xuICAgIH0pO1xuICB9XG5cbiAgb25TdWJtaXQoKSB7XG4gICAgY29uc3QgbmV3VXNlcjogUGFydGlhbDxVc2VyPiA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWyd1c2VybmFtZSddLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlckZvcm0udmFsdWVbJ3Bhc3N3b3JkJ10sXG4gICAgICBmaXJzdE5hbWU6IHRoaXMudXNlckZvcm0udmFsdWVbJ2ZpcnN0TmFtZSddLFxuICAgICAgbGFzdE5hbWU6IHRoaXMudXNlckZvcm0udmFsdWVbJ2xhc3ROYW1lJ10sXG4gICAgICBlbWFpbDogdGhpcy51c2VyRm9ybS52YWx1ZVsnZW1haWwnXSxcbiAgICAgIGVudGVycHJpc2U6IHRoaXMudXNlckZvcm0udmFsdWVbJ2VudGVycHJpc2UnXSB8fCBudWxsXG4gICAgfTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTaWduVXAobmV3VXNlcikpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKClcbiAgfVxufVxuIl19