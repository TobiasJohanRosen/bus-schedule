import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TransitDeparture } from 'src/app/transit-departure';
import { StopDeparture } from 'src/app/stop-departure';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'iw-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.scss']
})
export class StopComponent implements OnInit {
  public thisIsProgress: number;
  _departures: Array<StopDeparture> = [];
  _directions: Array<string> = [];
  private _name: string;
  @Input() set name(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  @Input() set departures(departures: Array<StopDeparture>) {
    this._departures = departures;
  }

  get departures() {
    return this._departures;
  }

  @Input() set directions(directions: Array<string>) {
    this._directions = directions;
  }

  get directions() {
    return this._directions;
  }

  public deviation: { title: string; text: string; severity: number };

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
        exitDuration: 1000
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
    }, 15000);
  }

  ngOnInit() {}
}
