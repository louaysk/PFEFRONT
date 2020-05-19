import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @Input() title!: string ;
    @Input() hideBreadcrumbs = false;
    userDetails;
    roles;


  constructor(private router: Router, private service: CountryService) { }

  ngOnInit(): void {
    this.service.GetUserProfile().subscribe(
        res => {
            this.userDetails = res;
        },
        err => {
            console.log(err);
        },
    );


  }

}
