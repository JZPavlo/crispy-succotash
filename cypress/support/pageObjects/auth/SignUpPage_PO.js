import {PageObject} from '../pageObject.js';
import {generateRandomUsername, generateRandomPassword} from "../../helpers/fake-data-generator"

class SignUpPage extends PageObject {
    selectors = {
        usernameInput: '#id_username',
        passwordInput: '#id_password1',
        passwordConfirmationInput: '#id_password2',
        submitButton: '#submit-id-submit'
    };

    clickSubmitButton() {
        this.clickElement(this.selectors.submitButton);
    }

    fillUsername(username) {
        this.addText(this.selectors.usernameInput, username);
    }

    fillPassword(password) {
        this.addText(this.selectors.passwordInput, password);
    }

    fillPasswordConfirmation(password) {
        this.addText(this.selectors.passwordConfirmationInput, password);
    }

    fillFakeUsername() {
        this.addText(this.selectors.usernameInput, generateRandomUsername());
    }

    fillFakePassword() {
        this.addText(this.selectors.passwordInput, generateRandomPassword());
    }

    fillFakePasswordConfirmation() {
        this.addText(this.selectors.passwordConfirmationInput, generateRandomPassword());
    }
}

export default SignUpPage;
