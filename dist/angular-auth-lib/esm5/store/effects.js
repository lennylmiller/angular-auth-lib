import { __decorate, __param, __read } from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { map, switchMap, catchError, tap, withLatestFrom, concatMap, filter } from 'rxjs/operators';
import { get } from 'lodash';
import { AUTH_ACTIONS_TYPE, LogInSuccess, LogInFailure, SignUpFailure, SignUpSuccess, ChangePasswordSuccess, ChangePasswordFailure, LoadUserInformationSuccess, LoadUserInformationFailure, SendPasswordSuccess, SendPasswordFailure } from './actions';
import { selectUser } from './selectors';
import { AuthService } from '../services/auth.service';
import { ForgottenPasswordComponent } from '../components/forgotten-password/forgotten-password.component';
import { AUTH_RESET_ACTIONS, AUTH_TRADUCTIONS } from '../token';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { isPlatformBrowser } from '@angular/common';
var AuthEffects = /** @class */ (function () {
    function AuthEffects(resetActions, traductions, platformId, actions, authService, router, toastService, dialog, store) {
        var _this = this;
        this.resetActions = resetActions;
        this.traductions = traductions;
        this.platformId = platformId;
        this.actions = actions;
        this.authService = authService;
        this.router = router;
        this.toastService = toastService;
        this.dialog = dialog;
        this.store = store;
        this.OpenSignUpDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG), tap(function () { return _this.dialogRef = _this.dialog.open(SignUpComponent); }));
        this.SignUp$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP), map(function (action) { return action.payload; }), switchMap(function (user) { return _this.authService.createUser(user).pipe(map(function () { return new SignUpSuccess(); }), catchError(function (error) { return of(new SignUpFailure(error)); })); }));
        this.SignUpSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS), tap(function () {
            _this.toastService.success(get(_this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!'));
        }));
        this.SignUpFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.signupFailure', 'Please try again with a new username.')); }));
        this.LogIn$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN), filter(function (action) { return isPlatformBrowser(_this.platformId); }), map(function (action) { return action.payload; }), switchMap(function (user) { return _this.authService.login(user).pipe(concatMap(function (loggedInUser) {
            sessionStorage.setItem('token', loggedInUser.token.token);
            return _this.authService.getUserInformation().pipe(map(function (_a) {
                var user = _a.user, usersList = _a.usersList;
                return new LogInSuccess({ user: user, usersList: usersList });
            }), catchError(function (error) { return of(new LogInFailure(error)); }));
        }), catchError(function (error) { return of(new LogInFailure(error)); })); }));
        this.LogInSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS), filter(function (action) { return isPlatformBrowser(_this.platformId); }), withLatestFrom(this.store.pipe(select(selectUser))), tap(function (_a) {
            var _b = __read(_a, 2), action = _b[0], user = _b[1];
            var redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
            if (redirectedUrlAfterLogIn && isPlatformBrowser(_this.platformId)) {
                _this.router.navigateByUrl(redirectedUrlAfterLogIn);
                sessionStorage.removeItem('redirectedUrlAfterLogIn');
            }
            else {
                _this.router.navigateByUrl(user.redirectUrlAfterLogin);
            }
            _this.toastService.success(get(_this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!'));
        }));
        this.LogInFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.')); }));
        this.LogOut$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_OUT), filter(function (action) { return isPlatformBrowser(_this.platformId); }), switchMap(function (action) {
            sessionStorage.removeItem('token');
            _this.router.navigate(['log-in']);
            return (_this.resetActions || []).map(function (resetAction) { return new resetAction(); });
        }));
        this.LoadUserInformation$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION), switchMap(function (action) { return _this.authService.getUserInformation().pipe(map(function (_a) {
            var user = _a.user, usersList = _a.usersList;
            return new LoadUserInformationSuccess(user);
        }), catchError(function (error) { return of(new LoadUserInformationFailure(error)); })); }));
        this.ChangePassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD), switchMap(function (action) { return _this.authService.changePassword(action.payload).pipe(map(function () { return new ChangePasswordSuccess(); }), catchError(function (error) { return of(new ChangePasswordFailure(error)); })); }));
        this.ChangePasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS), tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!')); }));
        this.ChangePasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.')); }));
        this.OpenForgottenPasswordDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG), tap(function () { return _this.dialogRef = _this.dialog.open(ForgottenPasswordComponent); }));
        this.SendPassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD), tap(function () {
            _this.dialogRef.close();
        }), switchMap(function (action) { return _this.authService.sendPassword(action.payload).pipe(map(function () { return new SendPasswordSuccess(); }), catchError(function (error) { return of(new SendPasswordFailure(error)); })); }));
        this.SendPasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS), tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.passwordResetSuccess', 'An email for resetting your password has been sent to your address.')); }));
        this.SendPasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE), tap(function () { return _this.toastService.error(get(_this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.')); }));
    }
    AuthEffects.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [AUTH_RESET_ACTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: Actions },
        { type: AuthService },
        { type: Router },
        { type: ToastrService },
        { type: MatDialog },
        { type: Store }
    ]; };
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "OpenSignUpDialog$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "SignUp$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SignUpSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SignUpFailure$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LogIn$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "LogInSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "LogInFailure$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LogOut$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LoadUserInformation$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "ChangePassword$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "ChangePasswordSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "ChangePasswordFailure$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "OpenForgottenPasswordDialog$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "SendPassword$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SendPasswordSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SendPasswordFailure$", void 0);
    AuthEffects = __decorate([
        Injectable(),
        __param(0, Inject(AUTH_RESET_ACTIONS)),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(PLATFORM_ID))
    ], AuthEffects);
    return AuthEffects;
}());
export { AuthEffects };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJzdG9yZS9lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEcsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU3QixPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLFlBQVksRUFDWixZQUFZLEVBR1osYUFBYSxFQUNiLGFBQWEsRUFFYixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLDBCQUEwQixFQUMxQiwwQkFBMEIsRUFHMUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNwQixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUMzRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQW9CLE1BQU0sVUFBVSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUlwRDtJQUdFLHFCQUNzQyxZQUFtQixFQUNyQixXQUE0QyxFQUNqRCxVQUFlLEVBQ3BDLE9BQWdCLEVBQ2hCLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZCxZQUEyQixFQUMzQixNQUFpQixFQUNqQixLQUF1QjtRQVRqQyxpQkFVSztRQVRpQyxpQkFBWSxHQUFaLFlBQVksQ0FBTztRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBSWpDLHNCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNuQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsRUFDN0MsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQzlELENBQUM7UUFHRixZQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3pCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFDakMsR0FBRyxDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sRUFBZCxDQUFjLENBQUMsRUFDdkMsU0FBUyxDQUFDLFVBQUMsSUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5RCxHQUFHLENBQUMsY0FBTSxPQUFBLElBQUksYUFBYSxFQUFFLEVBQW5CLENBQW1CLENBQUMsRUFDOUIsVUFBVSxDQUFDLFVBQUMsS0FBd0IsSUFBSyxPQUFBLEVBQUUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQ3ZFLEVBSHlCLENBR3pCLENBQUMsQ0FDSCxDQUFDO1FBR0YsbUJBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUN6QyxHQUFHLENBQUM7WUFDRixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLHdCQUF3QixFQUFFLGdDQUFnQyxDQUFDLENBQ3hGLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBR0YsbUJBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUN6QyxHQUFHLENBQUMsVUFBQyxLQUF3QixJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3ZELEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSx1Q0FBdUMsQ0FBQyxDQUMvRixFQUZpQyxDQUVqQyxDQUFDLENBQ0gsQ0FBQztRQUdGLFdBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUNoQyxNQUFNLENBQUMsVUFBQyxNQUFhLElBQUssT0FBQSxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQWxDLENBQWtDLENBQUMsRUFDN0QsR0FBRyxDQUFDLFVBQUMsTUFBYSxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sRUFBZCxDQUFjLENBQUMsRUFDdEMsU0FBUyxDQUFDLFVBQUMsSUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUN6RCxTQUFTLENBQUMsVUFBQyxZQUFrQjtZQUMzQixjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FDL0MsR0FBRyxDQUFDLFVBQUMsRUFBaUI7b0JBQWhCLGNBQUksRUFBRSx3QkFBUztnQkFBTSxPQUFBLElBQUksWUFBWSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQztZQUFyQyxDQUFxQyxDQUFDLEVBQ2pFLFVBQVUsQ0FBQyxVQUFDLEtBQXdCLElBQUssT0FBQSxFQUFFLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUN0RSxDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLFVBQUMsS0FBd0IsSUFBSyxPQUFBLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQ3RFLEVBVHlCLENBU3pCLENBQUMsQ0FDSCxDQUFDO1FBR0Ysa0JBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDL0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxFQUN4QyxNQUFNLENBQUMsVUFBQyxNQUFvQixJQUFLLE9BQUEsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLEVBQ3BFLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUNuRCxHQUFHLENBQUMsVUFBQyxFQUFvQztnQkFBcEMsa0JBQW9DLEVBQW5DLGNBQU0sRUFBRSxZQUFJO1lBQ2hCLElBQU0sdUJBQXVCLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2xGLElBQUksdUJBQXVCLElBQUksaUJBQWlCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNqRSxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO2dCQUNsRCxjQUFjLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDdkQ7WUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDdkIsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLDRCQUE0QixDQUFDLENBQ25GLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBR0Ysa0JBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDL0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxFQUN4QyxHQUFHLENBQUMsVUFBQyxLQUF3QixJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3ZELEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUMvRixFQUZpQyxDQUVqQyxDQUFDLENBQ0gsQ0FBQztRQUdGLFlBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDekIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUNqQyxNQUFNLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQWxDLENBQWtDLENBQUMsRUFDOUQsU0FBUyxDQUFDLFVBQUMsTUFBYztZQUN2QixjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsS0FBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxXQUFnQixJQUFLLE9BQUEsSUFBSSxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFBO1FBQy9FLENBQUMsQ0FBQyxDQUNILENBQUM7UUFHRix5QkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDdEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLEVBQy9DLFNBQVMsQ0FBQyxVQUFDLE1BQTJCLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNuRixHQUFHLENBQUMsVUFBQyxFQUFpQjtnQkFBaEIsY0FBSSxFQUFFLHdCQUFTO1lBQU0sT0FBQSxJQUFJLDBCQUEwQixDQUFDLElBQUksQ0FBQztRQUFwQyxDQUFvQyxDQUFDLEVBQ2hFLFVBQVUsQ0FBQyxVQUFDLEtBQXdCLElBQUssT0FBQSxFQUFFLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQ3BGLEVBSDBDLENBRzFDLENBQUMsQ0FDSCxDQUFDO1FBR0Ysb0JBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDakMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUN6QyxTQUFTLENBQUMsVUFBQyxNQUFzQixJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEYsR0FBRyxDQUFDLGNBQU0sT0FBQSxJQUFJLHFCQUFxQixFQUFFLEVBQTNCLENBQTJCLENBQUMsRUFDdEMsVUFBVSxDQUFDLFVBQUMsS0FBd0IsSUFBSyxPQUFBLEVBQUUsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FDL0UsRUFIcUMsQ0FHckMsQ0FBQyxDQUNILENBQUM7UUFHRiwyQkFBc0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDeEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLEVBQ2pELEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ2pDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSw4Q0FBOEMsQ0FBQyxDQUM5RyxFQUZTLENBRVQsQ0FBQyxDQUNILENBQUM7UUFHRiwyQkFBc0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDeEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLEVBQ2pELEdBQUcsQ0FBQyxVQUFDLEtBQXdCLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDdkQsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLGdDQUFnQyxFQUFFLDJDQUEyQyxDQUFDLENBQzNHLEVBRmlDLENBRWpDLENBQUMsQ0FDSCxDQUFDO1FBR0YsaUNBQTRCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzlDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQyxFQUN4RCxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBN0QsQ0FBNkQsQ0FBQyxDQUN6RSxDQUFDO1FBR0Ysa0JBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDL0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUN2QyxHQUFHLENBQUM7WUFDRixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxVQUFDLE1BQW9CLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNwRixHQUFHLENBQUMsY0FBTSxPQUFBLElBQUksbUJBQW1CLEVBQUUsRUFBekIsQ0FBeUIsQ0FBQyxFQUNwQyxVQUFVLENBQUMsVUFBQyxLQUF3QixJQUFLLE9BQUEsRUFBRSxDQUFDLElBQUksbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUM3RSxFQUhtQyxDQUduQyxDQUFDLENBQ0gsQ0FBQztRQUdGLHlCQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QyxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsRUFDL0MsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDakMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLCtCQUErQixFQUFFLHFFQUFxRSxDQUFDLENBQ3BJLEVBRlMsQ0FFVCxDQUFDLENBQ0gsQ0FBQztRQUdGLHlCQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QyxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsRUFDL0MsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDL0IsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLCtCQUErQixFQUFFLHFDQUFxQyxDQUFDLENBQ3BHLEVBRlMsQ0FFVCxDQUFDLENBQ0gsQ0FBQztJQTdKRSxDQUFDOzs0Q0FURixNQUFNLFNBQUMsa0JBQWtCO2dEQUN6QixNQUFNLFNBQUMsZ0JBQWdCO2dEQUN2QixNQUFNLFNBQUMsV0FBVztnQkFDRixPQUFPO2dCQUNILFdBQVc7Z0JBQ2hCLE1BQU07Z0JBQ0EsYUFBYTtnQkFDbkIsU0FBUztnQkFDVixLQUFLOztJQUl0QjtRQURDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzswREFJMUI7SUFHRjtRQURDLE1BQU0sRUFBRTtnREFRUDtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3VEQVExQjtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3VEQU0xQjtJQUdGO1FBREMsTUFBTSxFQUFFOytDQWVQO0lBR0Y7UUFEQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7c0RBaUIxQjtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3NEQU0xQjtJQUdGO1FBREMsTUFBTSxFQUFFO2dEQVNQO0lBR0Y7UUFEQyxNQUFNLEVBQUU7NkRBT1A7SUFHRjtRQURDLE1BQU0sRUFBRTt3REFPUDtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOytEQU0xQjtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOytEQU0xQjtJQUdGO1FBREMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3FFQUkxQjtJQUdGO1FBREMsTUFBTSxFQUFFO3NEQVVQO0lBR0Y7UUFEQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7NkRBTTFCO0lBR0Y7UUFEQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7NkRBTTFCO0lBMUtTLFdBQVc7UUFEdkIsVUFBVSxFQUFFO1FBS1IsV0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQixXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BTlgsV0FBVyxDQTJLdkI7SUFBRCxrQkFBQztDQUFBLEFBM0tELElBMktDO1NBM0tZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aW9ucywgRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgY2F0Y2hFcnJvciwgdGFwLCB3aXRoTGF0ZXN0RnJvbSwgY29uY2F0TWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7XG4gIEFVVEhfQUNUSU9OU19UWVBFLFxuICBMb2dJbixcbiAgTG9nSW5TdWNjZXNzLFxuICBMb2dJbkZhaWx1cmUsXG4gIExvZ091dCxcbiAgU2lnblVwLFxuICBTaWduVXBGYWlsdXJlLFxuICBTaWduVXBTdWNjZXNzLFxuICBDaGFuZ2VQYXNzd29yZCxcbiAgQ2hhbmdlUGFzc3dvcmRTdWNjZXNzLFxuICBDaGFuZ2VQYXNzd29yZEZhaWx1cmUsXG4gIExvYWRVc2VySW5mb3JtYXRpb25TdWNjZXNzLFxuICBMb2FkVXNlckluZm9ybWF0aW9uRmFpbHVyZSxcbiAgTG9hZFVzZXJJbmZvcm1hdGlvbixcbiAgU2VuZFBhc3N3b3JkLFxuICBTZW5kUGFzc3dvcmRTdWNjZXNzLFxuICBTZW5kUGFzc3dvcmRGYWlsdXJlXG59IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBzZWxlY3RVc2VyIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVscyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBGb3Jnb3R0ZW5QYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZm9yZ290dGVuLXBhc3N3b3JkL2ZvcmdvdHRlbi1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQVVUSF9SRVNFVF9BQ1RJT05TLCBBVVRIX1RSQURVQ1RJT05TLCBBdXRoTW9kdWxlQ29uZmlnIH0gZnJvbSAnLi4vdG9rZW4nO1xuaW1wb3J0IHsgQXV0aFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2VyJztcbmltcG9ydCB7IFNpZ25VcENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2lnbi11cC9zaWduLXVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhFZmZlY3RzIHtcbiAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaWduVXBDb21wb25lbnQgfCBGb3Jnb3R0ZW5QYXNzd29yZENvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChBVVRIX1JFU0VUX0FDVElPTlMpIHByaXZhdGUgcmVzZXRBY3Rpb25zOiBhbnlbXSxcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSB0b2FzdFNlcnZpY2U6IFRvYXN0clNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+XG4gICkgeyB9XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBPcGVuU2lnblVwRGlhbG9nJCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5PUEVOX1NJR05fVVBfRElBTE9HKSxcbiAgICB0YXAoKCkgPT4gdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFNpZ25VcENvbXBvbmVudCkpXG4gICk7XG5cbiAgQEVmZmVjdCgpXG4gIFNpZ25VcCQgPSB0aGlzLmFjdGlvbnMucGlwZShcbiAgICBvZlR5cGUoQVVUSF9BQ1RJT05TX1RZUEUuU0lHTl9VUCksXG4gICAgbWFwKChhY3Rpb246IFNpZ25VcCkgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgIHN3aXRjaE1hcCgodXNlcjogVXNlcikgPT4gdGhpcy5hdXRoU2VydmljZS5jcmVhdGVVc2VyKHVzZXIpLnBpcGUoXG4gICAgICBtYXAoKCkgPT4gbmV3IFNpZ25VcFN1Y2Nlc3MoKSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IG9mKG5ldyBTaWduVXBGYWlsdXJlKGVycm9yKSkpXG4gICAgKSlcbiAgKTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIFNpZ25VcFN1Y2Nlc3MkID0gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgb2ZUeXBlKEFVVEhfQUNUSU9OU19UWVBFLlNJR05fVVBfU1VDQ0VTUyksXG4gICAgdGFwKCgpID0+IHtcbiAgICAgIHRoaXMudG9hc3RTZXJ2aWNlLnN1Y2Nlc3MoXG4gICAgICAgIGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnbWVzc2FnZXMuc2lnbnVwU3VjY2VzcycsICdZb3VyIGFjY291bnQgaGFzIGJlZW4gY3JlYXRlZCEnKVxuICAgICAgKVxuICAgIH0pXG4gICk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBTaWduVXBGYWlsdXJlJCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5TSUdOX1VQX0ZBSUxVUkUpLFxuICAgIHRhcCgoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB0aGlzLnRvYXN0U2VydmljZS5lcnJvcihcbiAgICAgIGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnbWVzc2FnZXMuc2lnbnVwRmFpbHVyZScsICdQbGVhc2UgdHJ5IGFnYWluIHdpdGggYSBuZXcgdXNlcm5hbWUuJylcbiAgICApKVxuICApO1xuXG4gIEBFZmZlY3QoKVxuICBMb2dJbiQgPSB0aGlzLmFjdGlvbnMucGlwZShcbiAgICBvZlR5cGUoQVVUSF9BQ1RJT05TX1RZUEUuTE9HX0lOKSxcbiAgICBmaWx0ZXIoKGFjdGlvbjogTG9nSW4pID0+IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpLFxuICAgIG1hcCgoYWN0aW9uOiBMb2dJbikgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgIHN3aXRjaE1hcCgodXNlcjogVXNlcikgPT4gdGhpcy5hdXRoU2VydmljZS5sb2dpbih1c2VyKS5waXBlKFxuICAgICAgY29uY2F0TWFwKChsb2dnZWRJblVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBsb2dnZWRJblVzZXIudG9rZW4udG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5nZXRVc2VySW5mb3JtYXRpb24oKS5waXBlKFxuICAgICAgICAgIG1hcCgoe3VzZXIsIHVzZXJzTGlzdH0pID0+IG5ldyBMb2dJblN1Y2Nlc3MoeyB1c2VyLCB1c2Vyc0xpc3QgfSkpLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gb2YobmV3IExvZ0luRmFpbHVyZShlcnJvcikpKVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IG9mKG5ldyBMb2dJbkZhaWx1cmUoZXJyb3IpKSlcbiAgICApKVxuICApO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgTG9nSW5TdWNjZXNzJCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5MT0dfSU5fU1VDQ0VTUyksXG4gICAgZmlsdGVyKChhY3Rpb246IExvZ0luU3VjY2VzcykgPT4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSksXG4gICAgd2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5waXBlKHNlbGVjdChzZWxlY3RVc2VyKSkpLFxuICAgIHRhcCgoW2FjdGlvbiwgdXNlcl06IFtMb2dJblN1Y2Nlc3MsIFVzZXJdKSA9PiB7XG4gICAgICBjb25zdCByZWRpcmVjdGVkVXJsQWZ0ZXJMb2dJbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZGlyZWN0ZWRVcmxBZnRlckxvZ0luJyk7XG4gICAgICBpZiAocmVkaXJlY3RlZFVybEFmdGVyTG9nSW4gJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHJlZGlyZWN0ZWRVcmxBZnRlckxvZ0luKVxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWRpcmVjdGVkVXJsQWZ0ZXJMb2dJbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh1c2VyLnJlZGlyZWN0VXJsQWZ0ZXJMb2dpbik7XG4gICAgICB9XG4gICAgICB0aGlzLnRvYXN0U2VydmljZS5zdWNjZXNzKFxuICAgICAgICBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ21lc3NhZ2VzLmxvZ2luU3VjY2VzcycsICdIaSEgTmljZSB0byBzZWUgeW91IGFnYWluIScpXG4gICAgICApO1xuICAgIH0pXG4gICk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBMb2dJbkZhaWx1cmUkID0gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgb2ZUeXBlKEFVVEhfQUNUSU9OU19UWVBFLkxPR19JTl9GQUlMVVJFKSxcbiAgICB0YXAoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdGhpcy50b2FzdFNlcnZpY2UuZXJyb3IoXG4gICAgICBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ21lc3NhZ2VzLmxvZ2luRmFpbHVyZScsICdXcm9uZyBjcmVkZW50aWFscy4gUGxlYXNlIGNoZWNrIGFnYWluLicpXG4gICAgKSlcbiAgKTtcblxuICBARWZmZWN0KClcbiAgTG9nT3V0JCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5MT0dfT1VUKSxcbiAgICBmaWx0ZXIoKGFjdGlvbjogTG9nT3V0KSA9PiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSxcbiAgICBzd2l0Y2hNYXAoKGFjdGlvbjogTG9nT3V0KSA9PiB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydsb2ctaW4nXSk7XG4gICAgICByZXR1cm4gKHRoaXMucmVzZXRBY3Rpb25zIHx8IFtdKS5tYXAoKHJlc2V0QWN0aW9uOiBhbnkpID0+IG5ldyByZXNldEFjdGlvbigpKVxuICAgIH0pXG4gICk7XG5cbiAgQEVmZmVjdCgpXG4gIExvYWRVc2VySW5mb3JtYXRpb24kID0gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgb2ZUeXBlKEFVVEhfQUNUSU9OU19UWVBFLkxPQURfVVNFUl9JTkZPUk1BVElPTiksXG4gICAgc3dpdGNoTWFwKChhY3Rpb246IExvYWRVc2VySW5mb3JtYXRpb24pID0+IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VXNlckluZm9ybWF0aW9uKCkucGlwZShcbiAgICAgIG1hcCgoe3VzZXIsIHVzZXJzTGlzdH0pID0+IG5ldyBMb2FkVXNlckluZm9ybWF0aW9uU3VjY2Vzcyh1c2VyKSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IG9mKG5ldyBMb2FkVXNlckluZm9ybWF0aW9uRmFpbHVyZShlcnJvcikpKVxuICAgICkpXG4gICk7XG5cbiAgQEVmZmVjdCgpXG4gIENoYW5nZVBhc3N3b3JkJCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5DSEFOR0VfUEFTU1dPUkQpLFxuICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBDaGFuZ2VQYXNzd29yZCkgPT4gdGhpcy5hdXRoU2VydmljZS5jaGFuZ2VQYXNzd29yZChhY3Rpb24ucGF5bG9hZCkucGlwZShcbiAgICAgIG1hcCgoKSA9PiBuZXcgQ2hhbmdlUGFzc3dvcmRTdWNjZXNzKCkpLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiBvZihuZXcgQ2hhbmdlUGFzc3dvcmRGYWlsdXJlKGVycm9yKSkpXG4gICAgKSlcbiAgKTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIENoYW5nZVBhc3N3b3JkU3VjY2VzcyQgPSB0aGlzLmFjdGlvbnMucGlwZShcbiAgICBvZlR5cGUoQVVUSF9BQ1RJT05TX1RZUEUuQ0hBTkdFX1BBU1NXT1JEX1NVQ0NFU1MpLFxuICAgIHRhcCgoKSA9PiB0aGlzLnRvYXN0U2VydmljZS5zdWNjZXNzKFxuICAgICAgZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdtZXNzYWdlcy5jaGFuZ2VQYXNzd29yZFN1Y2Nlc3MnLCAnWW91ciBwYXNzd29yZCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY2hhbmdlZCEnKVxuICAgICkpXG4gICk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBDaGFuZ2VQYXNzd29yZEZhaWx1cmUkID0gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgb2ZUeXBlKEFVVEhfQUNUSU9OU19UWVBFLkNIQU5HRV9QQVNTV09SRF9GQUlMVVJFKSxcbiAgICB0YXAoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdGhpcy50b2FzdFNlcnZpY2UuZXJyb3IoXG4gICAgICBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ21lc3NhZ2VzLmNoYW5nZVBhc3N3b3JkRmFpbHVyZScsICdXcm9uZyBjdXJyZW50IHBhc3N3b3JkLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgKSlcbiAgKTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIE9wZW5Gb3Jnb3R0ZW5QYXNzd29yZERpYWxvZyQgPSB0aGlzLmFjdGlvbnMucGlwZShcbiAgICBvZlR5cGUoQVVUSF9BQ1RJT05TX1RZUEUuT1BFTl9GT1JHT1RURU5fUEFTU1dPUkRfRElBTE9HKSxcbiAgICB0YXAoKCkgPT4gdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50KSlcbiAgKTtcblxuICBARWZmZWN0KClcbiAgU2VuZFBhc3N3b3JkJCA9IHRoaXMuYWN0aW9ucy5waXBlKFxuICAgIG9mVHlwZShBVVRIX0FDVElPTlNfVFlQRS5TRU5EX1BBU1NXT1JEKSxcbiAgICB0YXAoKCkgPT4ge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9KSxcbiAgICBzd2l0Y2hNYXAoKGFjdGlvbjogU2VuZFBhc3N3b3JkKSA9PiB0aGlzLmF1dGhTZXJ2aWNlLnNlbmRQYXNzd29yZChhY3Rpb24ucGF5bG9hZCkucGlwZShcbiAgICAgIG1hcCgoKSA9PiBuZXcgU2VuZFBhc3N3b3JkU3VjY2VzcygpKSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gb2YobmV3IFNlbmRQYXNzd29yZEZhaWx1cmUoZXJyb3IpKSlcbiAgICApKVxuICApO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgU2VuZFBhc3N3b3JkU3VjY2VzcyQgPSB0aGlzLmFjdGlvbnMucGlwZShcbiAgICBvZlR5cGUoQVVUSF9BQ1RJT05TX1RZUEUuU0VORF9QQVNTV09SRF9TVUNDRVNTKSxcbiAgICB0YXAoKCkgPT4gdGhpcy50b2FzdFNlcnZpY2Uuc3VjY2VzcyhcbiAgICAgIGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnbWVzc2FnZXMucGFzc3dvcmRSZXNldFN1Y2Nlc3MnLCAnQW4gZW1haWwgZm9yIHJlc2V0dGluZyB5b3VyIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8geW91ciBhZGRyZXNzLicpXG4gICAgKSlcbiAgKTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIFNlbmRQYXNzd29yZEZhaWx1cmUkID0gdGhpcy5hY3Rpb25zLnBpcGUoXG4gICAgb2ZUeXBlKEFVVEhfQUNUSU9OU19UWVBFLlNFTkRfUEFTU1dPUkRfRkFJTFVSRSksXG4gICAgdGFwKCgpID0+IHRoaXMudG9hc3RTZXJ2aWNlLmVycm9yKFxuICAgICAgZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdtZXNzYWdlcy5wYXNzd29yZFJlc2V0RmFpbHVyZScsICdBbiBlcnJvciBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgKSlcbiAgKTtcbn1cbiJdfQ==