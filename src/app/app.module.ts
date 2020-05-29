import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '@modules/auth/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from '@modules/dashboard/components';
import { TablesModule } from '@modules/tables/tables.module';
import { DashboardHeadComponent } from '@modules/navigation/components';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { EditorComponent } from '../modules/dashboard/containers/editor/editor.component';
import { ProfileComponent } from "@modules/dashboard/containers/profile/profile.component";
import { ClientsComponent } from '../modules/dashboard/containers/clients/clients.component';
import { OrganisationsComponent } from '../modules/dashboard/containers/organisations/organisations.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        TablesModule,
        DashboardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        ToastrModule.forRoot({ progressBar: true }),
    ],
    providers: [UserService],
    bootstrap: [AppComponent],
})
export class AppModule { }
