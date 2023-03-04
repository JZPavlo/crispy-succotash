/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import LoginPage from "../../support/pageObjects/auth/LoginPage_PO"
import FeedsPage from "../../support/pageObjects/feeds/FeedsPage_PO"
import {generateRandomUrl} from "../../support/helpers/fake-data-generator"

describe("Follow and see the feeds", () => {
    const loginPage = new LoginPage();
    const feedsPage = new FeedsPage();
    let correctCredentials = {};
    let comment = {};

    before(() => {
        cy.fixture('correct-credentials').then((credentials) => {
            correctCredentials = credentials;
        });
        cy.fixture('basic-text-for-comment').then((commentfromFixture) => {
            comment = commentfromFixture;
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

    const enterInvalidUrlToFeedsPage = () => {
        feedsPage.clickNewFeedButton();
        feedsPage.addNewFeed("https:/example.com/");
        feedsPage.clickFeedSubmitButton();
    }

    const enterGeneratedUrlToFeedsPage = () => {
        feedsPage.clickNewFeedButton();
        feedsPage.addNewFeed(generateRandomUrl());
        feedsPage.clickFeedSubmitButton();
    }
    const enterExistingUrlToFeedsPage = () => {
        feedsPage.clickNewFeedButton();
        feedsPage.addNewFeed("https://feeds.feedburner.com/tweakers/mixed");
        feedsPage.clickFeedSubmitButton();
    }

    it("Should show the zero state of All feeds", () => {
        cy.get('.container').should('contain', 'Nothing to see here');

        // In the perfect world I should run some script that clears all data after auto test runs.
        // But as I don't have them, this test is expected to fail
        // All requirements are discussable
    });

    it("Should show the zero state of My Feeds", () => {
        feedsPage.clickMyFeedsButton();
        cy.get('.container').should('contain', 'Nothing to see here');

        // In the perfect world I should run some script that clears all data after auto test runs.
        // But as I don't have them, this test is expected to fail
        // All requirements are discussable
    });

    it("Should let user unfollow a feed if they no longer wish to see it", () => {
        feedsPage.clickMyFeedsButton();
        cy.get('.table-responsive').should('contain', feedsPage.selectors.unfollowFeedsButton);

        // I think this one needs a wipe-feeds button because the user may want to unfollow
        // As I don't have this button, this test is expected to fail
        // All requirements are discussable
    });

    it("Should not let user add a feed using an invalid url", () => {
        enterInvalidUrlToFeedsPage();
        cy.get('strong').should('have.text', 'Enter a valid URL.')
    });

    it("Should not let user add a feed using a valid existing url", () => {
        enterExistingUrlToFeedsPage();
        cy.get('#error_1_id_feed_url').should('have.text', 'Feed with this Feed URL already exists.')
    });

    it.skip("User can add a feed using a valid non-existing url", () => {
        enterGeneratedUrlToFeedsPage(); // url from faker
        // I tried to generate such url, didn't find any solutions for this one yet
        // If I would use a script (yes, again, wipe testing data), I would use the basic 2 links
    });

    it("Should not let user add a generated non-RSS url", () => {
        enterGeneratedUrlToFeedsPage(); // url from faker
        cy.get('h1').should('have.text', 'BrokenFeed at /feeds/new/')
        cy.get('.navbar').should("exist");

        // these checks are expected to fail because I expect the page to be the basic feedPage with some errors,
        // but it does not work for now:
        cy.get('#summary').should("not.exist");
        cy.get('#traceback').should("not.exist");

    });

    it("Should not let a non-authorized user see the feeds (All Feeds and My Feeds)", () => {
        feedsPage.clickLogoutButton();
        feedsPage.clickAllFeedsButton();

        // for the unknown reason, it didn't want to work with my methods, I should refactor this test later
        cy.get(".table [href='/feeds/1']").should("exist"); // url Anglemen
        cy.get(".table-responsive").should("exist"); // table with urls
        cy.get(`[href="/feeds/my/"]`).should("not.exist"); // My Feeds button
    });

    it("Should let an authorized user see the feeds (All Feeds and My Feeds)", () => {
        // for the unknown reason, it didn't want to work with my methods, I should refactor this test later
        cy.get(".table [href='/feeds/1']").should("exist");
        cy.get(".table [href='/feeds/2']").should("exist");
        cy.get(".table-responsive").should("exist");
        cy.get(`[href="/feeds/my/"]`).should("exist");
        feedsPage.clickMyFeedsButton();
        cy.get(".table [href='/feeds/1']").should("exist");
        cy.get(".table [href='/feeds/2']").should("exist");
        cy.get(".table-responsive").should("exist");
        cy.get(`[href="/feeds/my/"]`).should("exist");
    });
})
