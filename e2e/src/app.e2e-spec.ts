import { AppPage } from "./app.po";
import { browser } from "protractor";

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
    var date = new Date();
    var hours = ("0" + date.getHours().toString()).slice(-2);
    if (date.getMinutes() < 10) {
      var minutes = 0 + date.getMinutes().toString();
    } else {
      var minutes = date.getMinutes().toString();
    }
    var localTime = hours + ":" + minutes;
    page.retrievePageTime().then(page => {
      var webtext = page.toString().split(":", 2);
      webtext = webtext.map((str, index, arr)=>{
        return Number(str).toString();
      })
      expect(webtext.join(":")).toEqual(localTime);
    });
  });

  it("should display departure", () => {
    // Comment
  });

  it("should display departure time", () => {
    // page.navigateTo();
  });
});
