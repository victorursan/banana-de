import { AddLocation } from './add-location';

export interface AddAction {
  action: string;
  roleId: string;
}

export interface AddSticky {
  message: string;
  actions: AddAction[];
  locations: AddLocation[];
}
