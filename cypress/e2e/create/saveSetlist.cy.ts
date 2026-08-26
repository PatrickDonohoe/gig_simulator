import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';

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

  const setlistSong1: SubmitSetlistType['setlistSongs'][number] = {
    songId: 's1',
    notes: 's1 has some notes',
    transitionTime: {
      hours: 0,
      minutes: 5,
      seconds: 20,
    },
  };

  const setlistSong2: SubmitSetlistType['setlistSongs'][number] = {
    songId: 's3',
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

    cy.get('#sidebar_tile_0').should('be.visible');
    cy.getByData('setlist-fallback').should('be.visible');

    cy.dragTile('#sidebar_tile_0', '[data-cy=setlist-fallback]');
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 1);

    cy.getByData('setlist-fallback').should('not.exist');
    cy.getByData('list').should('have.length', 1);
    cy.getByData('list')
      .find('[data-cy=setlist-tile-0]')
      .should('contain.text', song.title);
  });

  it('has a disabled submit button when the form is missing required fields.', () => {
    cy.visit('/dash/create');
    cy.reload(true);

    cy.getByData('submit').should('be.disabled');
  });

  it('submits and adds to local storage the setlist data', () => {
    const setlist: SubmitSetlistType = {
      setlistId: 'a1',
      setlistName: 'Rager Party',
      setlistSongs: [setlistSong1, setlistSong2],
    };

    cy.visit('/dash/create', {
      // before the window loads, add these songs to the library
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'songs',
          JSON.stringify({ s1: song3, s3: song1 }),
        );
      },
    });

    // dragging tiles to the setlist, because it can't be prepoluated.
    cy.dragTile('#sidebar_tile_0', '[data-cy=setlist-fallback]'); // first drop: fallback exists
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 1); // waits for the first drop to actually land

    cy.dragTile('#sidebar_tile_0', '[data-cy=list]'); // second drop: fallback is gone and song3 is now index 0
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 2);

    cy.getByData('title').type(setlist.setlistName);

    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .each((_$tile, i) => {
        const row = setlist.setlistSongs[i];
        cy.getByData(`notes-${i}`)
          .clear()
          .type(row.notes ?? '');
        cy.getByData(`minutes-tran-${i}`)
          .clear()
          .type(String(row.transitionTime.minutes));
        cy.getByData(`seconds-tran-${i}`)
          .clear()
          .type(String(row.transitionTime.seconds));
      });

    cy.getByData('submit').click();

    cy.window()
      .its('localStorage')
      .invoke('getItem', 'setlists')
      .should('not.be.null')
      .then((raw) => {
        // searching through all setlists retrieved for a matching setlist name, because setlistId is unknown at the time of submission
        const saved = Object.values(JSON.parse(raw as string)).find(
          (s: any) => s.setlistName === setlist.setlistName,
        ) as SubmitSetlistType;

        // comparing songs in the found setlist to the original matching setlist
        setlist.setlistSongs.forEach((expected) => {
          const actual = saved.setlistSongs.find(
            (r) => r.songId === expected.songId,
          );
          expect(actual?.notes).to.eq(expected.notes);
          expect(actual?.transitionTime).to.deep.eq(expected.transitionTime);
        });
      });
  });
});
