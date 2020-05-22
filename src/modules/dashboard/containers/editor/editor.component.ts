import { Component, OnInit } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'sb-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    userBody: any;
    users2: any[]


    constructor(public service: CountryService, public toastr: ToastrService, private route : Router) {
        if (!this.service.FormUpdate.value.id) {
            this.route.navigate(["/admin-panel/"]);
        }
        console.log("FormUpdate : ", this.service.FormUpdate)
    }

    ngOnInit(): void {
    }

    OnUpdate() {
        this.service.EditUser().subscribe(
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




    changeroletoglobal() {
        this.service.toglobaladmin()
        .subscribe((res) => {
            console.log(res[0])
            this.service.FormUpdate.value.Role = res[0]
        })
    }

    changeroletoadmin() {
        this.service.toadmin()
        .subscribe((res) => {
            console.log(res[0])
            this.service.FormUpdate.value.Role = res[0]
        });
    }

}
