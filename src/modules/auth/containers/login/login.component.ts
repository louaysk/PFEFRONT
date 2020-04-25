import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, AuthService } from '@modules/auth/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    formModel ={
        UserName:'',
        Password:''
    }
    constructor( private service:UserService, private authService: AuthService,private router: Router, private toastr:ToastrService) {
        let isLoggedIn = localStorage.getItem('token')
        if (isLoggedIn) {
            this.router.navigateByUrl('/dashboard');
        }
    }


ngOnInit(){

}


    onSubmit(form:NgForm){
        this.service.login(form.value).subscribe(
            (res:any)=> {
                localStorage.setItem('token',res.token);
                this.toastr.success('Authentification succussfully');
                this.router.navigateByUrl('/dashboard');
                const   payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
                const   userRole = payLoad.role;
                localStorage.setItem('role',userRole);
                console.log("this.userRole "+userRole);
                this.authService.currentUserValue()
            },
            err=> {
                if(err.status==400)
                this.toastr.error('Incorrect User name or Password','Authentification failed');
                else
                console.log(err);
            }

        );
    }

}
