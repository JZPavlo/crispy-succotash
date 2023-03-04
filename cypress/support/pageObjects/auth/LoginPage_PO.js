import {PageObject} from '../pageObject.js';

class LoginPage extends PageObject {
    selectors = {
        loginButton: `[href*="/accounts/login/"]`,
        loginSubmitButton: '.btn-success',
        allFeedsButton: `[href*="/feeds/"]`,
        signUpButton: `[href*="/accounts/register/"]`,
        loginPagePasswordField: "#id_password",
        loginPageUsernameField: "#id_username"
    };
    
    clickLoginButton() {
        cy.get(this.selectors.loginButton)
            .invoke("removeAttr", "target")
            .click({force: true});
    }

    clickLoginSubmitButton() {
        cy.get(this.selectors.loginSubmitButton)
            .invoke("removeAttr", "target")
            .click();
    }

    clickAllFeedsButton() {
        this.clickElement(this.selectors.allFeedsButton);
    }

    clickSignUpButton() {
        this.clickElement(this.selectors.signUpButton);
    }

    fillPassword(password) {
        this.addText(this.selectors.loginPagePasswordField, password);
    }

    fillUsername(username) {
        this.addText(this.selectors.loginPageUsernameField, username);
    }
}
export default LoginPage;
