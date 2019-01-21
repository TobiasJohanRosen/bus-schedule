import { Component, OnInit } from '@angular/core';
import { TransitLineService } from '../transit-line.service';
import { TransitDeparture } from '../transit-departure';

@Component({
  selector: 'iw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public thisIsProgress: number;
  public transitLines = [6, 11, 770, 804];
  public _transitDepartures: {
    6: Array<TransitDeparture>;
    11: Array<TransitDeparture>;
    770: Array<TransitDeparture>;
    804: Array<TransitDeparture>;
  } = {
    6: [],
    11: [],
    770: [],
    804: []
  };
  public transitDepartures: {
    6: Array<TransitDeparture>;
    11: Array<TransitDeparture>;
    770: Array<TransitDeparture>;
    804: Array<TransitDeparture>;
  } = {
    6: [],
    11: [],
    770: [],
    804: []
  };

  public error: string | null = null;

  public clock: Date = new Date();

  public landscape: boolean = false;

  public hasFetchedTransitLine: Array<number> = [];

  constructor(private api: TransitLineService) {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
    setTimeout(() => {
      setInterval(() => {
        this.fetchAllTransitLineDepartures();
      }, 10 * 1000);
    }, 5000);
  }

  private getDeparturesFor(lineNumber: number) {
    return new Promise((resolve, reject) => {
      this.api
        .getTimeSchedule(lineNumber)
        .then(result => {
          this._transitDepartures[lineNumber] = [];
          result.forEach(transitDeparture => {
            if (
              transitDeparture['routeLinks'][0]['line']['lineNo'] === lineNumber
            ) {
              this._transitDepartures[lineNumber].push(
                new TransitDeparture(transitDeparture)
              );
            }
          });
          this.transitDepartures[lineNumber] = this._transitDepartures[
            lineNumber
          ];
          if (!this.hasFetchedTransitLine.includes(lineNumber)) {
            this.hasFetchedTransitLine.push(lineNumber);
          }
          this.error = null;
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getDepartures(remaining: Array<number>) {
    if (remaining.length) {
      let line = remaining[0];
      Promise.resolve().then(() => {
        this.getDeparturesFor(line)
          .then(() => {
            remaining.splice(0, 1);
            this.getDepartures(remaining);
          })
          .catch(error => {
            this.error = error;
          });
      });
    }
  }

  private fetchAllTransitLineDepartures(): void {
    this.getDepartures(this.transitLines);
  }

  ngOnInit() {
    this.landscape = window.innerHeight < window.innerWidth ? true : false;
    this.fetchAllTransitLineDepartures();
  }
}
