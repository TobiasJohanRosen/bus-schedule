import { Component, OnInit, Input } from '@angular/core';
import { TransitDeparture } from 'src/app/transit-departure';

@Component({
  selector: 'iw-deferred-bus',
  templateUrl: './deferred-bus.component.html',
  styleUrls: ['./deferred-bus.component.scss']
})
export class DeferredBusComponent implements OnInit {
  @Input() departures: Array<TransitDeparture> = [];

  constructor() {}

  ngOnInit() {}
}
