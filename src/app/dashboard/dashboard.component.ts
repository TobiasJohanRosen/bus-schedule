import { Component, OnInit } from '@angular/core';
import { TransitLineService } from '../transit-line.service';

@Component({
  selector: 'iw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public transitLines = [6, 11, 770, 804];
  public transitDepartures = {
    804: [],
    11: [],
    6: [],
    770: []
  };

  constructor(private api: TransitLineService) {}

  private getDeparturesFor(lineNumber: number) {
    this.api
      .getTimeSchedule(lineNumber)
      .then(result => {
        result.forEach(transitDeparture => {
          if (
            transitDeparture['routeLinks'][0]['line']['lineNo'] === lineNumber
          ) {
            this.transitDepartures[lineNumber].push(transitDeparture);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  private fetchAllTransitLineDepartures(): void {
    this.getDeparturesFor(6);
    this.getDeparturesFor(11);
    this.getDeparturesFor(770);
    this.getDeparturesFor(804);
  }

  ngOnInit() {
    this.fetchAllTransitLineDepartures();
  }
}
