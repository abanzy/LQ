import { basePage } from '../../page_objects/basePage';
import { customerFeedbackPage } from '../../page_objects/customerFeedbackPage';

describe('TA', () => {
  const feedback:string = 'ok';
  beforeEach(() => {
    cy.visit("/");
    basePage.goToCustomerFeedback()
  });
  it('Scenario A - Verify user can send the feedback successfully', () => {
    cy.intercept('GET', '/rest/captcha').as('captchaRequest');
    basePage.menuItem('Customer Feedback').click();
    cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/contact');
    cy.wait('@captchaRequest').its('response.body');
    cy.get('@captchaRequest').then((apiRequest: any) => {
      let responseData = apiRequest.response.body.answer;
    cy.intercept('POST', '/api/Feedbacks').as('submitRequest');
        customerFeedbackPage.submitCostumerFeedback(feedback,responseData);
    cy.wait('@submitRequest').its('response.body');
    cy.get('@submitRequest').then((apiRequest: any) => {
        let request = apiRequest.request.body
        let response= apiRequest.response
        expect(request.captcha).to.eq(responseData)
        expect(request.comment).to.contain(feedback);
        expect(apiRequest.response.statusCode).to.eq(201)
        expect(response.statusMessage).to.equals("Created")
        expect(response.body.data.comment).to.contain(feedback)
        });
     });
  });
  it('Scenario B - Verify user cant submit an empty form', () => {
    basePage.menuItem('Customer Feedback').click();
    customerFeedbackPage.submitButton().should('be.disabled')
  });
  it('Scenario C - Verify user  cant submit a form without a comment', () => {
    cy.intercept('GET', '/rest/captcha').as('captchaRequest');
    basePage.menuItem('Customer Feedback').click();
    cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/contact');
    cy.wait('@captchaRequest').its('response.body');
    cy.get('@captchaRequest').then((apiRequest: any) => {
      let responseData = apiRequest.response.body.answer;
      customerFeedbackPage.submitCostumerFeedbackNoComment(responseData);
    });
  });
  it('Scenario D - Verify user cant submit a form without a captcha', () => {
    basePage.menuItem('Customer Feedback').click();
    customerFeedbackPage.submitCostumerFeedbackNoCaptcha('ok');
  });
  it('Scenario D - Verify user cant submit a form without a star rating', () => {
    cy.intercept('GET', '/rest/captcha').as('captchaRequest');
    basePage.menuItem('Customer Feedback').click();
    cy.url().should('eq', 'https://juice-shop.herokuapp.com/#/contact');
    cy.wait('@captchaRequest').its('response.body');
    cy.get('@captchaRequest').then((apiRequest: any) => {
      let responseData = apiRequest.response.body.answer;
      customerFeedbackPage.submitCostumerFeedbackNoRating(feedback,responseData);
    });
  });
  it('Scenario E - Verify user cant submit a form with the wrong captcha', () => {
    basePage.menuItem('Customer Feedback').click();
    cy.intercept('POST', '/api/Feedbacks').as('submitRequest');
    customerFeedbackPage.submitCostumerFeedbackWrongCaptcha(feedback,'999999');
    cy.wait('@submitRequest').its('response.body');
    cy.get('@submitRequest').then((apiRequest: any) => {
      let request = apiRequest.request.body
      let response= apiRequest.response
      expect(request.captcha).to.eq('999999')
      expect(request.comment).to.contain(feedback);
      expect(apiRequest.response.statusCode).to.eq(401)
      expect(response.statusMessage).to.equals("Unauthorized")
    });
  });
  it('Scenario F - Verify user cant submit a form with the wrong regex for the captcha', () => {
    basePage.menuItem('Customer Feedback').click();
    customerFeedbackPage.submitCostumerFeedbackWrongRegexCaptcha(feedback,feedback);
  });
});
