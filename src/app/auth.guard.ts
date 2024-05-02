import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AngularServiceService } from './services/angular-service.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private angularService: AngularServiceService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.angularService.isAuthenticated()) {
      return true; // Allow access to the route if user is authenticated
    } else {
      // Redirect to login page if user is not authenticated
      return this.router.createUrlTree(['/login']);
    }
  }
}
