import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';

describe('review setlist in view mode', () => {
  const setlist1: SubmitSetlistType = {
    setlistId: 'sl1',
    setlistName: 'sln1',
    setlistSongs: [
      {
        songId: 'song1',
        notes: 'song1 notes',
        transitionTime: {
          hours: 0,
          minutes: 0,
          seconds: 30,
        },
      },
      {
        songId: 'song2',
        notes: 'song2 notes',
        transitionTime: {
          hours: 0,
          minutes: 1,
          seconds: 25,
        },
      },
    ],
  };

  const song1: SongType = {
    id: 'song1',
    title: 'song1a',
    artist: 'artist1',
    genre: 'rock',
    key: 'C',
    tempo: '120',
    duration: 400,
    instrumentation: ['drums', 'electric guitar', 'vocals'],
  };

  const song2: SongType = {
    id: 'song2',
    title: 'song2a',
    artist: 'artist2',
    genre: 'rock',
    key: 'D',
    tempo: '132',
    duration: 522,
    instrumentation: ['djimbe', 'rain stick', 'banjo'],
  };

  it('presents the correct page', () => {
    cy.visit('/dash/review');

    cy.getByData('view-page').should('be.visible');
  });

  it('displays the fallback if no setlist is chosen', () => {
    cy.visit('/dash/review');

    cy.getByData('sidebar-empty').should('be.visible');
    cy.getByData('setlist-empty').should('be.visible');
  });

  it('dispays the setlist in the sidebar when one is preset and displays the appropriate feedback when that setlist has not yet been chosen', () => {
    cy.visit('/dash/review', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'setlists',
          JSON.stringify({ [setlist1.setlistId]: setlist1 }),
        );
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.getByData('setlist-empty').should('be.visible');
    cy.getByData('list').should('be.visible');
    cy.getByData('list').find('[data-cy^="sidebar-tile"]').should('have.length', 1);
  });

  // find the button
  // click the button
  // find the library sidebar and other elements to prove edit mode
  it('changes from view to edit mode when a setlist is selected and the edit button in the header is clicked', () => {
    cy.visit('/dash/review', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'setlists',
          JSON.stringify({ [setlist1.setlistId]: setlist1 }),
        );
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.getByData('view-page').should('be.visible');
    cy.getByData('list').should('be.visible');
    cy.get('#view-header').should('not.exist');
    cy.getByData('sidebar-tile').click();
    cy.get('#button-edit').click();
    cy.getByData('setlist-form').should('be.visible');
  });

  it('displays the correct data for the chosen setlist', () => {
    cy.visit('/dash/review', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'setlists',
          JSON.stringify({ [setlist1.setlistId]: setlist1 }),
        );
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song2.id]: song2 }),
        );
      },
    });

    cy.getByData('sidebar-tile').contains(setlist1.setlistName).click();
    cy.get('#setlist-article').contains(`Title: ${song1.title}`);
    cy.getByData('song-notes').contains(setlist1.setlistSongs[0].notes ?? '');
    cy.getByData('song-transition').contains(
      `${setlist1.setlistSongs[0].transitionTime.minutes ?? '00'}: ${setlist1.setlistSongs[0].transitionTime.seconds ?? '00'}`,
    );
  });
});
