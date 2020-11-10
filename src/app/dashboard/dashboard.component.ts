import { Component, OnInit } from '@angular/core';
import { TransitLineService } from '../transit-line.service';
import { StopDeparture } from '../stop-departure';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'iw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public stops = [];
  public stopDepartures: { [ id: string ]: Array<StopDeparture>; } = {};
  public stopDeparturesDirections: Array<Array<string>> = [];

  public error: string | null = null;
  public fatal = false;
  public clock: Date = new Date();
  public loading = true;
  public updating = false;
  private retryAttempts = 3;
  public backOnline = false;

  public bus_max = 4;

  private beginUpdates() {
    setTimeout(() => {
      this.fetchAllStopDepartures();
      this.loading = false;
    }, (environment.production ? 15 : 2.5) * 1000);
  }

  private fetchUpdateStatus() {
    this.api
      .checkIfUpdating()
      .then(() => {
        this.updating = true;
      })
      .catch(() => {
        this.updating = false;
      });
  }

  private startClock() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
  }

  constructor(private api: TransitLineService) {
    this.stops = Object.keys(environment.stops);
    Object.keys(environment.stops).forEach((el) => {
      this.stopDeparturesDirections[el] = [];
    });
    for (const stop of this.stops) {
      this.stopDepartures[stop] = [];
    }
    this.beginUpdates();
    this.startClock();
  }

  private showBackOnline() {
    this.backOnline = true;
    setTimeout(() => {
      this.backOnline = false;
    }, 10000);
  }

  private pingUpdateScript() {
    this.api.checkForUpdates();
  }
  /*private fetchFailoverDepartures(lineNumber: number) {
    return new Promise((resolve, reject) => {
      this.api
        .fetchFailover(lineNumber)
        .then(result => {
          const departures = [];
          result.forEach(transitDeparture => {
            if (parseInt(transitDeparture['transportNumber'], 10) === lineNumber) {
              departures.push(new TransitDeparture(null, transitDeparture));
            }
          });
          this.transitDepartures[lineNumber] = departures;
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }*/
  public parseStopDepartures(stop: string, data: object) {
    const dep = [];
    data['departures'].forEach((departure: object) => {
      const stop_op = environment.stops[stop];
      let area_count = 0;
      dep.forEach(el => {
        if (el['direction'] === departure['area']) area_count++;
      });
      if (!stop_op['bus_count']) stop_op['bus_count'] = this.bus_max;
      if (area_count >= stop_op['bus_count'])  return;
      if (stop_op['ignore'] && stop_op['ignore'].includes(departure['line']['lineNo'])) return;
      if (environment.stops[stop]['directions'] &&
         environment.stops[stop]['directions'].includes(departure['area'])) {
        dep.push(new StopDeparture(departure));
      } else if (!environment.stops[stop]['directions']) {
        dep.push(new StopDeparture(departure));
      }
    });
    dep.forEach((el) => {
      if (!this.stopDeparturesDirections[stop].includes(el['direction'])) {
        this.stopDeparturesDirections[stop].push(el['direction']);
      }
    });
    for (const key of Object.keys(this.stopDeparturesDirections)) {
      this.stopDeparturesDirections[key].sort();
    }
    this.stopDepartures[stop] = dep;
    if (this.error != null) {
      this.showBackOnline();
    }
    this.error = null;

  }
  private fetchStopDepartures(stop: string) {
    return new Promise((resolve, reject) => {
      this.api.fetch(environment.stops[stop]['url']).then(res => {
        this.parseStopDepartures(stop, res);
        resolve();
      }).catch(err => reject(err));
    });
  }

  private updateStopDepartures(stops: Array<string>, online: boolean = true, retry: number = 0, offlineCounter: number = 0) {
    if (!stops.length) {
      console.log('No more stops to update, queuing update in 10 seconds.');
      setTimeout(() => {
        this.fetchAllStopDepartures();
        this.fetchUpdateStatus();
      }, 10 * 1000);
      return;
    }
    const stop = stops[0];
    Promise.resolve().then(() => {
      if (online) {
        this.fetchStopDepartures(stop).then(() => {
          stops.splice(0, 1);
          this.updateStopDepartures(stops);
          this.pingUpdateScript();
          this.fatal = false;
        }).catch(err => {
          if (retry >= this.retryAttempts) {
            this.updateStopDepartures(stops, false, 0);
            this.error = err;
            return;
          }
          console.warn('Failed to fetch realtime data, will try offline in 10s');
          setTimeout(() => {
            this.updateStopDepartures(stops, true, retry + 1);
          }, 10 * 1000);
        });
      } else {
        console.log(offlineCounter);
        console.log('I should probably implement failover cache for thsi new stop stuff');
          /*this.fetchFailoverDepartures(line)
            .then(() => {
              remaining.splice(0, 1);
              if (offlineCounter > 10) {
                this.updateDepartures(
                  remaining,
                  true,
                  this.retryAttempts - 1,
                  0
                );
                console.log('Attempting to go online');
              } else {
                this.updateDepartures(
                  remaining,
                  false,
                  retry,
                  offlineCounter + 1
                );
              }
              this.fatal = false;
            })
            .catch(error => {
              console.error(error);
              this.fatal = true;
            });*/
      }
    });
  }
  private fetchAllStopDepartures(): void {
    this.updateStopDepartures(this.stops.slice(0));
  }

  ngOnInit() {
    // Run on view initialization
  }
}
