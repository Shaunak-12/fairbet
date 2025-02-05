// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import { CommonFunctionService } from '@services/common-function.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private utilities : CommonFunctionService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if(this.getProfile()){
            return true;
        }
        else{
            this.utilities.clearLocalVars();
            this.utilities.toastMsg('warning','Invalid access detected','Sign In Again !');
            location.replace("/login");
            return false;
        }
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    getProfile() {
        if (localStorage.getItem('personalDetails')) {
            return true;
        }
        else{
            return false;
        }
    }
}
