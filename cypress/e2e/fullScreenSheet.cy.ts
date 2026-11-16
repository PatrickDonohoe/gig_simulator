describe('FullScreenSheet', () => {
  beforeEach(() => {
    cy.visit('/dash/library/add-song');
  });

  it('opens as a modal and locks page scroll', () => {
    cy.get('[data-cy=full-screen-sheet]').should('have.attr', 'open');
    cy.get('html').should('have.css', 'overflow-y', 'hidden');
  });

  it('closes on Escape and unlocks scroll', { browser: 'firefox' }, () => {
    cy.get('[data-cy=full-screen-sheet]').should('have.attr', 'open');
    cy.press(Cypress.Keyboard.Keys.ESC);
    cy.get('[data-cy=full-screen-sheet]').should('not.exist');
    cy.get('html').should('not.have.css', 'overflow-y', 'hidden');
  });

  it('never lets Tab reach page content behind the sheet', () => {
    cy.get('[data-cy=full-screen-sheet]').should('have.attr', 'open');
    for (let i = 0; i < 8; i++) {
      cy.press(Cypress.Keyboard.Keys.TAB);
      cy.document().then((doc) => {
        const el = doc.activeElement!;
        const ok =
          el === doc.body || !!el.closest('[data-cy=full-screen-sheet]');
        expect(ok, `focus on ${el.tagName}#${el.id}`).to.equal(true);
      });
    }
  });

  it('fills the viewport on mobile (dvh)', () => {
    cy.viewport('iphone-x');
    cy.window().then((win) => {
      cy.get('[data-cy=full-screen-sheet]')
        .invoke('outerHeight')
        .should('be.closeTo', win.innerHeight, 1);
    });
  });
});
