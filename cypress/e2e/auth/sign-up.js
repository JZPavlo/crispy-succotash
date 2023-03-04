/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import LoginPage from "../../support/pageObjects/auth/LoginPage_PO"
import SignUpPage from "../../support/pageObjects/auth/SignUpPage_PO"
import {generateRandomUsername, generateRandomPassword} from "../../support/helpers/fake-data-generator"

describe("Authorization and sign up", () => {
    const loginPage = new LoginPage();
    const signUpPage = new SignUpPage();
    let correctCredentials = {};
    let incorrectCredentials = {};
    let numericCredentials = {};


    before(() => {
        cy.fixture('correct-credentials').then((credentials) => {
            correctCredentials = credentials;
        });
        cy.fixture('incorrect-credentials').then((credentials) => {
            incorrectCredentials = credentials;
        });
        cy.fixture('numeric-credentials').then((credentials) => {
            numericCredentials = credentials;
        });
    });

    beforeEach(() => {
        cy.visit("/");
    });

    const signUpWithCredentials = (username, password) => {
        loginPage.clickSignUpButton();
        const signUpPassword = password || generateRandomPassword();
        signUpPage.fillUsername(username || generateRandomUsername());
        signUpPage.fillPassword(signUpPassword);
        signUpPage.fillPasswordConfirmation(signUpPassword);
        signUpPage.clickSubmitButton();
    }
    const signUpWithNotMatchingPasswords = () => {
        loginPage.clickSignUpButton();
        signUpPage.fillUsername(generateRandomUsername());
        signUpPage.fillPassword(generateRandomPassword());
        signUpPage.fillPasswordConfirmation(generateRandomPassword());
        signUpPage.clickSubmitButton();
    };


    it("Should create an account using fake valid credentials (username, password)", () => {
        signUpWithCredentials();
        cy.url().should('include', 'feeds');
        cy.get('.alert').should('contain', 'Great success!');
    });

    it("Should not create an account using already existing credentials", () => {
        const username = correctCredentials.username;
        const password = correctCredentials.password;

        signUpWithCredentials(username, password);

        cy.url().should('include', 'register');
        cy.get('.controls').should('exist').should('contain', 'A user with that username already exists.')
    });

    it("Should not create an account using invalid credentials", () => {
        const username = incorrectCredentials.username;
        const password = incorrectCredentials.password;
        signUpWithCredentials(username, password);
        cy.get('.controls').should('contain.text', 'This password is too short');
    });

    it("Should not create an account using matching numeric password", () => {
        // The password is too similar to the username.
        const username = numericCredentials.username;
        const password = numericCredentials.password;
        signUpWithCredentials(username, password);
        cy.get('.controls').should('contain.text', `This password is entirely numeric.`);
    });

    it("Should not create an account using matching username and password", () => {
        // The password is too similar to the username.
        const username = generateRandomUsername();
        const matchingPassword = username;
        signUpWithCredentials(username, matchingPassword);
        cy.get('.controls').should('contain.text', `The password is too similar to the username.`);
    });

    it("Should not create an account not matching passwords", () => {
        // The two password fields didn't match.
        signUpWithNotMatchingPasswords();
        cy.get('.controls').should('contain.text', `The two password fields didn't match.`);
    });
})
