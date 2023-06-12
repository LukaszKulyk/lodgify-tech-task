import { loginPageLocators } from "../support/locators";

class LoginPage {

    getEmailInputField() {
        return cy.get(loginPageLocators.emailInputFieldLocator);
    }

    getPasswordInputField() {
        return cy.get(loginPageLocators.passwordInputFieldLocator);
    }

    getLoginButton() {
        return cy.getByDataGtmId(loginPageLocators.loginButtonLocator);
    }

    writeEmail(email) {
        this.getEmailInputField()
            .clear()
            .type(email)
    }

    writePassword(password) {
        this.getPasswordInputField()
            .clear()
            .type(password)
    }
}

export default LoginPage;