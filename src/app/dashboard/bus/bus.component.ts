import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iw-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  @Input() departures: Array<object>;

  nextDeparture: object;
  departureIn: number;
  laterDeparture: object;
  tick;

  constructor() {}

  ngOnInit() {
    this.nextDeparture = this.departures[0];
    this.laterDeparture = this.departures[1];

    setTimeout(() => {
      console.log(this.departures);
      var a = new Date(this.departures[0]['departureDateTime']);
      var b = new Date();
      this.departureIn = a.getTime() - b.getTime();
      console.log(a, b, this.departureIn);
    }, 1000);
  }
}
