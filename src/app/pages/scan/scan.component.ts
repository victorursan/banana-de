import { Component, OnInit } from '@angular/core';
import { BananaHttpService, ScanSticky} from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  scanSticky$: Observable<ScanSticky>;

  constructor(private route: ActivatedRoute, private router: Router, private bananaHttpService: BananaHttpService) {

  }

  ngOnInit(): void {
    this.scanSticky$ = this.getScanSticky();
  }

  getScanSticky(): Observable<ScanSticky> {
    return this.route.paramMap.pipe(
      map(params => params.get('stickyLocationId')),
      flatMap(stickyLocationId => this.bananaHttpService.scanSticky(stickyLocationId))
    );
  }

  actionSelected(actionId: string, stickyLocationId: string): void {
    this.bananaHttpService.actionSelected({actionId, locationId: stickyLocationId})
    .subscribe(ticket => {
      this.router.navigate([`/ticket/${ticket.ticketId}`], {relativeTo: this.route, replaceUrl: true });
    });
  }
}
