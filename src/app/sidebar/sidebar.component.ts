import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

export enum ClientRoles {
  member = "member",
  community = "community",
  admin = "admin",
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
  { path: "/home", visible: true, title: "Home", icon: "nc-bank", class: "" },
  {
    path: "/about",
    visible: true,
    title: "About",
    icon: "nc-diamond",
    class: "",
  },
  {
    path: "/my-tickets",
    visible: true,
    title: "My Tickets",
    icon: "nc-pin-3",
    class: "",
    role: ClientRoles.member,
  },
  {
    path: "/tickets",
    visible: true,
    title: "Tickets",
    icon: "nc-bell-55",
    class: "",
    role: ClientRoles.community,
  },
  {
    path: "/stickies",
    visible: true,
    title: "Stickies",
    icon: "nc-single-02",
    class: "",
    role: ClientRoles.admin,
  },
  {
    path: "/personnel",
    visible: true,
    title: "Personnel",
    icon: "nc-tile-56",
    class: "",
    role: ClientRoles.admin,
  },
  {
    path: "/locations",
    visible: true,
    title: "Locations",
    icon: "nc-caps-small",
    class: "",
    role: ClientRoles.admin,
  },
  {
    path: "/profile",
    visible: false,
    title: "Profile",
    icon: "",
    class: "",
    role: ClientRoles.member,
  },
  {
    path: "/scan",
    visible: false,
    title: "Scan",
    icon: "",
    class: "",
    role: ClientRoles.member,
  },
  {
    path: "/ticket",
    visible: false,
    title: "Ticket",
    icon: "",
    class: "",
    role: ClientRoles.member,
  },
];

@Component({
  moduleId: module.id,
  selector: "app-sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    let userRoles = this.keycloakService
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
