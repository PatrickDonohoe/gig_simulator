import type { SongType } from '@/types/SongType';

describe('edit an existing song on the create setlist page', () => {
  const song1: SongType = {
    id: 'song1',
    title: 'song1a',
    artists: 'artist1',
    key: 'C',
    mode: 'major',
    tempo: 120,
    duration: 400,
  };

  const song2: SongType = {
    id: 'song2',
    title: 'song2a',
    artists: 'artist2',
    key: 'D',
    mode: 'minor',
    tempo: 132,
    duration: 522,
  };

  it('fills the modal/form fields when the edit button on a song tile is clicked', () => {
    cy.visit('/dash/create', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.get('[data-song-id=tile-song1]').should('be.visible');
    cy.dragTile('[data-song-id=tile-song1]', '[data-cy=setlist-fallback]');
    cy.getByData('edit-button-0').click();
    cy.get('#song_form').should('be.visible');
    cy.getByData('input-title').should('have.value', 'song1a');
    cy.getByData('input-artists').should('have.value', 'artist1');
    cy.getByData('input-key').should('have.value', 'C');
    cy.getByData('input-tempo').should('have.value', '120');
    cy.get('#duration-minutes').should('have.value', '6');
    cy.get('#duration-seconds').should('have.value', '40');
  });

  it('closes when the x button is clicked', () => {
    cy.visit('/dash/create', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.dragTile('[data-song-id=tile-song1]', '[data-cy=setlist-fallback]');
    cy.getByData('edit-button-0').click();
    cy.get('#song_form').should('be.visible');
    cy.get('#close-modal').click();
    cy.get('#song_form').should('not.exist');
  });

  it('shows modified setlist tiles upon successful form submission', () => {
    cy.visit('/dash/create', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.dragTile('[data-song-id=tile-song1]', '[data-cy=setlist-fallback]');
    cy.getByData('edit-button-0').click();
    cy.get('#song_form').should('be.visible');

    cy.getByData('input-title').clear().type('song1b');
    cy.getByData('input-title').should('have.value', 'song1b');
    cy.getByData('submit_button').click();
    cy.get('#song_form').should('not.exist');
    cy.getByData('title-0').should('contain.text', 'song1b');

    // everything else only lives in storage, so verify the update persisted
    // under the original id rather than being saved as a new song
    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem('songs') ?? '{}');

      expect(Object.keys(stored)).to.have.length(2);
      expect(stored[song1.id]).to.include({
        id: song1.id,
        title: 'song1b',
        artists: song1.artists,
        key: song1.key,
        tempo: song1.tempo,
        duration: song1.duration,
      });
    });
  });
});
