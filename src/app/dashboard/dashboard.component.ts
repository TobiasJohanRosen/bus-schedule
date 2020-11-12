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
  public stopDepartures: { [id: string]: Array<StopDeparture>; } = {};
  public stopDeparturesDirections: Array<Array<string>> = [];

  public error: string | null = null;
  public fatal = false;
  public clock: Date = new Date();
  public loading = true;
  private retryAttempts = 3;
  public backOnline = false;
  public bus_max = 4;

  /**
   * This constructor will initialize all needed variables for each stop.
   * This needs to be updated in the future if the site will be using mainly buses,
   * as they are fetched from the stop itself.
   */
  constructor(private api: TransitLineService) {
    this.stops = Object.keys(environment.stops);
    Object.keys(environment.stops).forEach((el) => {
      this.stopDeparturesDirections[el] = [];
    });
    for (const stop of this.stops) {
      this.stopDepartures[stop] = [];
    }
    this.fetchAllStopDepartures();
    this.startClock();
  }

  /**
   * Initialize a component clock to keep track of the date and update it once
   * per second
   */
  private startClock() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
  }

  /**
   * Set a timeout for 10 seconds to show a updating splash when the API
   * is in the process of updating the offline cache
   */
  private showBackOnline() {
    this.backOnline = true;
    setTimeout(() => {
      this.backOnline = false;
    }, 10000);
  }

  /**
   * This method handles all the parsing of data retrieved from the API.
   * It will also handle the structuring of objects used to display said data.
   */
  public parseStopDepartures(stop: string, data: object) {
    const dep = [];
    if (Object.keys(data).length < 1) return;
    data['departures'].forEach((departure: object) => {
      const stop_op = environment.stops[stop];
      let area_count = 0;
      dep.forEach(el => {
        if (el['direction'] === departure['area']) area_count++;
      });
      if (!stop_op['bus_count']) stop_op['bus_count'] = this.bus_max;
      if (area_count >= stop_op['bus_count']) return;
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

  /**
   * Return a promise when fetching stops from the API
   */
  private fetchStopDepartures(stop: string) {
    return new Promise((resolve, reject) => {
      this.api.fetch(environment.stops[stop]['url']).then(res => {
        this.parseStopDepartures(stop, res);
        resolve();
      }).catch(err => reject(err));
    });
  }

  /**
   * This function is queued once every 10 seconds to update all information
   * regarding each stop. This is done recursively through the `stops` parameter.
   * It will also keep track of failed attempts to update departures, and while doing so
   * it will automatically switch over to the offline cache if it fails `retryAttempts` number of times.
   */
  private updateStopDepartures(stops: Array<string>, online: boolean = true, retry: number = 0, offlineCounter: number = 0) {
    if (!stops.length) {
      console.log('No more stops to update, queuing update in 10 seconds.');
      setTimeout(() => {
        this.fetchAllStopDepartures();
      }, 10 * 1000);
      return;
    }
    const stop = stops[0];
    Promise.resolve().then(() => {
      if (online) {
        this.fetchStopDepartures(stop).then(() => {
          stops.splice(0, 1);
          this.updateStopDepartures(stops);
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
        console.log('I should probably implement failover cache for this new stop stuff');
      }
    });
    if (this.loading) setTimeout(() => { this.loading = false; }, 1500);
  }

  /**
   * This function handles all updates of departures, the reason it exists in
   * it's current form is because it's also supposed to handle offline cache updating.
   */
  private fetchAllStopDepartures(): void {
    this.updateStopDepartures(this.stops.slice(0));
  }

  /**
   * Angular needs this function to be defined for component
   * initialization
   */
  ngOnInit() {
    // Run on view initialization
  }
}
