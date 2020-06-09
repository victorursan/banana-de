import { Component, OnInit } from '@angular/core';
import { BananaHttpService, Personnel, PersonnelFilter, Role, Location, UpdatePersonnel } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-personnel',
    templateUrl: './personnel.component.html',
    styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
    allPersonnel$: Observable<Personnel[]>;
    locations$: Observable<Map<string, Location>>;
    roles$: Observable<Map<string, Role>>;
    operating = true;
    username = '';

    constructor(private route: ActivatedRoute, private bananaHttpService: BananaHttpService) { }

    ngOnInit(): void {
        this.listLocations();
        this.listRoles();
        this.refreshPersonnel(this.operating, this.username);
    }

    refreshPersonnel(operating: boolean, username: string): void {
        this.operating = operating;
        this.username = username;
        if (username.trim().length > 0) {
            this.allPersonnel$ = this.listPersonnel({operating, username});
        } else {
            this.allPersonnel$ = this.listPersonnel({operating});
        }
    }

    updatePersonnelRole(personnelId: string, newRoleId: string): void {
        this.updatePersonnel(personnelId, {newRole: newRoleId}).subscribe(p => console.log(p));
    }

    updatePersonnelLocation(personnelId: string, newLocationId: string): void {
        this.updatePersonnel(personnelId, {newLocation: newLocationId}).subscribe(p => console.log(p));
    }

    private listPersonnel(personnelFilter: PersonnelFilter): Observable<Personnel[]> {
        return this.bananaHttpService.allPersonnel(personnelFilter);
    }

    private listLocations(): Observable<Map<string, Location>> {
        return this.locations$ = this.bananaHttpService.locations().pipe(map((locations) => new Map(locations.map((l) => [l.id, l]))));
    }

    private listRoles(): Observable<Map<string, Role>> {
        return this.roles$ = this.bananaHttpService.roles().pipe(map((roles) => new Map(roles.map((r) => [r.id, r]))));
    }

    private updatePersonnel(personnelId: string, updatePersonnel: UpdatePersonnel): Observable<Personnel> {
        return this.bananaHttpService.updatePersonnel(personnelId, updatePersonnel);
    }
}
