import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';
import { log } from 'util';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(public navigationService: NavigationService, public userService: UserService) {}

    username : string = ''

    ngOnInit() {
        let token = localStorage.getItem('token')
        if (token) {
            let decodedToken : any = jwt_decode(token);
            this.username = decodedToken.UserName
            console.log(decodedToken.UserName)
        }

        let role = localStorage.getItem('role')
        if (role) {
            if (role == "User") {
                this.sideNavSections = this.sideNavSections.filter(x=>x.index!=1)
                this.sideNavSections = this.sideNavSections.filter(x=>x.index!=3)

            }else if (role == "Admin"){
                this.sideNavSections = this.sideNavSections.filter(x=>x.index!=1)
                this.sideNavSections = this.sideNavSections.filter(x=>x.index!=3)

            }else if (role == "GlobalAdmin"){
                // code here ..
                // delete this.sideNavItems.adminPanel
            }
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
