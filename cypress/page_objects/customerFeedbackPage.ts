class CustomerFeedbackPage {

  private feedbackTextArea() {
    return cy.get('#comment');
  }
  private starRatingSlider() {
    return cy.get('#rating');
  }
  private captchaImput() {
    return cy.get('#captchaControl');
  }
   submitButton() {
    return cy.get('#submitButton');
  }

  
  moveTheRatingSliderTo() {
    //cy.get('#rating').click('left')
    //cy.get('span.mat-slider-thumb-label-text').contains('1★').should('be.visible').should('have.text','1★');
    //cy.get('#rating').click('center')
    //cy.get('span.mat-slider-thumb-label-text').contains('3★').should('be.visible').should('have.text','3★');
    cy.get('#rating').click('right')
    cy.get('span.mat-slider-thumb-label-text').contains('5★').should('be.visible').should('have.text','5★');

  }

  submitCostumerFeedback(feedback:string, captcha:string) {
    this.feedbackTextArea().type( `${feedback}`,{force: true});
    this.moveTheRatingSliderTo();
    this.captchaImput().type( `${captcha}`);
    this.submitButton().click()
  }
  submitCostumerFeedbackWrongRegexCaptcha(feedback:string, captcha:string) {
    this.feedbackTextArea().type( `${feedback}`,{force: true});
    this.moveTheRatingSliderTo();
    this.captchaImput().type( `${captcha}`);
    customerFeedbackPage.submitButton().should('be.disabled')
  }
  submitCostumerFeedbackNoComment(captcha:string) {
    this.feedbackTextArea().clear()
    this.moveTheRatingSliderTo();
    this.captchaImput().type( `${captcha}`);
    customerFeedbackPage.submitButton().should('be.disabled')
  }
  submitCostumerFeedbackNoCaptcha(feedback:string) {
    this.feedbackTextArea().type( `${feedback}`,{force: true});
    this.moveTheRatingSliderTo();
    this.captchaImput().clear();
    customerFeedbackPage.submitButton().should('be.disabled')
  }
  submitCostumerFeedbackWrongCaptcha(feedback:string, captcha:string) {
    this.feedbackTextArea().type( `${feedback}`,{force: true});
    this.moveTheRatingSliderTo();
    this.captchaImput().type( `${captcha}`);
    this.submitButton().click()
  }
  submitCostumerFeedbackNoRating(feedback:string, captcha:string) {
    this.feedbackTextArea().type( `${feedback}`,{force: true});
    this.captchaImput().type( `${captcha}`);
    customerFeedbackPage.submitButton().should('be.disabled')
  }
}
  export const customerFeedbackPage = new CustomerFeedbackPage();
  


