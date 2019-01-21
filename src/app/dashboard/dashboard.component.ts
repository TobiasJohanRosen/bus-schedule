import { Component, OnInit } from '@angular/core';
import { TransitLineService } from '../transit-line.service';
import { TransitDeparture } from '../transit-departure';

@Component({
  selector: 'iw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public transitLines = [6, 11, 770, 804];
  public deferredTransitLines = [1, 10, 809];
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

  public hasFetchedTransitLine: Array<number> = [];

  public deferred: Array<TransitDeparture> = [];

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

  private fetchFailoverDepartures(lineNumber: number) {
    return new Promise((resolve, reject) => {
      this.api
        .fetchFailover(lineNumber)
        .then(result => {
          let departures = [];
          result.forEach(transitDeparture => {
            if (parseInt(transitDeparture['transportNumber']) === lineNumber) {
              departures.push(new TransitDeparture(null, transitDeparture));
            }
          });
          this.transitDepartures[lineNumber] = departures;
          if (!this.hasFetchedTransitLine.includes(lineNumber)) {
            this.hasFetchedTransitLine.push(lineNumber);
          }
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private fetchDepartures(lineNumber: number) {
    return new Promise((resolve, reject) => {
      this.api
        .fetchRealtime(lineNumber)
        .then(result => {
          let departures = [];
          result.forEach(transitDeparture => {
            if (
              transitDeparture['routeLinks'][0]['line']['lineNo'] === lineNumber
            ) {
              departures.push(new TransitDeparture(transitDeparture));
            }
          });
          this.transitDepartures[lineNumber] = departures;
          if (!this.hasFetchedTransitLine.includes(lineNumber)) {
            this.hasFetchedTransitLine.push(lineNumber);
          }
          this.error = null;
          resolve();
        })
        .catch(error => {
          this.error = error;
          reject(error);
        });
    });
  }

  private updateDepartures(remaining: Array<number>, online: boolean = true) {
    if (remaining.length) {
      let line = remaining[0];
      Promise.resolve().then(() => {
        if (online) {
          // Fetch realtime data
          this.fetchDepartures(line)
            .then(() => {
              remaining.splice(0, 1);
              this.updateDepartures(remaining);
            })
            .catch(error => {
              this.updateDepartures(remaining, false);
              this.error = error;
            });
        } else {
          // Fetch failover data
          this.fetchFailoverDepartures(line)
            .then(() => {
              remaining.splice(0, 1);
              this.updateDepartures(remaining, false);
            })
            .catch(error => {
              console.error(error);
              this.error = error;
            });
        }
      });
    }
  }

  private fetchAllTransitLineDepartures(): void {
    this.updateDepartures(this.transitLines.slice(0));
    // TODO: Implement -> this.getDeferredDepartures(this.deferredTransitLines.slice(0));
  }

  ngOnInit() {
    this.fetchAllTransitLineDepartures();
  }

  /**
   * Deferred
   */
  private getDeferredDeparturesFor(lineNumber: number) {
    return new Promise((resolve, reject) => {
      this.api
        .fetchFailover(lineNumber)
        .then(result => {
          let departures = [];
          result.forEach(transitDeparture => {
            if (parseInt(transitDeparture['transportNumber']) === lineNumber) {
              departures.push(new TransitDeparture(null, transitDeparture));
            }
          });
          resolve(departures);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getDeferredDepartures(lineNumbers: Array<number>) {
    let deferredDepartures = [];
    lineNumbers.forEach(line => {
      this.getDeferredDeparturesFor(line)
        .then(result => {
          deferredDepartures.push(result[0]);
          console.log(deferredDepartures);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}
