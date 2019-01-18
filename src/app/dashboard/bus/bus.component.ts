import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TransitDeparture } from "src/app/transit-departure";
import { MatRipple } from "@angular/material";

@Component({
  selector: "iw-bus",
  templateUrl: "./bus.component.html",
  styleUrls: ["./bus.component.scss"]
})
export class BusComponent implements OnInit {
  public thisIsProgress: number;
  _departures: Array<TransitDeparture> = [];
  @Input() set departures(departures: Array<TransitDeparture>) {
    this._departures = departures;

    if (this._departures.length > 0) {
      this.nextDeparture = this._departures[0];
    }

    if (this._departures.length > 1) {
      this.laterDeparture = this._departures[1];
    }
    this.thisIsProgress = Math.round(
      510 - 0.43 * (this.nextDeparture.departing * 60)
    );
    console.log(this._departures);
  }

  get departures() {
    return this._departures;
  }

  public nextDeparture: TransitDeparture;
  public laterDeparture: TransitDeparture;

  @ViewChild(MatRipple) ripple: MatRipple;

  /** Shows a centered and persistent ripple. */
  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true,
      animation: {
        enterDuration: 1000,
        exitDuration: 5000
      }
    });

    // Fade out the ripple later.
    rippleRef.fadeOut();
  }

  constructor() {
    setInterval(() => {
      if (this.ripple) {
        this.launchRipple();
      }
    }, 10000);
  }

  ngOnInit() {}
}
