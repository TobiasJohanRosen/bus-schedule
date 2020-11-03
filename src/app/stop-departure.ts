export class StopDeparture {
  public data: object;
  public direction: string;
  public coordinates: object;

  public nextDepartureTime: string;
  public nextDepartureIn: number;

  public line: object;
  public lineNo: number;
  public lineName: string;
  public towards: string;

  public trafficType: number;

  public color: string;
  public textColor: string;
  constructor(raw: object) {
    this.data = raw;

    this.direction = raw['area'];
    this.coordinates = raw['coordinates'];

    this.nextDepartureTime = raw['nextDepartureTime'];
    this.nextDepartureIn = raw['nextDepartureIn'];

    this.line = raw['line'];
    this.lineNo = raw['line']['lineNo'];
    this.lineName = raw['line']['name'];
    this.towards = raw['line']['towards'];

    this.trafficType = raw['line']['trafficType'];
    if (this.lineNo < 100) {
      this.color = '#30921C';
      this.textColor = '#FFFFFF';
    } else {
      this.color = '#DBBD2C';
      this.textColor = '#000000';
    }
  }
}
