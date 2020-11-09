import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransitLineService {
  constructor(private http: HttpClient) {}

  public toTransitDepartures() {}

  public fetch(url: string) {
    return this.http.post<Array<object>>(environment.endpoints.realtime, {
      url: url
    }).toPromise();
  }

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

  public checkForUpdates() {
    return this.http.get(environment.endpoints.update).toPromise();
  }

  public checkIfUpdating() {
    return this.http.get('updating.json').toPromise();
  }
}
