import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get("/");
  }

  getTitleText() {
    return browser.getTitle();
  }

  retrievePageTime() {
    return element(
      by.xpath("/html/body/app-root/iw-dashboard/div/div[1]/div[2]/h1")
    ).getText();
  }
}
