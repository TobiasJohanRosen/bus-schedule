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
      .post<Array<object>>('https://relay.mwts.se', {
        url: environment.transitLines[transitLineNumber]
      })
      .toPromise();
  }
}
