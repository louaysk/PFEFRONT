import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot,ActivatedRouteSnapshot,Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from 'modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private AuthService : AuthService) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.AuthService.currentUserValue();
        const expectedRole = next.data.expectedRole;

        console.log("currentUser",currentUser);

        console.log("expectedRole",expectedRole);

        console.log("localStorage.getItem('token')",localStorage.getItem('token'));


        let isLoggedIn = localStorage.getItem('token')
        if (isLoggedIn) {
            // check if route is restricted by role
            // if (localStorage.getItem('role') !== expectedRole) {
            //     // role not authorised so redirect to home page
                // this.router.navigate(['/dashboard']);
            //     return false;
            // }
            // authorised so return true
            // this.router.navigate(['/admin-panel']);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);


        return false;

    }
}
