import { Location } from './location';

export enum ActionState {
    Available = 'available',
    In_Progress = 'in_progress',
}

export interface Action {
    id: string;
    roleId: string;
    message: string;
    state: ActionState;
}

export interface Sticky {
    id: string;
    message: string;
    actions: Action[];
    locations: Location[];
}
