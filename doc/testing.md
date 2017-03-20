# Testing

## Running Tests
Tests are run automatically when commits are pushed to this repository through
[Travis CI](https://travis-ci.org/team-apah/map) but can also be run locally.
This isn't strictly nessesary, but allows for testing the tests before
pushing.

To run the tests locally you need:
- [nodejs](https://nodejs.org/en/)
- Firefox
- Python 2

To run tests (assuming you have the repo):
- `npm install`
- `npm test`

## Creating Tests
Testing uses [mocha](https://mochajs.org/) to define the tests and
[selenium](http://www.seleniumhq.org/)
([documentation](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/))
to interact with the browser.

