import {
    Component,
    OnInit,
    Renderer2,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BananaHttpService } from 'app/services';

@Component({
    moduleId: module.id,
    selector: 'app-navbar-cmp',
    styleUrls: ['navbar.component.scss'],
    templateUrl: 'navbar.component.html',
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild('app-navbar-cmp', { static: false }) button;

    userDetails: KeycloakProfile;
    logedIn: boolean;

    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private keycloakService: KeycloakService
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.map(ro => ro);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
        });

        this.keycloakService.isLoggedIn().then((isLogedIn) => {
            this.logedIn = isLogedIn;
        });
    }

    doLogout() {
        this.keycloakService.logout(location.origin);
    }

    doLogin() {
        this.keycloakService.login();
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee.charAt(0) === '/') {
            titlee = titlee.substr(1, ).split('/')[0]
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path.substr(1, ) === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');
        if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
        }
        this.sidebarVisible = true;
    }

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
        if (window.innerWidth < 991) {
            setTimeout(function () {
                mainPanel.style.position = '';
            }, 500);
        }
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }
}
