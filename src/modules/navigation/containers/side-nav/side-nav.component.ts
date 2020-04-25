import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';
import { log } from 'util';

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

    ngOnInit() {

        console.log("sideNavItem",this.sideNavItems)
        console.log("submenu before  :",this.sideNavItems.pages.submenu[0].submenu);
        // let index  = this.sideNavItems.pages.submenu[0].submenu
        let role = localStorage.getItem('role')
        if (role) {
            if (role == "User") {
                console.log("i m in the user*********************")
                this.sideNavItems.pages.submenu[0].submenu = [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ]
            }else if (role == "Admin"){
                console.log("i m in the admin*****************")
                this.sideNavItems.pages.submenu[0].submenu =
                [{
                    text: 'Login',
                    link: '/auth/login',
                },
                {
                    text: 'Register',
                    link: '/auth/register',
                },
                {
                    text: 'Forgot Password',
                    link: '/auth/forgot-password',
                },]
            }else if (role == "GlobalAdmin"){
                console.log("i m in the global admin *********************")
                this.sideNavItems.pages.submenu[0].submenu =
                [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                    {
                        text: 'Admin Panel ',
                        link: '/admin-panel',
                     }

                ]
            }

        }

        console.log("submenu after :",this.sideNavItems.pages.submenu[0].submenu);



    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
