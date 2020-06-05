import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Location } from './location';
import { Role } from './role';
import { ScanSticky } from './scan-sticky';
import { Ticket } from './ticket';
import { SelectAction } from './select-action';
import { UpdateTicketState } from './update-ticket-state';
import { PersonnelFilter } from './personnel-filter';
import { Personnel } from './personnel';
import { UpdatePersonnel } from './update-personnel';
import { AddLocation } from './add-location';
import { Sticky } from './sticky';
import { AddSticky } from './add-sticky';
import { TicketFilter } from './ticket-filter';
import { environment } from 'environments/environment';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})

export class BananaHttpService {
  backendUrl: string;

  constructor(private http: HttpClient) { this.backendUrl = environment.backendConfig.url }

  locations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.backendUrl}/locations`);
  }

  roles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.backendUrl}/roles`);
  }

  scanSticky(stickyId: string): Observable<ScanSticky> {
    return this.http.get<ScanSticky>(
      `${this.backendUrl}/stickies/scan/${stickyId}`
    );
  }

  actionSelected(actionSelected: SelectAction): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${this.backendUrl}/actions`,
      actionSelected
    );
  }

  ticket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${this.backendUrl}/tickets/${ticketId}`
    );
  }

  allTickets(ticketFilter: TicketFilter): Observable<Ticket[]> {
    const params = new HttpParams().append(
      'user',
      String(ticketFilter.user)
    );
    return this.http.get<Ticket[]>(`${this.backendUrl}/tickets`, {params});
  }

  allStickies(): Observable<Sticky[]> {
    return this.http.get<Sticky[]>(`${this.backendUrl}/stickies`);
  }

  ticketUpdate(
    ticketId: string,
    ticketUpdate: UpdateTicketState
  ): Observable<Ticket> {
    return this.http.put<Ticket>(
      `${this.backendUrl}/tickets/${ticketId}`,
      ticketUpdate
    );
  }

  allPersonnel(personnelFilter: PersonnelFilter): Observable<Personnel[]> {
    let params = new HttpParams().append(
      'operating',
      String(personnelFilter.operating)
    );
    if (personnelFilter.username) {
      params = params.append('username', personnelFilter.username);
    }
    return this.http.get<Personnel[]>(`${this.backendUrl}/personnel`, {
      params,
    });
  }

  updatePersonnel(personnelId: string, updatePersonnel: UpdatePersonnel): Observable<Personnel> {
    return this.http.put<Personnel>(`${this.backendUrl}/personnel/${personnelId}`, updatePersonnel);
  }

  addLocation(addLocation: AddLocation): Observable<Location> {
    return this.http.post<Location>(`${this.backendUrl}/locations`, addLocation);
  }

  addSticky(addSticky: AddSticky): Observable<Sticky> {
    return this.http.post<Sticky>(`${this.backendUrl}/stickies`, addSticky);
  }

  userProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.backendUrl}/profile`);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.backendUrl}/profile`);
  }

}
