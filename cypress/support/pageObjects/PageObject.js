export class PageObject {
    // Clicks an element with the given selector
    clickElement(selector) {
        cy.get(selector).click();
    }

    // Adds text to an element with the given selector
    addText(selector, inputText) {
        cy.get(selector).type(inputText);
    }
}
