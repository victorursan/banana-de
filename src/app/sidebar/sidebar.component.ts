import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export enum ClientRoles {
    member = 'member',
    community = 'community',
    admin = 'admin',
}

export interface RouteInfo {
    path: string;
    visible: boolean;
    title: string;
    icon: string;
    class: string;
    role?: ClientRoles;
}

export const ROUTES: RouteInfo[] = [
    {
        path: '/home',
        visible: true,
        title: 'Home',
        icon: 'fas fa-home',
        class: '',
    },
    {
        path: '/my-tickets',
        visible: true,
        title: 'My Tickets',
        icon: 'fas fa-tasks',
        class: '',
        role: ClientRoles.member,
    },
    {
        path: '/tickets',
        visible: true,
        title: 'Tickets',
        icon: 'fas fa-clipboard-list',
        class: '',
        role: ClientRoles.community,
    },
    {
        path: '/stickies',
        visible: true,
        title: 'Stickies',
        icon: 'fas fa-sticky-note',
        class: '',
        role: ClientRoles.admin,
    },
    {
        path: '/team',
        visible: true,
        title: 'Team',
        icon: 'fas fa-users',
        class: '',
        role: ClientRoles.admin,
    },
    {
        path: '/locations',
        visible: true,
        title: 'Locations',
        icon: 'fas fa-building',
        class: '',
        role: ClientRoles.admin,
    },
    {
        path: '/profile',
        visible: false,
        title: 'Profile',
        icon: '',
        class: '',
        role: ClientRoles.member,
    },
    {
        path: '/scan',
        visible: false,
        title: 'Scan',
        icon: '',
        class: '',
        role: ClientRoles.member,
    },
    {
        path: '/ticket',
        visible: false,
        title: 'Ticket',
        icon: '',
        class: '',
        role: ClientRoles.member,
    },
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar-cmp',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: RouteInfo[];

    constructor(private keycloakService: KeycloakService) {}

    ngOnInit() {
        const userRoles = this.keycloakService
            .getUserRoles()
            .filter((o) => ClientRoles[o as keyof typeof ClientRoles])
            .map((o) => ClientRoles[o as keyof typeof ClientRoles]);
        this.menuItems = ROUTES.filter((menuItem) => {
            if (menuItem.role) {
                return menuItem.visible && userRoles.includes(menuItem.role);
            }
            return menuItem.visible;
        });
    }
}
