// Test Selection Tool

var assert = require("assert");
var webdriver = require("selenium-webdriver");

var username = process.env.SAUCE_USERNAME;
var accessKey = process.env.SAUCE_ACCESS_KEY;
 
describe("Selection Tool Tests", function() {
    beforeEach(function() {
        this.browser = new webdriver.Builder().withCapabilities({
            'browserName': 'chrome',
            'platform': 'Windows 7',
            'version': '55',
            'username': username,
            'accessKey': accessKey,
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            'build': process.env.TRAVIS_BUILD_NUMBER,
        }).usingServer(
            "http://" + username + ":" + accessKey +
            "@ondemand.saucelabs.com:80/wd/hub"
        ).build();

        return this.browser.get("http://localhost:8000");
    });

    afterEach(function() {
        return this.browser.quit();
    });


    it("Enable selection tool", function(done) {
        // Get enable button
        var button = this.browser.findElement(webdriver.By.css('.enable-button'));
        button.click();

        // Infer map enabled selection by changed text in button
        // TODO: Better way to ensure map enabled selection
        button.getText().then(function(text) {
            assert.equal(text, "Remove selection");
            done();
        });
    });
});
