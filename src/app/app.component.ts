import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'banana-webapp';
  userDetails: KeycloakProfile;
  navbarOpen = false;
  logedIn: boolean;

  constructor(private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.keycloakService.isLoggedIn().then(isLogedIn => {
      this.logedIn = isLogedIn;
      if (isLogedIn) {
        this.keycloakService.loadUserProfile().then(user => this.userDetails = user);
      }
    });
  }

  doLogout() {
    this.keycloakService.logout();
  }

  doLogin() {
    this.keycloakService.login();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
