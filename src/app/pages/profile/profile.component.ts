import { Component, OnInit } from "@angular/core";
import { BananaHttpService, UserProfile } from "app/services";
import { Observable } from "rxjs";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { KeycloakService } from 'keycloak-angular';
import { ClientRoles } from 'app/sidebar/sidebar.component';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [NgbModalConfig, NgbModal],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  ClientRoles = ClientRoles;
  userRoles: Array<string>;

  constructor(
    private bananaHttpService: BananaHttpService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private keycloakService: KeycloakService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
    this.userRoles = this.keycloakService
      .getUserRoles()
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.profile();
  }

  deleteAccount(): void {
    this.bananaHttpService.deleteAccount().subscribe(l => {
      this.keycloakService.logout(location.origin)
    });

  }

  profile(): Observable<UserProfile> {
    return (this.userProfile$ = this.bananaHttpService.userProfile());
  }
}
