import { browser, by, element } from 'protractor';

export class LandingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.xpath('/html/body/app-root/app-login/div/div/div/h1')).getText();
  }
}
