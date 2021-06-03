import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
 /**
  *
  */
 constructor(private localStorageService: LocalStorageService, private router: Router) {;
   
 }

 userDetails:any;
 canActivate(){
   this.userDetails=this.localStorageService.retrieve('user');
   if (this.userDetails == null){
     //this.router.navigate(['login'])
    return false;
   }
   else{
     return true;
   }
 }
}
