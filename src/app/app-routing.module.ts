import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from '@modules/dashboard/components';
import { EditorComponent } from '../modules/dashboard/containers/editor/editor.component';
import { ProfileComponent } from '../modules/dashboard/containers/profile/profile.component';
import { ClientsComponent } from '../modules/dashboard/containers/clients/clients.component';
import { AuthGuard } from '@modules/auth/guards';
import { UsersComponent } from '@modules/dashboard/containers/users/users.component';
import { OrganisationsComponent } from '@modules/dashboard/containers/organisations/organisations.component';
let currentUser = JSON.parse(localStorage.getItem('currentUser'))
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
    },
    {
        path: 'admin-panel',
        component : AdminPanelComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'clients',
        component : ClientsComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'users',
        component : UsersComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'Profile',
        component : ProfileComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'organisations',
        component : OrganisationsComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'admin-panel/edit-user',
        component : EditorComponent,
        canActivate: [AuthGuard],

    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    // {
    //     path: 'tables',
    //     loadChildren: () =>
    //         import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    // },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
