import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransitLineService {
  constructor(private http: HttpClient) {}

  public toTransitDepartures() {}

  public fetchRealtime(transitLineNumber: number) {
    return this.http
      .post<Array<object>>(environment.endpoints.realtime, {
        url: environment.transitUrls[transitLineNumber]
      })
      .toPromise();
  }

  public fetchFailover(transitLineNumber: number) {
    return this.http
      .post<Array<object>>(environment.endpoints.failover, {
        line: transitLineNumber
      })
      .toPromise();
  }

  public checkIfUpdating() {
    return this.http.get('updating.json').toPromise();
  }
}
