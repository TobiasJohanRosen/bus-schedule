import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { testData } from './testdata';
describe('App', () => {
  let page: AppPage;
  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
    browser.driver.sleep(3000);
  });

  it('should display title', () => {
    /*
      Enabling ignoreSynchronization solves the issue with timeout.
      Reason is that protractor is waiting for element which is
      always in pending status and then receives a timeout.
    */
    browser.ignoreSynchronization = true;
    expect(page.getTitleText()).toEqual('Bus Schedule');
  });

  it('should display the correct time', () => {
    browser.waitForAngular();
    const date = new Date();
    const hours = ('0' + date.getHours().toString()).slice(-2);
    const minutes = ('0' + date.getMinutes().toString()).slice(-2);
    page.retrievePageTime().then(titleText => {
      expect(titleText.slice(0, 5)).toEqual(hours + ':' + minutes);
    });
  });

  it('should display departure', () => {
    const dashboardComponent = 'ng.probe(document.getElementsByTagName("iw-dashboard")[0]).componentInstance';
    // Add our buses
    const script = dashboardComponent + '.parseStopDepartures("Polacksbacken", ' + JSON.stringify(testData) + ')';
    browser.executeScript(script);
    browser.sleep(1000);
    const buses = element(by.id('bus-stop-Polacksbacken'));
    const departures = buses.all(by.xpath('div'));
    departures.getText().then(el => {
      const bus1 = el[0].split('\n');
      const bus2 = el[1].split('\n');
      expect(bus1[0]).toEqual('Läge A');
      expect(bus1[1]).toEqual('4');
      expect(bus1[2]).toEqual('Test Bus 1');
      expect(bus1[3]).toEqual('1 min');

      expect(bus2[0]).toEqual('Läge B');
      expect(bus2[1]).toEqual('4');
      expect(bus2[2]).toEqual('Test Bus 2');
      expect(bus2[3]).toEqual('15 min');
    });
    expect();
    // Comment
  });

  it("should display departure time", () => {
    // page.navigateTo();
  });
});
