import { Component, OnInit } from '@angular/core';
import { BananaHttpService, Ticket, State } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  allTickets$: Observable<Ticket[]>;
  TicketState = State;
  constructor(private bananaHttpService: BananaHttpService) {}

  ngOnInit(): void {
    this.listTickets();
  }

  listTickets(): Observable<Ticket[]> {
    return (this.allTickets$ = this.bananaHttpService.allTickets({user: false}));
  }

  ticketStateChanges(ticketId: string, newState: State): void {
    this.bananaHttpService.ticketUpdate(ticketId, { newState }).subscribe(newT => {
      console.log(newT);
    });
  }
}
