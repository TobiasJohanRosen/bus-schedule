import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransitLineService {
  constructor(private http: HttpClient) {}

  public fetch(url: string) {
    return this.http.post<Array<object>>(environment.endpoints.realtime, {
      url: url
    }).toPromise();
  }
}
