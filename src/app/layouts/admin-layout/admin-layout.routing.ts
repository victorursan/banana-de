import { Routes } from '@angular/router';

import {
  HomeComponent,
  AboutComponent,
  ScanComponent,
  TicketsComponent,
  PersonnelComponent,
  StickiesComponent,
  LocationsComponent,
  MyTicketsComponent,
  TicketComponent,
  ProfileComponent,
} from '../../pages';
import { AppAuthGuard } from '../../app.authguard';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'my-tickets',
    component: MyTicketsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['member'] }
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['community'] }
  },
  {
    path: 'scan/:stickyLocationId',
    component: ScanComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['member'] }
  },
  {
    path: 'ticket/:ticketId',
    component: TicketComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['member'] }
  },
  {
    path: 'stickies',
    component: StickiesComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'personnel',
    component: PersonnelComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['member'] }
  }
];
