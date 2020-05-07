import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ApplicationUserModel } from './usermodel';

@Injectable({ providedIn : 'root'})
export class servicepanel {
    constructor(private http : HttpClient){}
    list:ApplicationUserModel[];
    getusers(){
        return this.http.get("http://localhost:54277/api/ApplicationUser/GetAdmins", { withCredentials: true });
    }
}
