// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig } from 'keycloak-angular';
import { BackendConfig } from './backend-config';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.2.109:8080/auth',
  realm: 'banana-cartchufi',
  clientId: 'cartchufi-service-fe'
};

const backendConfig: BackendConfig = {
  url: 'http://192.168.2.109:8081/api'
}

export const environment = {
  production: false,
  keycloakConfig,
  backendConfig
};
