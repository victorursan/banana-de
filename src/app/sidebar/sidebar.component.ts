import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'nc-bank', class: '' },
  { path: '/about', title: 'About', icon: 'nc-diamond', class: '' },
  { path: '/my-tickets', title: 'My Tickets', icon: 'nc-pin-3', class: '' },
  { path: '/tickets', title: 'Ticekts', icon: 'nc-bell-55', class: '' },
  { path: '/stickies', title: 'Stickies', icon: 'nc-single-02', class: '' },
  { path: '/personnel', title: 'Personnel', icon: 'nc-tile-56', class: '' },
  { path: '/locations', title: 'Locations', icon: 'nc-caps-small', class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
