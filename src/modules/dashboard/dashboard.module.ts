/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { AdminPanelComponent } from './components';
import { EditorComponent } from './containers/editor/editor.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ClientsComponent } from '@modules/dashboard/containers/clients/clients.component';
import { UsersComponent } from './containers/users/users.component';
import { OrganisationsComponent } from './containers/organisations/organisations.component';
import { BilligstatementComponent } from './containers/billigstatement/billigstatement.component';
import { InvoiceprofilesComponent } from './containers/invoiceprofiles/invoiceprofiles.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components,AdminPanelComponent, EditorComponent,ProfileComponent,ClientsComponent,UsersComponent,OrganisationsComponent,BilligstatementComponent,InvoiceprofilesComponent],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}
