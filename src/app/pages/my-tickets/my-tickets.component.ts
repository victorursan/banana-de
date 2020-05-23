import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket, BananaHttpService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {
  allTickets$: Observable<Ticket[]>;

  constructor(private route: ActivatedRoute, private router: Router, private bananaHttpService: BananaHttpService) {}

  ngOnInit(): void {
    this.listTickets();
  }

  listTickets(): Observable<Ticket[]> {
    return (this.allTickets$ = this.bananaHttpService.allTickets({user: true}));
  }

  navigateToTicket(ticketId: string): void {
    this.router.navigate([`/ticket/${ticketId}`], {relativeTo: this.route, replaceUrl: true });
  }

}
