import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, DoBootstrap } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BananaHttpService } from 'app/services';
import { environment } from 'environments/environment';

const keycloakService: KeycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    FooterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    BananaHttpService,
    {
      provide: KeycloakService,
      useValue: keycloakService,
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(app) {
    const { keycloakConfig } = environment;
    keycloakService
    .init({ config: keycloakConfig,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true
      },
      enableBearerInterceptor: true
    })
    .then(() => {
      console.log('[ngDoBootstrap] bootstrap app');

      app.bootstrap(AppComponent);
    })
    .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
