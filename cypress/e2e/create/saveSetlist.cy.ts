import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';
import type { TransitionType } from '@/features/create_setlist/types/SetlistRow';

describe('adding a setlist', () => {
  const song1: SongType = {
    id: 's1',
    title: 'song1a',
    artist: 'artist1',
    genre: 'rock',
    key: 'C',
    tempo: '120',
    duration: 400,
    instrumentation: ['drums', 'electric guitar', 'vocals'],
  };

  const song3: SongType = {
    id: 's3',
    title: 'song3a',
    artist: 'artist3',
    genre: 'rock',
    key: 'D',
    tempo: '132',
    duration: 522,
    instrumentation: ['djimbe', 'rain stick', 'banjo'],
  };

  const setlistSong1: TransitionType = {
    kind: 'transition',
    transitionId: 't1',
    notes: 's1 has some notes',
    transitionTime: {
      hours: 0,
      minutes: 5,
      seconds: 20,
    },
  };

  const setlistSong2: TransitionType = {
    kind: 'transition',
    transitionId: 't3',
    notes: 's3 has more notes',
    transitionTime: {
      hours: 0,
      minutes: 2,
      seconds: 30,
    },
  };

  it('loads the page with a blank setlist', () => {
    cy.visit('/dash/create');
    cy.getByData('setlist-fallback');
  });

  it('adds a song to the setlist when a tile is dragged from the sidebar', () => {
    const song = {
      id: 'song-1',
      title: 'Test Song',
      artist: 'Test Artist',
      genre: 'Rock',
      key: 'C',
      tempo: '120',
      duration: 200,
      instrumentation: ['guitar'],
    };

    // getAllSongs() reads localStorage on mount, so the library needs to be
    // seeded before the app's scripts run.
    cy.visit('/dash/create', {
      onBeforeLoad(win) {
        win.localStorage.setItem('songs', JSON.stringify({ [song.id]: song }));
      },
    });

    cy.get('[data-song-id=tile-song-1]').should('be.visible');
    cy.getByData('setlist-fallback').should('be.visible');

    cy.dragTile('[data-song-id=tile-song-1]', '[data-cy=setlist-fallback]');
    cy.getByData('setlist-songlist')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 1);

    cy.getByData('setlist-fallback').should('not.exist');
    cy.getByData('list').should('have.length', 1);
    cy.getByData('list')
      .find('[data-cy=setlist-tile-song-1]')
      .should('contain.text', song.title);
  });

  it('has a disabled submit button when the form is missing required fields.', () => {
    cy.visit('/dash/create');
    cy.reload(true);

    cy.getByData('submit').should('be.disabled');
  });

  it('submits and adds to local storage the notes and transition times', () => {
    const setlistName = 'Rager Party';

    // A transition is created via the "Add a Transition" button on a song tile
    // (there's no way to drag one in), and it lands at combined index
    // songIndex + 1. With two songs dropped, adding a transition after song 0
    // then after the last song gives [song, transition, song, transition],
    // so the transition tiles sit at combined indexes 1 and 3.
    const transitions = [
      { index: 1, addAfter: 0, row: setlistSong1 },
      { index: 3, addAfter: 2, row: setlistSong2 },
    ];

    cy.visit('/dash/create', {
      // before the window loads, add these songs to the library
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song3.id]: song3 }),
        );
      },
    });

    // dragging tiles to the setlist, because it can't be prepopulated.
    cy.dragTile('[data-song-id=tile-s1]', '[data-cy=setlist-fallback]'); // first drop: fallback exists
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 1); // waits for the first drop to actually land

    cy.dragTile('[data-song-id=tile-s3]', '[data-cy=list]'); // second drop: fallback is gone
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 2);

    cy.getByData('title').type(setlistName);

    // insert the transition rows, then fill each one's notes / minutes / seconds
    transitions.forEach(({ index, addAfter, row }) => {
      cy.getByData(`add-transition-${addAfter}`).click();
      cy.getByData(`transition-tile-${index}`).should('exist');

      cy.getByData(`notes-${index}`)
        .clear()
        .type(row.notes ?? '');
      cy.getByData(`minutes-tran-${index}`)
        .clear()
        .type(String(row.transitionTime.minutes));
      cy.getByData(`seconds-tran-${index}`)
        .clear()
        .type(String(row.transitionTime.seconds));
    });

    cy.getByData('submit').click();

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'setlists')
      .should('not.be.null')
      .then((raw) => {
        // setlistId is a fresh UUID at submit time, so match on the name instead
        const saved = Object.values(JSON.parse(raw as string)).find(
          (s: any) => s.setlistName === setlistName,
        ) as SubmitSetlistType;

        const savedTransitions = saved.setlistSongs.filter(
          (r): r is TransitionType => r.kind === 'transition',
        );
        const expectedTransitions = transitions.map((t) => t.row);

        expect(savedTransitions).to.have.length(expectedTransitions.length);
        savedTransitions.forEach((actual, i) => {
          expect(actual.notes).to.eq(expectedTransitions[i].notes);
          expect(actual.transitionTime).to.deep.eq(
            expectedTransitions[i].transitionTime,
          );
        });
      });
  });

  it('shows a success banner and resets the form after successful submission.', () => {
    const transitions = [
      { index: 1, addAfter: 0, row: setlistSong1 },
      { index: 3, addAfter: 2, row: setlistSong2 },
    ];

    cy.visit('/dash/create', {
      // before the window loads, add these songs to the library
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ [song1.id]: song1, [song3.id]: song3 }),
        );
      },
    });

    cy.dragTile('[data-song-id=tile-s1]', '[data-cy=setlist-fallback]'); // first drop: fallback exists
    cy.dragTile('[data-song-id=tile-s3]', '[data-cy=list]'); // second drop: fallback is gone

    cy.getByData('title').type('Rager Party');

    // insert the transition rows, then fill each one's notes / minutes / seconds
    transitions.forEach(({ index, addAfter, row }) => {
      cy.getByData(`add-transition-${addAfter}`).click();
      cy.getByData(`transition-tile-${index}`).should('exist');

      cy.getByData(`notes-${index}`)
        .clear()
        .type(row.notes ?? '');
      cy.getByData(`minutes-tran-${index}`)
        .clear()
        .type(String(row.transitionTime.minutes));
      cy.getByData(`seconds-tran-${index}`)
        .clear()
        .type(String(row.transitionTime.seconds));
    });

    cy.getByData('submit').click();

    // Success Banner
    cy.get('#success_banner').should('exist');
    cy.get('#success_title').contains('Setlist Saved');
    cy.get('#success_message').contains(
      'Setlist changes have been successfully saved.',
    );

    // Reset setlist form
    cy.getByData('title').should('have.value', '');
    cy.getByData('setlist-fallback').should('exist');
  });
});
