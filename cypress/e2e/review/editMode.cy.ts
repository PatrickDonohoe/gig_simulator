import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type {
  SongRowType,
  TransitionType,
} from '@/features/create_setlist/types/SetlistRow';
import type { SongType } from '@/types/SongType';

describe('edit a saved setlist', () => {
  const setlist1: SubmitSetlistType = {
    setlistId: 'sl1',
    setlistName: 'sln1',
    setlistSongs: [
      { kind: 'song', songId: 'song1' },
      {
        kind: 'transition',
        transitionId: 't1',
        notes: 'Transition notes 1',
        transitionTime: { seconds: 30 },
      },
      { kind: 'song', songId: 'song2' },
      {
        kind: 'transition',
        transitionId: 't2',
        notes: 'Transition notes 2',
        transitionTime: { minutes: 1, seconds: 25 },
      },
    ],
  };

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

  // In the library but not in the setlist, so it can be added while editing.
  const song3: SongType = {
    id: 'song3',
    title: 'song3a',
    artists: 'artist3',
    key: 'E',
    mode: 'major',
    tempo: 100,
    duration: 300,
  };

  const reviewPath = `/dash/review/${setlist1.setlistId}`;

  const setlistRows = () => cy.getByData('list').children();

  // Seeds local storage before the app boots so the route loader and library
  // store both see the saved setlist and its songs.
  const seedStorage = (win: Window) => {
    win.localStorage.setItem(
      'setlists',
      JSON.stringify({ [setlist1.setlistId]: setlist1 }),
    );
    win.localStorage.setItem(
      'songs',
      JSON.stringify({
        [song1.id]: song1,
        [song2.id]: song2,
        [song3.id]: song3,
      }),
    );
  };

  const visitEdit = () => {
    cy.visit(reviewPath, { onBeforeLoad: seedStorage });
    cy.getByData('setlist-form').should('be.visible');
  };

  // Yields the stored copy of setlist1 after the app has written to it.
  const storedSetlist = () =>
    cy
      .window()
      .its('localStorage')
      .invoke('getItem', 'setlists')
      .then((raw) => {
        const all = JSON.parse(raw as string) as Record<
          string,
          SubmitSetlistType
        >;
        expect(Object.keys(all), 'no duplicate setlist created').to.deep.eq([
          setlist1.setlistId,
        ]);
        return all[setlist1.setlistId];
      });

  const storedSongIds = (saved: SubmitSetlistType) =>
    saved.setlistSongs
      .filter((r): r is SongRowType => r.kind === 'song')
      .map((r) => r.songId);

  const expectSuccessBanner = () => {
    cy.get('#success_banner').should('exist');
    cy.get('#success_title').contains('Setlist Saved');
  };

  describe('loading', () => {
    it('opens the setlist from the sidebar in edit mode', () => {
      cy.visit('/dash/review', { onBeforeLoad: seedStorage });

      cy.getByData(`sidebar-tile-${setlist1.setlistId}`).click();

      cy.location('pathname').should('eq', reviewPath);
      cy.getByData('setlist-form').should('be.visible');
      cy.getByData('submit').should('have.text', 'Save changes');
    });

    it('fills the form with the saved setlist values', () => {
      visitEdit();

      cy.getByData('title').should('have.value', setlist1.setlistName);
      setlistRows().should('have.length', 4);
      cy.get(`#tile-shell-${song1.id}`).should('contain.text', song1.title);
      cy.getByData('transition-notes-t1').should(
        'have.text',
        'Transition notes 1',
      );
      cy.get('#tile-shell-t1').should('contain.text', '00:30');
      cy.get(`#tile-shell-${song2.id}`).should('contain.text', song2.title);
      cy.getByData('transition-notes-t2').should(
        'have.text',
        'Transition notes 2',
      );
      cy.get('#tile-shell-t2').should('contain.text', '01:25');
    });

    it('starts with save disabled and the song library hidden', () => {
      visitEdit();

      cy.getByData('submit').should('be.disabled');
      cy.getByData('library-sidebar').should('not.exist');
      cy.contains('button', 'Add songs').should('be.visible');
    });

    it('toggles the song library with the Add songs / Hide library button', () => {
      visitEdit();

      cy.contains('button', 'Add songs').click();
      cy.getByData('library-sidebar').should('be.visible');
      // only songs that aren't already in the setlist are offered
      cy.get(`[data-song-id=tile-${song3.id}]`).should('be.visible');
      cy.get(`[data-song-id=tile-${song1.id}]`).should('not.exist');

      cy.contains('button', 'Hide library').click();
      cy.getByData('library-sidebar').should('not.exist');
    });

    it('shows the error page for a setlist that does not exist', () => {
      cy.visit('/dash/review/missing-setlist', { onBeforeLoad: seedStorage });

      cy.contains('404').should('be.visible');
      cy.contains('Setlist not found').should('be.visible');
      cy.getByData('setlist-form').should('not.exist');
    });
  });

  describe('dirty state', () => {
    it('enables save after an edit and disables it when the edit is undone', () => {
      visitEdit();

      cy.getByData('title').type(' updated');
      cy.getByData('submit').should('be.enabled');

      cy.getByData('title').clear().type(setlist1.setlistName);
      cy.getByData('submit').should('be.disabled');
    });

    it('shows a validation error and does not save when the title is cleared', () => {
      visitEdit();

      cy.getByData('title').clear();
      cy.getByData('error').should(
        'contain.text',
        'A setlist name is required.',
      );

      cy.getByData('submit').click();

      cy.get('#success_banner').should('not.exist');
      storedSetlist().its('setlistName').should('eq', setlist1.setlistName);
    });
  });

  describe('saving', () => {
    it('saves a renamed setlist under the same id and keeps the new values in the form', () => {
      const newName = 'Renamed Setlist';
      visitEdit();

      cy.getByData('title').clear().type(newName);
      cy.getByData('submit').click();

      expectSuccessBanner();
      storedSetlist().then((saved) => {
        expect(saved.setlistName).to.eq(newName);
        expect(storedSongIds(saved)).to.deep.eq([song1.id, song2.id]);
      });

      // Edit mode keeps the submitted values rather than blanking the form,
      // and the saved values become the new baseline.
      cy.location('pathname').should('eq', reviewPath);
      cy.getByData('title').should('have.value', newName);
      setlistRows().should('have.length', 4);
      cy.getByData('submit').should('be.disabled');
    });

    it('saves edited transition notes and times', () => {
      visitEdit();

      cy.get('#open-notes-button-1').click();
      cy.get('#transition-tile-1')
        .find('textarea')
        .clear()
        .type('Tune down a half step');
      cy.getByData('minutes-tran-1').clear().type('2');
      cy.getByData('seconds-tran-1').clear().type('15');

      cy.getByData('submit').click();

      expectSuccessBanner();
      storedSetlist().then((saved) => {
        const t1 = saved.setlistSongs.find(
          (r): r is TransitionType =>
            r.kind === 'transition' && r.transitionId === 't1',
        );
        expect(t1?.notes).to.eq('Tune down a half step');
        expect(t1?.transitionTime.minutes).to.eq(2);
        expect(t1?.transitionTime.seconds).to.eq(15);
      });
    });

    it('saves a setlist with a song removed', () => {
      visitEdit();

      cy.get(`#tile-shell-${song2.id}`)
        .find('[aria-label="Remove from setlist"]')
        .click();
      setlistRows().should('have.length', 3);
      cy.get(`#tile-shell-${song2.id}`).should('not.exist');

      cy.getByData('submit').click();

      expectSuccessBanner();
      storedSetlist().then((saved) => {
        expect(storedSongIds(saved)).to.deep.eq([song1.id]);
      });
      // the removed song goes back to the library
      cy.contains('button', 'Add songs').click();
      cy.get(`[data-song-id=tile-${song2.id}]`).should('be.visible');
    });

    it('saves a setlist with a song added from the library', () => {
      visitEdit();

      cy.contains('button', 'Add songs').click();
      cy.dragTile(
        `[data-song-id=tile-${song3.id}]`,
        '[data-cy=setlist-songlist]',
      );
      setlistRows().should('have.length', 5);
      cy.get(`#tile-shell-${song3.id}`).should('contain.text', song3.title);

      cy.getByData('submit').click();

      expectSuccessBanner();
      storedSetlist().then((saved) => {
        expect(storedSongIds(saved)).to.deep.eq([song1.id, song2.id, song3.id]);
      });
    });

    it('saves a setlist with a transition removed', () => {
      visitEdit();

      cy.get('#tile-shell-t1')
        .find('[aria-label="Remove from setlist"]')
        .click();
      setlistRows().should('have.length', 3);
      cy.get('#tile-shell-t1').should('not.exist');
      // with no transition after song1, the add-transition button returns
      cy.getByData('add-transition-0').should('be.visible');

      cy.getByData('submit').click();

      expectSuccessBanner();
      storedSetlist().then((saved) => {
        expect(saved.setlistSongs.map((r) => r.kind)).to.deep.eq([
          'song',
          'song',
          'transition',
        ]);
        expect(storedSongIds(saved)).to.deep.eq([song1.id, song2.id]);
        const transitionIds = saved.setlistSongs
          .filter((r): r is TransitionType => r.kind === 'transition')
          .map((r) => r.transitionId);
        expect(transitionIds).to.deep.eq(['t2']);
      });
    });

    it('shows the saved changes after a reload', () => {
      const newName = 'Reloaded Setlist';
      visitEdit();

      cy.getByData('title').clear().type(newName);
      cy.get(`#tile-shell-${song1.id}`)
        .find('[aria-label="Remove from setlist"]')
        .click();
      cy.getByData('submit').click();
      expectSuccessBanner();

      // plain reload: no re-seeding, so this reads what the app saved
      cy.reload();

      cy.getByData('title').should('have.value', newName);
      cy.get(`#tile-shell-${song1.id}`).should('not.exist');
      cy.get(`#tile-shell-${song2.id}`).should('contain.text', song2.title);
      cy.getByData('submit').should('be.disabled');
    });
  });
});
