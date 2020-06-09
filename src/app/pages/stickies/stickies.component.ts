import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BananaHttpService, Sticky, AddSticky, AddLocation, AddAction, Role, Location, SelectAction } from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-stickies',
    templateUrl: './stickies.component.html',
    styleUrls: ['./stickies.component.scss']
})
export class StickiesComponent implements OnInit {
    allStickies$: Observable<Sticky[]>;
    locations$: Observable<Map<string, Location>>;
    roles$: Observable<Map<string, Role>>;
    selectedSticky$: Observable<Sticky>;
    modalRef: BsModalRef;

    newSticky: AddSticky = { message: '', actions: [{ action: '', roleId: ''}], locations: [{ location: '', parentLocation: ''}] };

    selectedStickyId: string;
    actionSelected: SelectAction = {actionId: '', locationId: ''};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bananaHttpService: BananaHttpService,
        private modalService: BsModalService
    ) {}

    open(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
    }

    createTicket() {
        this.bananaHttpService.actionSelected(this.actionSelected)
            .subscribe(ticket => {
                this.router.navigate([`/ticket/${ticket.ticketId}`], {relativeTo: this.route, replaceUrl: true });
            });
    }

    setSelectedSticky(stickyId: string): void {
        this.selectedStickyId = stickyId;
        this.selectedSticky$ = this.allStickies$.pipe(map(a => a.find(s => s.id === stickyId)));
    }

    ngOnInit(): void {
        this.listStickies();
        this.listLocations();
        this.listRoles();
    }

    listStickies(): Observable<Sticky[]> {
        return (this.allStickies$ = this.bananaHttpService.allStickies());
    }

    onSubmit(): void {
        this.addSticky(this.newSticky).subscribe((s) => {
            this.listStickies();
            this.newSticky = { message: '', actions: [{ action: '', roleId: ''}], locations: [{ location: '', parentLocation: ''}] };
        });
    }

    private addSticky(addSticky: AddSticky): Observable<Sticky> {
        return this.bananaHttpService.addSticky(addSticky);
    }

    addLocationRow(): void {
        const newLocation: AddLocation = { location: '', parentLocation: ''};
        this.newSticky.locations.push(newLocation);
    }

    deleteLocationRow(index: number): void {
        this.newSticky.locations.splice(index, 1);
    }

    addActionRow(): void {
        const newAction: AddAction = { action: '', roleId: ''};
        this.newSticky.actions.push(newAction);
    }

    deleteActionRow(index: number): void {
        this.newSticky.actions.splice(index, 1);
    }

    private listLocations(): Observable<Map<string, Location>> {
        return this.locations$ = this.bananaHttpService.locations().pipe(map((locations) => new Map(locations.map((l) => [l.id, l]))));
    }

    private listRoles(): Observable<Map<string, Role>> {
        return this.roles$ = this.bananaHttpService.roles().pipe(map((roles) => new Map(roles.map((r) => [r.id, r]))));
    }

}
