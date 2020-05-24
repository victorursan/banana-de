import { Component, OnInit } from '@angular/core';
import { Ticket, BananaHttpService, State } from '../../services';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  ticket$: Observable<Ticket>;
  TicketState = State;

  constructor(private route: ActivatedRoute, private bananaHttpService: BananaHttpService) { }

  ngOnInit(): void {
    this.ticket$ = this.getTicket();
  }

  getTicket(): Observable<Ticket> {
    return this.route.paramMap.pipe(
      map(params => params.get('ticketId')),
      flatMap(ticketId => this.bananaHttpService.ticket(ticketId))
    );
  }

}
