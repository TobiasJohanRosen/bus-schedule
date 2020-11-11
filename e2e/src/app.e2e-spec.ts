import { AppPage } from "./app.po";
import { browser } from "protractor";
import { testData } from './testdata';
describe("App", () => {
  let page: AppPage;
  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();
    browser.driver.sleep(3000);
  });

  it("should display title", () => {
    /*
      Enabling ignoreSynchronization solves the issue with timeout.
      Reason is that protractor is waiting for element which is
      always in pending status and then receives a timeout.
    */
    browser.ignoreSynchronization = true;
    expect(page.getTitleText()).toEqual("Bus Schedule");
  });

  it("should display the correct time", () => {
    browser.waitForAngular();
    let date = new Date();
    let hours = ("0" + date.getHours().toString()).slice(-2);
    let minutes = ("0" + date.getMinutes().toString()).slice(-2);
    page.retrievePageTime().then(titleText => {
      expect(titleText.slice(0, 5)).toEqual(hours + ":" + minutes);
    });
  });

  it("should display departure", () => {
    const dashboardComponent = 'ng.probe(document.getElementsByTagName("iw-dashboard")[0]).componentInstance';
    // Add our buses
    let script = dashboardComponent+".parseStopDepartures('Polacksbacken', "+JSON.stringify(testData)+")";
    browser.executeScript(script);
    browser.sleep(1000);
    // Comment
  });

  it("should display departure time", () => {
    // page.navigateTo();
  });
});
