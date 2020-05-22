import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '@modules/auth/services';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.model';
import { Router } from '@angular/router';




@Injectable({ providedIn: 'root' })

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    url=environment.apiUrl;
    constructor(private http: HttpClient, private router : Router){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

     currentUserValue(): User {
        return this.currentUserSubject.value;
        console.log(this.currentUserSubject.value);

    }




    onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);

}

}
