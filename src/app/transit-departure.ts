export class TransitDeparture {
  public name: string;
  public line: number;
  public departure: Date;
  public delayedDeparture: Date | null = null;
  public departing: number;
  public delayedDeparting: number | null;
  public deviations: Array<string> = [];
  public type: "city" | "regional" | "unknown";
  public color: string = "#FFFFFF";
  public departingTime: string;
  public delayedDepartingTime: string | null;

  // Initialize new TransitDeparture
  constructor(raw: object) {
    let rawLine = raw["routeLinks"][0]["line"];

    // Begin parsing
    this.line = rawLine["lineNo"];
    this.departure = new Date(raw["departureDateTime"]);
    this.type =
      rawLine["trafficType"] === 1
        ? "city"
        : String(rawLine["trafficType"]).match(/3|6/)
        ? "regional"
        : "unknown";
    this.name = rawLine["towards"];

    // Format name
    if (this.name.match(/(\svia\s)/)) {
      this.name = this.name.split(/(\svia\s)/)[0];
    }

    this.deviations = raw["routeLinks"][0]["deviations"];

    // Set delayedDeparture if it deviates from the initial departure
    if (
      raw["departureDateTime"] !== raw["routeLinks"][0]["departureDateTime"]
    ) {
      this.delayedDeparture = new Date(
        raw["routeLinks"][0]["departureDateTime"]
      );
    }

    this.departingTime = `${
      this.departure.getHours() < 10 ? "0" : ""
    }${this.departure.getHours()}:${
      this.departure.getMinutes() < 10 ? "0" : ""
    }${this.departure.getMinutes()}`;

    // Set delayedDepartingTime if departure deviates from the initial departure
    if (
      raw["departureDateTime"] !== raw["routeLinks"][0]["departureDateTime"]
    ) {
      this.delayedDepartingTime = `${
        this.delayedDeparture.getHours() < 10 ? "0" : ""
      }${this.delayedDeparture.getHours()}:${
        this.delayedDeparture.getMinutes() < 10 ? "0" : ""
      }${this.delayedDeparture.getMinutes()}`;
    }

    this.departing = Math.round(
      (this.departure.getTime() - new Date().getTime()) / (60 * 1000)
    );

    // Set delayedDeparting if departure deviates from initial departure
    if (this.delayedDeparture) {
      this.departing = Math.round(
        (this.departure.getTime() - new Date().getTime()) / (60 * 1000)
      );
    }

    // Set bus color
    switch (this.type) {
      case "city":
        this.color = "#30921C";
        break;
      case "regional":
        this.color = "#DBBD2C";
        break;
      default:
        this.color = "#FFFFFF";
    }
  }
}