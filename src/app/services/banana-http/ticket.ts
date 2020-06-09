export enum State {
    Acquired = 'acquired',
    Solved = 'solved',
    Pending = 'pending'
}

export interface Ticket {
    ticketId: string;
    message: string;
    state: State;
    createdAt: Date;
    acquiredAt?: Date;
    solvedAt?: Date;
    ownedBy?: string;
}
