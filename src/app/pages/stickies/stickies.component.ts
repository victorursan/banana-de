import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BananaHttpService, Sticky, AddSticky, AddLocation, AddAction, Role, Location } from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stickies',
  templateUrl: './stickies.component.html',
  styleUrls: ['./stickies.component.scss'],
})
export class StickiesComponent implements OnInit {
  allStickies$: Observable<Sticky[]>;
  locations$: Observable<Map<string, Location>>;
  roles$: Observable<Map<string, Role>>;
  newSticky: AddSticky = { message: '', actions: [{ action: '', roleId: ''}], locations: [{ location: '', parentLocation: ''}] };

  constructor(
    private route: ActivatedRoute,
    private bananaHttpService: BananaHttpService
  ) {}

  ngOnInit(): void {
    this.listStickies();
    this.listLocations();
    this.listRoles();
  }

  listStickies(): Observable<Sticky[]> {
    return (this.allStickies$ = this.bananaHttpService.allStickies());
  }

  onSubmit(): void {
    this.addSticky(this.newSticky).subscribe((s) => console.log(s));
    this.newSticky = { message: '', actions: [{ action: '', roleId: ''}], locations: [{ location: '', parentLocation: ''}] };
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
