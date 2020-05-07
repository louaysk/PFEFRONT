import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@modules/auth/services';
import { servicepanel} from "app/shared/servicepanel";
import { ApplicationUserModel } from "app/shared/usermodel";
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';





@Component({
  selector: 'sb-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(public servicepanel : servicepanel) {
  }

  ngOnInit(){}




}
