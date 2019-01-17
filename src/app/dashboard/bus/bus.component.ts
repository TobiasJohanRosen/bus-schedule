import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "iw-bus",
  templateUrl: "./bus.component.html",
  styleUrls: ["./bus.component.scss"]
})
export class BusComponent implements OnInit {
  _departures: Array<object> = [];
  @Input() set departures(departures: Array<object>) {
    this._departures = departures;

    this.nextDeparture = this._departures[0];
    if (this._departures.length > 1) {
      this.laterDeparture = this._departures[1];
    }

    if (this._departures.length > 0) {
      if (this._departures[0]["departureDateTime"]) {
        var a = new Date(this._departures[0]["departureDateTime"]);
        var b = new Date();
        this.departureIn = Math.round(
          (a.getTime() - b.getTime()) / (60 * 1000)
        );
        console.log(a, b, this.departureIn);
      }
    }
    console.log(this._departures);
  }

  get departures() {
    return this._departures;
  }

  nextDeparture: object;
  departureIn: number = 0;
  laterDeparture: object;
  tick;

  constructor() {}

  ngOnInit() {}
}
