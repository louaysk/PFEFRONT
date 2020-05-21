import { Component, OnInit } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'sb-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    userBody: any;
    users2: any[]


    constructor(public service: CountryService, public toastr: ToastrService) {

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
        this.service.toglobaladmin().subscribe(() => {

        })
    }

    changeroletoadmin() {
        this.service.toadmin().subscribe(() => {

        });
    }

}
