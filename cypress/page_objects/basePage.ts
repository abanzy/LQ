class BasePage {
  private menuHamburger() {
      return cy.get('mat-icon[data-mat-icon-type="font"]').contains('menu');
    }
     menuItem(item:string) {
      return cy.get('span.menu-text.truncate').contains( `${item}`);
    }
    private closePopUps() {
      cy.get('.close-dialog').click();
      cy.get('.cc-btn').click();
    }
    goToCustomerFeedback() {
      this.closePopUps();
      this.menuHamburger().click();
    }
}

  export const basePage = new BasePage();
  