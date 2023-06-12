// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginPageLocators } from "./locators";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

Cypress.Commands.add('getByDataGtmId',(data_test_id) => {
    return cy.get(`[data-gtm-id=${data_test_id}]`)
})

Cypress.Commands.add('login', (username, password) => {

    const loginPage = new LoginPage();

    loginPage
        .writeEmail(username);
    
    loginPage
        .writePassword(password);

    loginPage
        .getLoginButton()
        .click()
})

Cypress.Commands.add('logout', () => {

    const mainPage = new MainPage();

    mainPage
        .getSettingsButton()
        .click()

    mainPage
        .getLogoutButton()
        .click()
})