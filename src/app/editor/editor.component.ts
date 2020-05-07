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

  constructor(public  service:CountryService, public toastr : ToastrService) {

    console.log("FormUpdate : ",this.service.FormUpdate)
  }

  ngOnInit(): void {
  }

      OnUpdate(){
    this.service.EditUser().subscribe(
      (res: any) => {
          console.log(res)
        if (res.succeeded) {
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
          debugger
        console.log(err);
      }
    );
  }
}
