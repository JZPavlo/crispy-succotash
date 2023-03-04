/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import LoginPage from "../../support/pageObjects/auth/LoginPage_PO"

describe("Login", () => {
    const loginPage = new LoginPage();
    let correctCredentials = {};
    let incorrectCredentials = {};

    before(() => {
        cy.fixture('correct-credentials').then((credentials) => {
            correctCredentials = credentials;
        });
        cy.fixture('incorrect-credentials').then((credentials) => {
            incorrectCredentials = credentials;
        });
    });

    beforeEach(() => {
        cy.visit("/");
    });

    const loginWithValidCredentials = (username, password) => {
        loginPage.clickLoginButton();
        loginPage.fillUsername(correctCredentials.username);
        loginPage.fillPassword(correctCredentials.password);
        loginPage.clickLoginSubmitButton();
    };
    const loginWithInvalidCredentials = (username, password) => {
        loginPage.clickLoginButton();
        loginPage.fillUsername(incorrectCredentials.username);
        loginPage.fillPassword(incorrectCredentials.password);
        loginPage.clickLoginSubmitButton();
    };

    it("Should login using valid credentials from fixture", () => {
        const username = correctCredentials.username;
        const password = correctCredentials.password;

        loginWithValidCredentials(username, password);

        cy.url().should('include', 'feeds');
        cy.get('[href="/accounts/logout/"]').should('exist');
    });

    it("Should not login using invalid credentials", () => {
        const username = incorrectCredentials.username;
        const password = incorrectCredentials.password;

        loginWithInvalidCredentials(username, password);

        cy.get('.alert-block')
            .should('be.visible')
            .should('contain', 'Please enter a correct username and password.')
    });
})
