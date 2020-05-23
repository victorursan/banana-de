import { Location } from './location';

export interface Action {
  id: string;
  roleId: string;
  message: string;
  state: string;
}

export interface Sticky {
  id: string;
  message: string;
  actions: Action[];
  locations: Location[];
}
