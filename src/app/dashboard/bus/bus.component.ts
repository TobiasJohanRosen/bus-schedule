import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "iw-bus",
  templateUrl: "./bus.component.html",
  styleUrls: ["./bus.component.scss"]
})
export class BusComponent implements OnInit {
  @Input() departures: Array<object>;

  constructor() {}

  ngOnInit() {}
}
