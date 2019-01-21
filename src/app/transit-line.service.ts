import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransitLineService {
  constructor(private http: HttpClient) {}

  public getTimeSchedule(transitLineNumber: number) {
    return this.http
      .post<Array<object>>(environment.endpoints.realtime, {
        url: environment.transitLines[transitLineNumber]
      })
      .toPromise();
  }

  public getOfflineTimeSchedule(transitLineNumber: number) {
    return this.http
      .post<Array<object>>(environment.endpoints.failover, {
        line: transitLineNumber
      })
      .toPromise();
  }
}
