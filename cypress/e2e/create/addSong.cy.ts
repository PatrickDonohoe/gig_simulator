describe('adding song to library', () => {
  it('loads the page with the modal closed', () => {
    cy.visit('/dash/create');
    cy.get('#song_form').should('not.exist');
  });

  it('navigates to the add song modal as route when the "add song +" button is clicked', () => {
    cy.visit('/dash/create');
    cy.get('#sidebar-header-button').click();
    cy.url().should('include', 'add-song');
  });

  it("allows user input into the form's searchbar and submits", () => {
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

    cy.intercept('GET', 'https://api.reccobeats.com/v1/track/search*', {
      fixture: 'searchResults.json',
    }).as('searchTracks');

    cy.visit('/dash/create');
    cy.get('#sidebar-header-button').click();
    cy.url().should('include', 'add-song');
    cy.get('p').should(
      'contain.text',
      'Search for a song by title to get started.',
    );
    cy.get('#title').type(song.title);
    cy.get('#search-submit').click();
    cy.get('#song-searchbar').submit();

    // 1. The argument reached handleSearch -> URL params
    cy.location('search').should('include', `searchText=${song.title}`);

    // 2. The argument reached the API call
    cy.wait('@searchTracks')
      .its('request.url')
      .then((url) => {
        expect(new URL(url).searchParams.get('searchText')).to.eq(song.title);
      });
  });

  it('loads results when the searchbar input is submitted and results were returned from the db', () => {
    cy.intercept('GET', 'https://api.reccobeats.com/v1/track/search*', {
      fixture: 'searchResults.json',
    }).as('searchTracks');

    cy.visit('/dash/create/add-song?searchText=sonata&sort=asc');
    cy.get('#search-results').should('exist');
  });

  context('md breakpoint and above', () => {
    beforeEach(() => {
      cy.viewport('ipad-2'); // tailwind's md breakpoint
      cy.intercept('GET', 'https://api.reccobeats.com/v1/track/search*', {
        fixture: 'searchResults.json',  
    }).as('searchTracks');
    cy.visit('/dash/create/add-song?searchText=sonata');
    cy.wait('@searchTracks');
  });
    it('shows results as a table when the viewport is above a medium breakpoint', () => {
      cy.get('#results-table-component').should('be.visible');
      cy.get('#stacked-cards').should('not.be.visible');
      cy.get('#86f86f5b-8af6-448c-9eea-a9d1ee1ccdf1-title').should('have.text', 'Sonata');
      cy.get('#87736318-4ea6-47e3-a799-d76ad6a796ed-artists').should('have.text', 'Adalberto junior Gómez galvis, et al.');
      cy.get('#87736318-4ea6-47e3-a799-d76ad6a796ed-durationSec').should('have.text', '03:40');
    });
  });

  context('below md breakpoint', () => {
    beforeEach(() => {
      cy.viewport('iphone-x'); // below tailwind's md breakpoint
      cy.intercept('GET', 'https://api.reccobeats.com/v1/track/search*', {
        fixture: 'searchResults.json',
      }).as('searchTracks');
      cy.visit('/dash/create/add-song?searchText=sonata');
      cy.wait('@searchTracks');        
    });
    it('shows results as a set of stacked cards when the viewport is below a medium breakpoint', () => {
      cy.get('#stacked-cards').should('be.visible');
    })
  })

  it(
    'shows no results found when the db does not return any results upon searchbar submit',
  );

  it('loads the song form upon selection of a search result');

  // cy.get('#song_form').within(() => {
  //   cy.getByData('input-title').type(song.title);
  //   cy.getByData('input-artist').type(song.artist);
  //   cy.getByData('input-genre').type(song.genre);
  //   cy.getByData('input-key').type(song.key);
  //   cy.getByData('input-tempo').type(song.tempo);
  //   cy.get('#duration-minutes').type(String(song.minutes));
  //   cy.get('#duration-seconds').type(String(song.seconds));
  //   cy.get('#instrument-0').type(song.instrument);
  //   cy.getByData('submit_button').click();
  // });
  // cy.get('#song_form').should('not.exist');

  // the tile only renders title + duration, so check that much in the DOM
  // cy.getByData('tile')
  //   .find('[data-cy=song_title]')
  //   .should('have.text', song.title);

  // // everything else only lives in storage, so verify the full submitted
  // // record was persisted as entered
  // cy.window().then((win) => {
  //   const stored = JSON.parse(win.localStorage.getItem('songs') ?? '{}');
  //   const saved = Object.values(stored)[0] as Record<string, unknown>;

  //   expect(saved).to.include({
  //     title: song.title,
  //     artist: song.artist,
  //     genre: song.genre,
  //     key: song.key,
  //     tempo: Number(song.tempo),
  //     duration: song.minutes * 60 + song.seconds,
  //   });
  //   expect(saved.instrumentation).to.deep.equal([song.instrument]);
  // });
});
