import { Component, OnInit } from "@angular/core";
import {
  BananaHttpService,
  Ticket,
  State,
  Sticky,
  SelectAction,
  Location,
  Personnel
} from "../../services";
import { Observable } from "rxjs";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { map } from "rxjs/operators";

@Component({
  selector: "app-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.scss"],
  providers: [NgbModalConfig, NgbModal],
})
export class TicketsComponent implements OnInit {
  allTickets$: Observable<Ticket[]>;
  allStickies$: Observable<Sticky[]>;
  locations$: Observable<Map<string, Location>>;
  personnel$: Observable<Map<string, Personnel>> ;

  TicketState = State;
  selectedStickyId: string;
  selectedSticky$: Observable<Sticky>;
  actionSelected: SelectAction = { actionId: "", locationId: "" };

  constructor(
    private bananaHttpService: BananaHttpService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.listTickets();
    this.listStickies();
    this.listLocations();
    this.listPersonnel();
  }

  open(content) {
    this.modalService.open(content);
  }

  createTicket() {
    this.bananaHttpService
      .actionSelected(this.actionSelected)
      .subscribe((ticket) => {
        this.listTickets();
        this.actionSelected = { actionId: "", locationId: "" };
      });
  }

  setSelectedSticky(stickyId: string): void {
    this.selectedStickyId = stickyId;
    this.selectedSticky$ = this.allStickies$.pipe(
      map((a) => a.find((s) => s.id == stickyId))
    );
  }

  listTickets(): Observable<Ticket[]> {
    return (this.allTickets$ = this.bananaHttpService.allTickets({
      user: false,
    }));
  }

  private listPersonnel(): Observable<Map<string, Personnel>> {
    return (this.personnel$ = this.bananaHttpService.allPersonnel({operating: true}).pipe(map((personnel) => new Map(personnel.map((p) => [p.id, p])))));
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
