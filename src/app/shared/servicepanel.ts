import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ApplicationUserModel } from './usermodel';
import { environment } from 'environments/environment';


@Injectable({ providedIn : 'root'})
export class servicepanel {
    baseUrl = environment.apiUrl;

    constructor(private http : HttpClient){}
    list:ApplicationUserModel[];
    getusers(){
        return this.http.get(this.baseUrl+'/ApplicationUser/GetAdmins', { withCredentials: true });
    }
}
