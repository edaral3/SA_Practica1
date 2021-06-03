/*const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

let options = new chrome.Options();

options.addArguments("disable-infobars");
options.setUserPreferences({ credential_enable_service: false });*/

const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
SeleniumServer = require("selenium-webdriver/remote").SeleniumServer;

var cbtHub = `http://35.193.58.252:4444/wd/hub`;

/*let options = new chrome.Options();
options.addArguments('disable-infobars');
options.addArguments('--headless');
options.addArguments('--headless');*/

var caps = {
  name: "Chrome Test",
  setPageLoadStrategy: "eager",
  browserName: "chrome",
  browserVersion: "89.0.4389.82",
  'chromeOptions': {
    'args': ['--window-size=1920x1080']
  }
};

var Page = function () {
  this.driver = new Builder()
    //.setChromeOptions(options)
    .withCapabilities(caps)
    .usingServer(cbtHub)
    //.forBrowser("chrome")
    .build();

  // visit a webpage
  this.visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  this.esperarUrl = async function (theUrl) {
    return await this.driver.wait(until.urlContains(theUrl));
  };

  // quit current session
  this.quit = async function () {
    return await this.driver.quit();
  };

  // wait and find a specific element with it's id
  this.findById = async function (id) {
    await this.driver.wait(
      until.elementLocated(By.id(id)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.id(id));
  };

  // wait and find a specific element with it's name
  this.findByName = async function (name) {
    await this.driver.wait(
      until.elementLocated(By.name(name)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.name(name));
  };

  this.findByClassName = async function (className) {
    await this.driver.wait(
      until.elementLocated(By.className(className)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.className(className));
  };

  // fill input web elements
  this.write = async function (el, txt) {
    return await el.sendKeys(txt);
  };
};

module.exports = Page;
