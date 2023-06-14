# Lodgify Automation QA Challenge
## Summary
This repository contains automated test framework for [Todoist](https://en.todoist.com/) webapp. This repository is a part of **Lodgify** recruitment process.

## Instructions
To run the tests locally follow the steps below:
1. Install dependences `npm install`
2. Install cypress `npm cypress install`
2. Run tests from the command line `npx cypress run`
3. (Optional) To run the tests with preview write in command line `npx cypress run --headed`

## About the solution
Technical task contains three test scenarios which had been covered. I have decided to focus mostly on developing good and easy to maintain framework than creating as much test scenarios as I can.

Solution has been done using Page Object Model design pattern. In my case I decided to keep everything in two pages but locators are being kept in one single locators.js file. I belive it is a good approach becuase it is easy to maintain and to split to other files in the future.

Cypress by defaul is configured to capture a screenshots when test failed and those screenshots are being kept by default in cypress/screenshots directory. Cypress supports also recording video of the tests fo each spec file which are being kept in cypress/videos directory. It is important to mention that both screenshots and videos works only when we run our cypress tests with `run` command. 

I have also decided to use default cypress reporter. Cypress is build on top of Mocha so we can easy use some other. Other Mocha reporters can be found here: [reporters](https://mochajs.org/#reporters). Cypress has also two build-in reporters which can be used: teamcity & junit.

## Possible improvements
- Adding Cucumber to the code to improve documentation quality and code undestanding for non technical person.
- Adding more commands to reuse less code in the tests.
- Add cross-browser tests in the CI/CD pipeline.
- Configure CI/CD to use env variables.
- Add slack bot with test results.
- Create more test scenarios to fully cover the app functionality.
- Configure test report to improve readablity of the tests results.