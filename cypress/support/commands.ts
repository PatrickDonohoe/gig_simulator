/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Simulates a dnd-kit pointer drag between two elements. dnd-kit's
// PointerSensor requires a real `PointerEvent` (an `instanceof` check
// rejects Cypress's default MouseEvent), an initial move past its 5px
// activation-distance constraint, and live layout to resolve collisions —
// so this only works against a fully rendered page, not a mounted
// component in isolation.
Cypress.Commands.add(
  'dragTile',
  (sourceSelector: string, targetSelector: string, steps = 10) => {
    const pointerOpts = {
      eventConstructor: 'PointerEvent',
      pointerId: 1,
      isPrimary: true,
      button: 0,
      pointerType: 'mouse',
    } as const;

    cy.get(sourceSelector).then(($source) => {
      const sourceRect = $source[0].getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;

      cy.get(targetSelector).then(($target) => {
        const targetRect = $target[0].getBoundingClientRect();
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        cy.get(sourceSelector).trigger('pointerdown', {
          ...pointerOpts,
          clientX: startX,
          clientY: startY,
        });

        for (let i = 1; i <= steps; i++) {
          const x = startX + ((endX - startX) * i) / steps;
          const y = startY + ((endY - startY) * i) / steps;
          cy.get('body').trigger('pointermove', {
            ...pointerOpts,
            clientX: x,
            clientY: y,
          });
        }

        cy.get('body').trigger('pointerup', {
          ...pointerOpts,
          clientX: endX,
          clientY: endY,
        });
      });
    });
  },
);
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get elements by data-cy attribute
       *
       * @example
       *   cy.getByData('submit-button');
       */
      getByData(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Drags a dnd-kit sortable element from `sourceSelector` onto
       * `targetSelector` via simulated pointer events.
       *
       * @example
       *   cy.dragTile('#sidebar_tile_0', '[data-cy=setlist-fallback]');
       */
      dragTile(
        sourceSelector: string,
        targetSelector: string,
        steps?: number,
      ): Chainable<void>;
    }
  }
}

export {};
