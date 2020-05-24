import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import {
  HomeComponent,
  AboutComponent,
  ScanComponent,
  TicketComponent,
  TicketsComponent,
  PersonnelComponent,
  StickiesComponent,
  LocationsComponent,
  MyTicketsComponent,
  ProfileComponent,
} from '../../pages';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppAuthGuard } from 'app/app.authguard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    ScanComponent,
    TicketComponent,
    TicketsComponent,
    PersonnelComponent,
    StickiesComponent,
    LocationsComponent,
    MyTicketsComponent,
    ProfileComponent,
  ],
  providers: [AppAuthGuard]
})
export class AdminLayoutModule {}
