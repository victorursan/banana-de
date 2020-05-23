import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BananaHttpService, Location, AddLocation} from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  allLocations$: Observable<Location[]>;
  allLocationsMap$: Observable<Map<string, Location>>;
  newLocation: AddLocation = {location: '', parentLocation: ''};

  constructor(private route: ActivatedRoute, private bananaHttpService: BananaHttpService) { }

  ngOnInit(): void {
    this.listLocations();
  }

  listLocations(): void {
    this.allLocations$ = this.bananaHttpService.locations();
    this.allLocationsMap$ = this.allLocations$.pipe(map((locations) => new Map(locations.map((l) => [l.id, l]))));
  }

  onSubmit() {
    this.addLocation(this.newLocation).subscribe(l => console.log(l));
    this.newLocation = {location: '', parentLocation: ''};
  }

  private addLocation(addLocation: AddLocation): Observable<Location> {
    return this.bananaHttpService.addLocation(addLocation);
  }
}
