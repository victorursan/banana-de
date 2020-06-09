import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TelegramLoginWidgetComponent} from '../../utils/telegram-login-widget/telegram-login-widget.component'


import {
    HomeComponent,
    ScanComponent,
    TicketComponent,
    TicketsComponent,
    PersonnelComponent,
    StickiesComponent,
    LocationsComponent,
    MyTicketsComponent,
    ProfileComponent,
} from '../../pages';

import { AppAuthGuard } from 'app/app.authguard';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        ScanComponent,
        TicketComponent,
        TicketsComponent,
        PersonnelComponent,
        StickiesComponent,
        LocationsComponent,
        MyTicketsComponent,
        ProfileComponent,
        TelegramLoginWidgetComponent
    ],
    providers: [AppAuthGuard]
})
export class AdminLayoutModule {}
