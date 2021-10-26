import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.expectedRole;
      const user = this.authService.getUserDecode();
      if(user.roles !== expectedRole)
      {
        alert("Không có quyền truy cập vào trang này");
          this.router.navigate(['login']);
          return false;
      }
    return true;
  }
  
}
