import { AppPage } from './app.po';
import { browser, By, by, element, WebElement } from 'protractor';
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

  /**
   * Tests each buss by it's values by calling the parseStopDepartures method
   * which replaces the buses with the ones in testdata.ts
   * These buses are then checked and tested with hardcoded values
   */
  it('should display departure', () => {
    const dashboardComponent = 'ng.probe(document.getElementsByTagName("iw-dashboard")[0]).componentInstance';
    // Add our buses
    const script = dashboardComponent + '.parseStopDepartures("Polacksbacken", ' + JSON.stringify(testData) + ')';
    browser.executeScript(script);
    /**
     * Pauses further execution to let angular change the html values
     * TODO: Implement async await
     */
    browser.sleep(1000);
    const departures = element(by.id('bus-stop-Polacksbacken')).all(by.xpath('div'));
    // Gets a list of all busses at the bus stop and asserts that each value is equal its desired value
    departures.getWebElements().then((busses: WebElement[]) => {
      function expectElem(webElem: WebElement, className: string, expectString: string) {
        webElem.findElement(By.className(className)).getAttribute("textContent").then((txt: string) => {
          // Removes all of the spaces which ensures that the formatting is the same for both strings
          expect(txt.split(" ").join("")).toEqual(expectString.split(" ").join(""));
        });
      }

      // Bus 1
      expectElem(busses[0], "stop_location", "Läge A");
      expectElem(busses[0], "buss_number", "4");
      expectElem(busses[0], "buss_text", "Test Bus 1");
      expectElem(busses[0], "buss_time", "1 min");

      // Bus 2
      expectElem(busses[1], "stop_location", "Läge B");
      expectElem(busses[1], "buss_number", "4");
      expectElem(busses[1], "buss_text", "Test Bus 2");
      expectElem(busses[1], "buss_time", "15 min");
    });
  });
});
