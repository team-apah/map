// Test Selection Tool

var assert = require("assert");
var webdriver = require("selenium-webdriver");

describe("Selection Tool Tests", function() {
    beforeEach(function() {
        this.browser = new webdriver.Builder().withCapabilities({
            browserName: "chrome"
        }).build();

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
