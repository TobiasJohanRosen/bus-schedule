import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'iw-fatal',
  templateUrl: './fatal.component.html',
  styleUrls: ['./fatal.component.scss']
})
export class FatalComponent implements OnInit {
  public debug = 'Ingen information tillgänglig.';

  constructor(private http: HttpClient) {
    this.http
      .get<string>(environment.endpoints.debug)
      .toPromise()
      .then(response => {
        this.debug = response;
      })
      .catch(error => {
        console.error(error);
        this.debug = 'Ingen information tillgänglig.';
      });
  }

  ngOnInit() {}
}
