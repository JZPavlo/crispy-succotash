import {PageObject} from '../pageObject.js';

class FeedsPage extends PageObject {
    // CSS selectors for page elements
    selectors = {
        newFeedButton: `[href*="/feeds/new/"]`,
        logOutButton: `[href*="/accounts/logout/"]`,
        addNewFeedField: '#id_feed_url',
        feedSubmitButton: '#submit-id-submit',
        allFeedsButton: `a[href='/feeds/']`,
        myFeedsButton: `[href*="/feeds/my/"]`,
        bookmarksButton: `[href*="/feeds/bookmarked/"]`,
        rssFirstLineSelector: `a[href="/feeds/1"]`,
        commentInput: '.CodeMirror-sizer',
        logoutButton: '[href="/accounts/logout/"]',
        commentLink: '.table-responsive',
        emptyBookmarkIcon: '.glyphicon-heart-empty',
        filledBookmarkIcon: '.glyphicon-heart',
        unfollowFeedsButton: 'some future selector'
    };

    // Clicks the "New Feed" button
    clickNewFeedButton() {
        this.clickElement(this.selectors.newFeedButton);
    }

    // Clicks the "Log Out" button
    clickLogOutButton() {
        this.clickElement(this.selectors.logOutButton);
    }

    // Adds a new feed with the given URL
    addNewFeed(url) {
        this.addText(this.selectors.addNewFeedField, url);
    }

    // Clicks the "Submit" button for adding a new feed
    clickFeedSubmitButton() {
        this.clickElement(this.selectors.feedSubmitButton);
    }

    // Clicks the "All Feeds" button
    clickAllFeedsButton() {
        this.clickElement(this.selectors.allFeedsButton);
    }

    // Clicks the "My Feeds" button
    clickMyFeedsButton() {
        this.clickElement(this.selectors.myFeedsButton);
    }

    // Clicks the "Bookmarks" button
    clickBookmarksButton() {
        this.clickElement(this.selectors.bookmarksButton);
    }

    // Clicks the RSS title for the first feed
    clickRSSTitle() {
        this.clickElement(this.selectors.rssFirstLineSelector);
    }

    clickCommentLink() {
        cy.get(this.selectors.commentLink).find('a').eq(1).click();
    }

    // Adds a new comment to the first feed and submits it
    addNewComment(comment) {
        this.addText(this.selectors.commentInput, comment)
        this.clickFeedSubmitButton();
    }

    // Clicks the "Log Out" button
    clickLogoutButton() {
        this.clickElement(this.selectors.logoutButton);
    }

    clickEmptyBookmarkIcon() {
        this.clickElement(this.selectors.emptyBookmarkIcon);
    }

    clickFilledBookmarkIcon() {
        this.clickElement(this.selectors.filledBookmarkIcon);
    }
}

export default FeedsPage;
