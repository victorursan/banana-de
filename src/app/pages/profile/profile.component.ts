import { Component, OnInit, TemplateRef, AfterViewInit } from "@angular/core";
import { BananaHttpService, UserProfile } from "app/services";
import { Observable } from "rxjs";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { KeycloakService } from "keycloak-angular";
import { ClientRoles } from "app/sidebar/sidebar.component";
import { TelegramLoginRecv } from 'app/services/telegram-login/telegram-login-recv';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  ClientRoles = ClientRoles;
  userRoles: Array<string>;
  modalRef: BsModalRef;

  constructor(
    private bananaHttpService: BananaHttpService,
    private keycloakService: KeycloakService,
    private modalService: BsModalService,
    private cookieService: CookieService
  ) {
    this.userRoles = this.keycloakService.getUserRoles();
    window["loginViaTelegram"] = (loginData) => this.loginViaTelegram(loginData);
  }



  private loginViaTelegram(loginData: TelegramLoginRecv) {
    // deleteAll(path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict'): void;

    console.log(loginData);
    this.bananaHttpService
      .addTelegramDataToUserProfile({id: loginData.id,
        firstName: loginData.first_name,
        lastName: loginData.last_name,
        username: loginData.username})
      .subscribe((u) => this.profile());
  }

  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.profile();
  }

  deleteAccount(): void {
    this.bananaHttpService.deleteAccount().subscribe((l) => {
      this.keycloakService.logout(location.origin);
    });
  }

  profile(): Observable<UserProfile> {
    return (this.userProfile$ = this.bananaHttpService.userProfile());
  }
}
