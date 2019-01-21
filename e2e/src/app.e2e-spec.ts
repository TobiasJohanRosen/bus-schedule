import { AppPage } from "./app.po";
import { browser } from "protractor";

describe("App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display title", () => {
    page.navigateTo();
    /* 
      Enabling ignoreSynchronization solves the issue with timeout.
      Reason is that protractor is waiting for element which is
      always in pending status and then receives a timeout.
    */
    browser.ignoreSynchronization = true;
    expect(page.getTitleText()).toEqual("Iron Wasp");
  });

  it("should display the correct time", () => {
    page.navigateTo();
    var date = new Date();
    var hours = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    var localTime = hours + ":" + minutes;
    page.retrievePageTime().then(page => {
      var webtext = page.toString().split(":", 2);
      expect(webtext.join(":")).toEqual(localTime);
    });
    // .split(":", 2)
  });
});
