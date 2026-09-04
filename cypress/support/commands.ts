/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Simulates a pragmatic-drag-and-drop drag between two elements.
// Pragmatic dnd is built on the native HTML5 Drag and Drop API: it starts a
// drag from a document-level `dragstart` listener that requires a real,
// populated `DataTransfer` (an `instanceof` / null check rejects anything
// else), and it tracks drop targets itself by reading `event.target` off
// `dragenter`/`dragover`/`drop` — so, unlike a pointer-based sim, each event
// must be dispatched directly on the element it needs to be seen on rather
// than on `body` at interpolated coordinates.
//
// No `dragend` is triggered: the library's `drop` handling already runs its
// full teardown (`onDrop` on the source, the drop target, and any monitor)
// synchronously off the `drop` event itself, and a successful drop can
// unmount the source tile (eg. a library song moving into the setlist) —
// re-querying it afterwards for `dragend` is both unnecessary and flaky.
//
// `force: true` is required on every trigger: pragmatic dnd plants a 2px
// "honey pot" element at the drag's start position (a workaround for a real
// browser bug where stray hover events fire under the still-depressed
// pointer) and only tears it down on a later real pointer/drag event. With
// no real pointer moving between our synthetic events, the honey pot from
// one drag can still be sitting over the next drag's source tile, which
// Cypress's default actionability check treats as "covered" and refuses to
// act on.
Cypress.Commands.add(
  'dragTile',
  (sourceSelector: string, targetSelector: string) => {
    const dragEventOpts = {
      eventConstructor: 'DragEvent',
      bubbles: true,
      cancelable: true,
      force: true,
    } as const;

    cy.get(sourceSelector).then(($source) => {
      const sourceRect = $source[0].getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;

      cy.get(targetSelector).then(($target) => {
        const targetRect = $target[0].getBoundingClientRect();
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        const dataTransfer = new DataTransfer();

        cy.get(sourceSelector).trigger('dragstart', {
          ...dragEventOpts,
          dataTransfer,
          clientX: startX,
          clientY: startY,
        });

        cy.get(targetSelector)
          .trigger('dragenter', {
            ...dragEventOpts,
            dataTransfer,
            clientX: endX,
            clientY: endY,
          })
          .trigger('dragover', {
            ...dragEventOpts,
            dataTransfer,
            clientX: endX,
            clientY: endY,
          })
          .trigger('drop', {
            ...dragEventOpts,
            dataTransfer,
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
       * Drags a pragmatic-drag-and-drop element from `sourceSelector` onto
       * `targetSelector` via simulated native drag events.
       *
       * @example
       *   cy.dragTile('#sidebar_tile_0', '[data-cy=setlist-fallback]');
       */
      dragTile(sourceSelector: string, targetSelector: string): Chainable<void>;
    }
  }
}

export {};
