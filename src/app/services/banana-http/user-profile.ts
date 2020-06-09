import { Role } from './role';
import { Location } from './location';

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telegramUsername?: string;
    role: Role;
    location: Location;
}
