import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '@modules/auth/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
    declarations: [AppComponent, AdminPanelComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule, ReactiveFormsModule,BrowserAnimationsModule,ToastrModule.forRoot({progressBar :true})],
    providers: [UserService],
    bootstrap: [AppComponent],
})
export class AppModule {}
