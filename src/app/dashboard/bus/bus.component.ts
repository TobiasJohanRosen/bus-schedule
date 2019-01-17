import { Component, OnInit, Input } from "@angular/core";
import { TransitDeparture } from "src/app/transit-departure";

@Component({
  selector: "iw-bus",
  templateUrl: "./bus.component.html",
  styleUrls: ["./bus.component.scss"]
})
export class BusComponent implements OnInit {
  _departures: Array<TransitDeparture> = [];
  @Input() set departures(departures: Array<TransitDeparture>) {
    this._departures = departures;

    if (this._departures.length > 0) {
      this.nextDeparture = this._departures[0];
    }

    if (this._departures.length > 1) {
      this.laterDeparture = this._departures[1];
    }

    console.log(this._departures);
  }

  get departures() {
    return this._departures;
  }

  nextDeparture: TransitDeparture;
  laterDeparture: TransitDeparture;

  constructor() {}

  ngOnInit() {}
}
