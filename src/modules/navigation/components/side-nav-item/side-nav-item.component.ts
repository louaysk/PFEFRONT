import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements AfterViewInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;

    constructor(private route :Router,private toastr:ToastrService) {

    }
    ngAfterViewInit(): void {
        // console.clear()
        // console.log("sideNavItem",this.sideNavItem)
    }
    clickedLink(link){
        console.log(link)
        this.expanded = !this.expanded
        let IdOrganisation = localStorage.getItem("organizationId")
        if ((link == "/billingstatement" || link == "/invoiceprofils") && !IdOrganisation)  {
            this.route.navigateByUrl('/organisations');
            this.toastr.info('Please select a default organization');
        }else{
            this.route.navigateByUrl(link);
        }




    }

}
