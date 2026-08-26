describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  });

  it('finds the link and redirects to the dash page', () => {
    cy.visit('/');
    cy.get('#to-dash').click();
    cy.url().should('include', '/dash');
  });
})