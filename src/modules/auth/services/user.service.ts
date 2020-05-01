import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from "@angular/common/http";
import { browser } from 'protractor';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'http://localhost:54277/api';
    formModel = this.fb.group({
        UserName: ['', Validators.required],
        Email: ['', Validators.email],
        FullName: [''],
        Passwords: this.fb.group(
            {
                Password: ['', [Validators.required, Validators.minLength(6)]],
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
            FullName: this.formModel.value.FullName,
            Email: this.formModel.value.Email,
            Password: this.formModel.value.Passwords.Password
        };

        return this.http.post(this.BaseURI + '/ApplicationUser/Register/Admin', body);
    }

    login(formData) {
        return this.http.post(this.BaseURI + '/ApplicationUser/login', formData);
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

