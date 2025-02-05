// import { CanActivateFn } from '@angular/router';

// export const roleAuthGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleauthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private router: Router) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  canActivateChild( childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userData=JSON.parse(localStorage.getItem('adminMenu')||'{}');
    if(this.isLinkPresentInMenu(state.url, userData)){
      return true;
    }
    else if(state.url.includes('/users/playerdetailview')||state.url.includes('/creator/dcpromotion')||state.url.includes('/creator/reel-history') || state.url.includes('/users/adminview')){
      return true;
    }
    else{
      if(userData[0].Link!='#')
      {
        this.router.navigate([(userData[0].Link).toLowerCase()]);
      }
      else
      {
        this.router.navigate([(userData[0].ChildMenu[0].Link).toLowerCase()]);
      }
      return false;
    }
  }
  
  isLinkPresentInMenu(link: string, menuList: any[]): boolean {
    for (let i = 0; i < menuList.length; i++) {
      if (link.includes(menuList[i]['Link'])) {
        return true;
      }
      if (menuList[i]['ChildMenu'] != null) {
        if (this.isLinkPresentInMenu(link, menuList[i]['ChildMenu'])) {
          return true;
        }
      }
    }
    return false;
  }
  
  
  canDeactivate( component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  canLoad( route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
