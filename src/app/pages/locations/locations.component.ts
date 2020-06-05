import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BananaHttpService, Location, AddLocation } from "../../services";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
  providers: [NgbModalConfig, NgbModal],
})
export class LocationsComponent implements OnInit {
  allLocations$: Observable<Location[]>;
  allLocationsMap$: Observable<Map<string, Location>>;
  newLocation: AddLocation = { location: "", parentLocation: "" };

  constructor(
    private bananaHttpService: BananaHttpService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.listLocations();
  }

  listLocations(): void {
    this.allLocations$ = this.bananaHttpService.locations();
    this.allLocationsMap$ = this.allLocations$.pipe(
      map((locations) => new Map(locations.map((l) => [l.id, l])))
    );
  }

  onSubmit() {
    this.addLocation(this.newLocation).subscribe((l) => this.listLocations());
    this.newLocation = { location: "", parentLocation: "" };
  }

  private addLocation(addLocation: AddLocation): Observable<Location> {
    return this.bananaHttpService.addLocation(addLocation);
  }
}
