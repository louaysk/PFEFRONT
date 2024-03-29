/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [AuthGuard],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'static',
        data: {
            title: 'Dashboard Static ',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Static',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [AuthGuard],
        component: dashboardContainers.StaticComponent,
    },
    // {
    //     path: 'admin-panel',
    //     data: {
    //         title: 'Dashboard Admin Panel',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Static',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [AuthGuard],
    //     component: AdminPanelComponent,
    // },
    {
        path: 'light',
        data: {
            title: 'Dashboard Light ',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Light',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [AuthGuard],

        component: dashboardContainers.LightComponent,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
