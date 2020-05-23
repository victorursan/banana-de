// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig } from 'keycloak-angular';
import { BackendConfig } from './backend-config';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://sec.labs23.com/auth',
  realm: 'banana-cartchufi',
  clientId: 'cartchufi-service-fe'
};

const backendConfig: BackendConfig = {
  url: 'http://backend.labs23.com/api'
}

export const environment = {
  production: true,
  keycloakConfig,
  backendConfig
};
