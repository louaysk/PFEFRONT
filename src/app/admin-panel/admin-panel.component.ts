import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@modules/auth/services';



@Component({
  selector: 'sb-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    loading = false;

  constructor(private userService: UserService) { }

  ngOnInit(){
    //this.loading = true;
    //this.userService.getAll().pipe(first()).subscribe(users => {
      //  this.loading = false;
      //  this.users = users;
    //});
}



}
