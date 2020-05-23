import { Action } from './sticky';

export interface ScanSticky {
  id: string;
  locationId: string;
  message: string;
  actions: Action[];
}
