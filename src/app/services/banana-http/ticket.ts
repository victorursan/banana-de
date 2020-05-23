export enum State {
  Acquired = 'Acquired',
  Solved = 'Solved',
  Pending = 'Pending'
}

export interface Ticket {
  ticketId: string;
  message: string;
  state: State;
}
