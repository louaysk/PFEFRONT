import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'sb-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @Input() title!: string;
    @Input() hideBreadcrumbs = false;
    userDetails = null;
    roles;


    constructor(private router: Router, private service: CountryService, public toastr: ToastrService) {
        this.service.GetUserProfile()
            .subscribe(
                res => {
                    this.userDetails = res;
                    console.log("this.userDetails : ", this.userDetails)
                },
                err => {
                    console.log(err);
                },
            );
    }

    ngOnInit(): void {

    }


    OnUpdate() {
        console.log(this.userDetails)
            this.service.EditUser(this.userDetails).subscribe(
                (res: any) => {
                    console.log(res)
                    if (res.succeeded) {
                        this.toastr.success('User Modified !', 'Registration successful.');
                    }
                },
                err => {

                    console.log(err);
                }
            );
    }

}
