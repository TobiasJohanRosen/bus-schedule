import { Component, OnInit } from "@angular/core";
import { TransitLineService } from "../transit-line.service";

@Component({
  selector: "iw-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public transitLines = [6, 11, 770, 804];
  public transitDepartures = {
    804: [],
    11: [],
    6: [],
    770: []
  };

  constructor(private api: TransitLineService) {}

  ngOnInit() {
    this.api
      .getTimeSchedule(804)
      .then(result => {
        result.forEach(transitDeparture => {
          this.transitDepartures[
            transitDeparture["routeLinks"][0]["line"]["lineNo"]
          ].push(transitDeparture);
          console.log(this.transitDepartures);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
