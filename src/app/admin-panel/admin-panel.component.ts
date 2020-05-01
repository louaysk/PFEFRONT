import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@modules/auth/services';
import { servicepanel} from "app/shared/servicepanel";
import { ApplicationUserModel } from "app/shared/usermodel";




@Component({
  selector: 'sb-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(public servicepanel : servicepanel) { }

  ngOnInit(){

}
getusers(){
     this.servicepanel.getusers().subscribe(res  =>{
         this.servicepanel.list=res as ApplicationUserModel[] ;
     })
 }



}
