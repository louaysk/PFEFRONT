import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';

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

    constructor() {

    }
    ngAfterViewInit(): void {
        // console.clear()
        // console.log("sideNavItem",this.sideNavItem)
    }

}
