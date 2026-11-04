import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';

describe('perform a saved setlist', () => {
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

  const reviewPath = `/dash/review/${setlist1.setlistId}`;
  const performPath = `${reviewPath}/perform`;

  // Seeds local storage before the app boots so the route loader and library
  // store both see the saved setlist and its songs.
  const seedStorage = (
    win: Window,
    setlist: SubmitSetlistType = setlist1,
    songs: SongType[] = [song1, song2],
  ) => {
    win.localStorage.setItem(
      'setlists',
      JSON.stringify({ [setlist.setlistId]: setlist }),
    );
    win.localStorage.setItem(
      'songs',
      JSON.stringify(Object.fromEntries(songs.map((s) => [s.id, s]))),
    );
  };

  // Starts on the review page for the saved setlist and opens perform mode
  // the way a user would: via the Perform link in the setlist header.
  const openPerformFromReview = () => {
    cy.visit(reviewPath, { onBeforeLoad: (win) => seedStorage(win) });
    cy.getByData('setlist-form').should('be.visible');
    cy.contains('a', 'Perform').click();
  };

  // Allows for sub-pixel rounding between layout boxes.
  const expectRectToMatch = (
    actual: DOMRect,
    expected: { top: number; left: number; width: number; height: number },
  ) => {
    expect(actual.top, 'top').to.be.closeTo(expected.top, 1);
    expect(actual.left, 'left').to.be.closeTo(expected.left, 1);
    expect(actual.width, 'width').to.be.closeTo(expected.width, 1);
    expect(actual.height, 'height').to.be.closeTo(expected.height, 1);
  };

  describe('navigation', () => {
    it('navigates from a saved setlist to its perform page', () => {
      openPerformFromReview();

      cy.location('pathname').should('eq', performPath);
      cy.getByData('perform-view').should('be.visible');
      cy.get('#perform-title').should('have.text', setlist1.setlistName);
      cy.getByData('perform-summary').should('contain.text', '2 songs');
      cy.get('#performance-page').should('be.visible');
    });

    it('returns to the saved setlist when the perform page is closed', () => {
      openPerformFromReview();
      cy.location('pathname').should('eq', performPath);

      cy.get('#close-perform').click();

      cy.location('pathname').should('eq', reviewPath);
      cy.getByData('perform-view').should('not.exist');
      cy.getByData('setlist-form').should('be.visible');
    });

    it('returns to the saved setlist when Escape is pressed', () => {
      openPerformFromReview();
      cy.getByData('perform-view').should('be.visible');

      cy.get('body').type('{esc}');

      cy.location('pathname').should('eq', reviewPath);
      cy.getByData('perform-view').should('not.exist');
    });

    it('loads the perform page when visited directly by URL', () => {
      cy.visit(performPath, { onBeforeLoad: (win) => seedStorage(win) });

      cy.getByData('perform-view').should('be.visible');
      cy.get('#tile-list > li').should(
        'have.length',
        setlist1.setlistSongs.length,
      );
    });

    it('shows the error page for a setlist that does not exist', () => {
      cy.visit('/dash/review/missing-setlist/perform', {
        onBeforeLoad: (win) => seedStorage(win),
      });

      cy.contains('404').should('be.visible');
      cy.contains('Setlist not found').should('be.visible');
      cy.getByData('perform-view').should('not.exist');
    });
  });

  describe('setlist data', () => {
    it('displays every song and transition in setlist order', () => {
      openPerformFromReview();

      cy.get('#tile-list > li').should('have.length', 4);
      cy.get('#tile-list > li').eq(0).should('contain.text', song1.title);
      cy.get('#tile-list > li')
        .eq(1)
        .should('contain.text', 'Transition notes 1')
        .and('contain.text', '00:30');
      cy.get('#tile-list > li').eq(2).should('contain.text', song2.title);
      cy.get('#tile-list > li')
        .eq(3)
        .should('contain.text', 'Transition notes 2')
        .and('contain.text', '01:25');
    });

    it('shows a fallback tile when a song is no longer in the library', () => {
      cy.visit(performPath, {
        // song2 has been removed from the library but is still in the setlist
        onBeforeLoad: (win) => seedStorage(win, setlist1, [song1]),
      });

      cy.get('#tile-list > li').should('have.length', 4);
      cy.get('#tile-list > li').eq(0).should('contain.text', song1.title);
      cy.get('#tile-list > li')
        .eq(2)
        .should('contain.text', 'Data unavailable')
        .and('not.contain.text', song2.title);
    });
  });

  describe('song controls', () => {
    const expectCurrentSong = (position: number) => {
      cy.getByData(`perform-song-${position}`).should(
        'have.attr',
        'aria-current',
        'step',
      );
      cy.get('[aria-current="step"]').should('have.length', 1);
    };

    it('starts on the first song', () => {
      openPerformFromReview();

      expectCurrentSong(1);
      cy.getByData('song-progress').should('have.text', 'Song 1 of 2');
      cy.get('#prev-song').should('be.disabled');
    });

    it('advances and goes back with the buttons', () => {
      openPerformFromReview();

      cy.get('#next-song').click();
      expectCurrentSong(2);
      cy.location('search').should('eq', '?song=2');
      cy.getByData('song-progress').should('have.text', 'Song 2 of 2');

      cy.get('#prev-song').click();
      expectCurrentSong(1);
      cy.location('search').should('eq', '?song=1');
    });

    it('shows the set as complete after the last song', () => {
      openPerformFromReview();

      cy.get('#next-song').click();
      cy.get('#next-song').should('have.text', 'Finish').click();

      cy.getByData('set-complete').should('be.visible');
      cy.getByData('song-progress').should('have.text', 'Set complete');
      cy.get('#next-song').should('be.disabled');
      cy.get('[aria-current="step"]').should('not.exist');
    });

    it('moves between songs with the arrow and page keys', () => {
      openPerformFromReview();

      cy.get('body').type('{rightarrow}');
      expectCurrentSong(2);
      cy.get('body').type('{leftarrow}');
      expectCurrentSong(1);
      cy.get('body').type('{pagedown}');
      expectCurrentSong(2);
      cy.get('body').type('{pageup}');
      expectCurrentSong(1);
    });

    it('makes a song current when it is tapped', () => {
      openPerformFromReview();

      cy.getByData('perform-song-2').find('button').click();
      expectCurrentSong(2);
    });

    it('keeps the current song after a refresh', () => {
      cy.visit(`${performPath}?song=2`, {
        onBeforeLoad: (win) => seedStorage(win),
      });
      expectCurrentSong(2);

      cy.reload();
      expectCurrentSong(2);
    });

    it('starts on the first song when the song param is invalid', () => {
      cy.visit(`${performPath}?song=abc`, {
        onBeforeLoad: (win) => seedStorage(win),
      });
      expectCurrentSong(1);
    });

    it('returns to the saved setlist when closed mid-set', () => {
      openPerformFromReview();
      cy.get('#next-song').click();

      cy.get('#close-perform').click();

      cy.location('pathname').should('eq', reviewPath);
      cy.location('search').should('eq', '');
    });
  });

  describe('layout', () => {
    it('fills the whole screen on mobile devices', () => {
      cy.viewport('iphone-x'); // below tailwind's md breakpoint
      openPerformFromReview();

      cy.window().then((win) => {
        cy.getByData('perform-view')
          .should('be.visible')
          .then(($sheet) => {
            expectRectToMatch($sheet[0].getBoundingClientRect(), {
              top: 0,
              left: 0,
              width: win.innerWidth,
              height: win.innerHeight,
            });
          });
      });
    });

    it('fills the content section on larger devices', () => {
      cy.viewport('macbook-15'); // above tailwind's md breakpoint
      openPerformFromReview();

      cy.get('#page-layout-content').then(($content) => {
        const contentRect = $content[0].getBoundingClientRect();

        cy.getByData('perform-view')
          .should('be.visible')
          .then(($sheet) => {
            expectRectToMatch($sheet[0].getBoundingClientRect(), contentRect);
          });
      });

      // The app header stays visible above the perform view.
      cy.get('header').first().should('be.visible');
    });
  });
});
