/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import LoginPage from "../../support/pageObjects/auth/LoginPage_PO"
import FeedsPage from "../../support/pageObjects/feeds/FeedsPage_PO"

describe("Adding comments", () => {
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

    it("Should let user add a comment to a feed item", () => {
        feedsPage.clickRSSTitle();
        feedsPage.clickCommentLink();
        feedsPage.addNewComment(comment.shortcomment);
        cy.get('.container .row').find('.row').first()
            .should('be.visible')
            .should('contain', comment.shortcomment)

    });

    it("Should not let user add an empty comment", () => {
        feedsPage.clickRSSTitle();
        feedsPage.clickCommentLink();
        feedsPage.clickFeedSubmitButton();
        cy.get('#addCommentBtn').should('not.exist');
    });

    it("Should let user see the list of comments", () => {
        feedsPage.clickRSSTitle();
        feedsPage.clickCommentLink();
        feedsPage.addNewComment(comment.shortcomment);
        feedsPage.addNewComment(comment.longComment);
        cy.get('.container .row').find('.row').first()
            .should('be.visible')
            .should('contain', comment.longComment)
        cy.get('.container .row').find('.row').eq(1)
            .should('be.visible')
            .should('contain', comment.shortcomment)
    });

    it.skip("User can edit comments", () => {
        // As I don't have any requirements, I'm not sure if user should be able to edit the comments.
        // That's why I decided to leave this case empty for now
    });

    it.skip("User can delete comments", () => {
        // The same issue as mentioned above
    });

    it("Should not let user add a comment after logout", () => {
        feedsPage.clickLogOutButton();
        feedsPage.clickAllFeedsButton();
        feedsPage.clickRSSTitle();
        feedsPage.clickCommentLink();
        cy.get(feedsPage.commentInput)
            .should('not.exist')
    });

    it("Should let user a comment after logout", () => {
        feedsPage.clickRSSTitle();
        feedsPage.clickCommentLink();
        feedsPage.addNewComment(comment.shortcomment);
        // remember url
        cy.url().then(url => {
            cy.wrap(url).as("commentUrl");
        });
        feedsPage.clickLogOutButton();
        // open url
        cy.get("@commentUrl").then(commentUrl => {
            cy.visit(commentUrl);
        });
        cy.get('.container .row').find('.row').eq(0)
            .should('be.visible')
            .should('contain', comment.shortcomment)
    });
})
