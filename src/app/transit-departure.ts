export class TransitDeparture {
  public name: string;
  public line: number;
  public departure: Date;
  public delayedDeparture: Date | null = null;
  public departing: number;
  public delayedDeparting: number | null;
  public deviations: Array<string> = [];
  public type: "city" | "regional" | "unknown";

  // Initialize new TransitDeparture
  constructor(raw: object) {
    let rawLine = raw["routeLinks"][0]["line"];

    // Begin parsing
    this.line = rawLine["lineNo"];
    this.departure = new Date(raw["departureDateTime"]);
    this.type =
      rawLine["trafficType"] === 1
        ? "city"
        : rawLine["trafficType"] === 6
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

    this.departing =
      (this.departure.getTime() - new Date().getTime()) / (60 * 1000);

    // Set delayedDeparting if departure deviates from initial departure
    if (this.delayedDeparture) {
      this.departing =
        (this.departure.getTime() - new Date().getTime()) / (60 * 1000);
    }
  }
}
