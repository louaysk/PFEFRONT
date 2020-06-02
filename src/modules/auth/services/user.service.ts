import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from "@angular/common/http";
import { browser } from 'protractor';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.apiUrl;


    constructor(private fb: FormBuilder, private http: HttpClient) { }

    formModel = this.fb.group({
        UserName: ['', Validators.required],
        Email: ['', Validators.email],
        lastName: [''],
        FirstName: [''],
        PhoneNumber: [''],
        Passwords: this.fb.group(
            {
                Password: ['', Validators.required],
                ConfirmPassword: ['', Validators.required],
            },
            { validator: this.comparePasswords }
        ),
    });
    comparePasswords(fb: FormGroup) {
        let confirmPswrdCtrl = fb.get('ConfirmPassword');
        //passwordMismatch
        //confirmPswrdCtrl.errors={passwordMismatch:true}
        if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
          if (fb.get('Password').value != confirmPswrdCtrl.value)
            confirmPswrdCtrl.setErrors({ passwordMismatch: true });
          else
            confirmPswrdCtrl.setErrors(null);
        }
      }
    register() {
        console.log("register");
        var body = {
            UserName: this.formModel.value.UserName,
            lastName: this.formModel.value.lastName,
            FirstName:this.formModel.value.FirstName,
            Email: this.formModel.value.Email,
            PhoneNumber:this.formModel.value.PhoneNumber,
            Password: this.formModel.value.Passwords.Password
        };

        return this.http.post(this.baseUrl + '/ApplicationUser/Register/Admin', body);
    }

    login(formData) {
        return this.http.post(this.baseUrl + '/ApplicationUser/login', formData);
    }



    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payLoad.role;
        allowedRoles.forEach(element => {
            if (userRole == element) {
                isMatch = true;
                return false;
            }
        });
        return isMatch;

    }

}

