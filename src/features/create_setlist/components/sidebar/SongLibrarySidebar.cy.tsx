import { MemoryRouter } from 'react-router';

import SongLibrarySidebar from './SongLibrarySidebar';
import type { SongType } from '@/types/SongType';

describe('<SongLibrarySidebar>', () => {
  const songs: SongType[] = [
    {
      id: 'song-123',
      title: 'Mock Song Title',
      artists: 'Mock Artist',
      key: 'C',
      mode: 'major',
      tempo: 132,
      duration: 330,
      instrumentation: ['drumset', 'electric bass'],
    },
    {
      id: 'song-234',
      title: 'Another Song',
      artists: 'Someone',
      key: 'G',
      mode: 'minor',
      tempo: 100,
      duration: 200,
      instrumentation: [],
    },
  ];

  it('mounts and shows the headers.', () => {
    cy.mount(
      <MemoryRouter>
        <SongLibrarySidebar songs={songs} />
      </MemoryRouter>,
    );

    cy.get('[data-cy=h1').should('be.visible').and('contain.text', 'Workspace');
    cy.get('[data-cy=h2')
      .should('be.visible')
      .and('contain.text', 'Choose a song, and drag it to your setlist.');
  });

  it('renders a tile per library song', () => {
    cy.mount(
      <MemoryRouter>
        <SongLibrarySidebar songs={songs} />
      </MemoryRouter>,
    );

    cy.get('[data-cy=tile]').should('have.length', 2);
  });
});
