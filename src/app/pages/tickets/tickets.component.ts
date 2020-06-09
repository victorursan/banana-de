import { Component, OnInit, TemplateRef } from '@angular/core';
import {
    BananaHttpService,
    Ticket,
    State,
    Sticky,
    SelectAction,
    Location,
    Personnel,
} from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
    allTickets$: Observable<Ticket[]>;
    allStickies$: Observable<Sticky[]>;
    locations$: Observable<Map<string, Location>>;
    personnel$: Observable<Map<string, Personnel>>;

    modalRef: BsModalRef;
    TicketState = State;
    selectedStickyId: string;
    selectedSticky$: Observable<Sticky>;
    actionSelected: SelectAction = { actionId: '', locationId: '' };

    constructor(
        private bananaHttpService: BananaHttpService,
        private modalService: BsModalService
    ) {}

    open(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {
        this.listTickets();
        this.listStickies();
        this.listLocations();
        this.listPersonnel();
    }

    createTicket() {
        this.bananaHttpService
            .actionSelected(this.actionSelected)
            .subscribe((ticket) => {
                this.listTickets();
                this.actionSelected = { actionId: '', locationId: '' };
            });
    }

    setSelectedSticky(stickyId: string): void {
        this.selectedStickyId = stickyId;
        this.selectedSticky$ = this.allStickies$.pipe(
            map((a) => a.find((s) => s.id === stickyId))
        );
    }

    listTickets(): Observable<Ticket[]> {
        return (this.allTickets$ = this.bananaHttpService.allTickets({
            user: false,
        }));
    }

    private listPersonnel(): Observable<Map<string, Personnel>> {
        return (this.personnel$ = this.bananaHttpService
            .allPersonnel({ operating: true })
            .pipe(map((personnel) => new Map(personnel.map((p) => [p.id, p])))));
    }

    listStickies(): Observable<Sticky[]> {
        return (this.allStickies$ = this.bananaHttpService.allStickies());
    }

    private listLocations(): Observable<Map<string, Location>> {
        return (this.locations$ = this.bananaHttpService
            .locations()
            .pipe(map((locations) => new Map(locations.map((l) => [l.id, l])))));
    }

    ticketStateChanges(ticketId: string, newState: State): void {
        this.bananaHttpService
            .ticketUpdate(ticketId, { newState })
            .subscribe((newT) => {
                this.listTickets();
            });
    }
}
