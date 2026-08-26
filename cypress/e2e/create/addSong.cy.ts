describe('adding song to library', () => {
  it('loads the page with the modal closed', () => {
    cy.visit('/dash/create');
    cy.get('#song_form').should('not.exist');
  });

  it('opens add song modal when the add song + button is clicked', () => {
    cy.visit('/dash/create');
    cy.get('#sidebar-header-button').click();
    cy.get('#song_form').should('be.visible')
  });

  it('allows user input into the form, submits, and disappears after submit', () => {
    const song = {
      title: 'Sonata',
      artist: 'Beethoven',
      genre: 'Classical',
      key: 'D minor',
      tempo: '120',
      minutes: 7,
      seconds: 30,
      instrument: 'piano',
    };

    cy.visit('/dash/create');
    cy.get('#sidebar-header-button').click();
    cy.get('#song_form').within(() => {
      cy.getByData('input-title').type(song.title);
      cy.getByData('input-artist').type(song.artist);
      cy.getByData('input-genre').type(song.genre);
      cy.getByData('input-key').type(song.key);
      cy.getByData('input-tempo').type(song.tempo);
      cy.get('#duration-minutes').type(String(song.minutes));
      cy.get('#duration-seconds').type(String(song.seconds));
      cy.get('#instrument-0').type(song.instrument);
      cy.getByData('submit_button').click();
    });
    cy.get('#song_form').should('not.exist');

    // the tile only renders title + duration, so check that much in the DOM
    cy.get('#sidebar_tile_0')
      .find('[data-cy=song_title]')
      .should('have.text', song.title);

    // everything else only lives in storage, so verify the full submitted
    // record was persisted as entered
    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem('songs') ?? '{}');
      const saved = Object.values(stored)[0] as Record<string, unknown>;

      expect(saved).to.include({
        title: song.title,
        artist: song.artist,
        genre: song.genre,
        key: song.key,
        tempo: song.tempo,
        duration: song.minutes * 60 + song.seconds,
      });
      expect(saved.instrumentation).to.deep.equal([song.instrument]);
    });
  })
})