/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import LoginPage from "../../support/pageObjects/auth/LoginPage_PO"
import FeedsPage from "../../support/pageObjects/feeds/FeedsPage_PO"

describe("Follow and see the feeds", () => {
    const loginPage = new LoginPage();
    const feedsPage = new FeedsPage();
    let correctCredentials = {};

    before(() => {
        cy.fixture('correct-credentials').then((credentials) => {
            correctCredentials = credentials;
        });
    });

    beforeEach(() => {
        cy.visit("/");
        cy.wrap(correctCredentials).as('credentials');
        cy.get('@credentials').then((credentials) => {
            loginPage.clickLoginButton();
            loginPage.fillUsername(credentials.username);
            loginPage.fillPassword(credentials.password);
            loginPage.clickLoginSubmitButton();
        });
        cy.url().should('include', 'feeds');
    });

    it("Should show the zero state after login", () => {
        feedsPage.clickBookmarksButton();
        cy.get('.container').should('contain', 'Nothing to see here')
    });

    it("Should add and remove a url from All feeds if one or more urls are attached", () => {
        // I decided not to use the atomic approach because in that case I would need many repeating helpers and many atomic cases
        feedsPage.clickRSSTitle();
        feedsPage.clickEmptyBookmarkIcon();
        cy.get(feedsPage.selectors.emptyBookmarkIcon).should("not.exist");
        cy.get(feedsPage.selectors.filledBookmarkIcon).should('be.visible');

        feedsPage.clickBookmarksButton();
        cy.get('.table-responsive').find(feedsPage.selectors.rssFirstLineSelector).should('exist');
        feedsPage.clickRSSTitle();
        cy.get(feedsPage.selectors.filledBookmarkIcon).should('be.visible');

        feedsPage.clickFilledBookmarkIcon();
        cy.get(feedsPage.selectors.filledBookmarkIcon).should("not.exist");
        cy.get(feedsPage.selectors.emptyBookmarkIcon).should('be.visible');
    });

    it("Should not let unauthorized user to add an item", () => {
        feedsPage.clickLogoutButton();
        feedsPage.clickAllFeedsButton();
        cy.get(feedsPage.selectors.emptyBookmarkIcon).should("not.exist");
    });
})
