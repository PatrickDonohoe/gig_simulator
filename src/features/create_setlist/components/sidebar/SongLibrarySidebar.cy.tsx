import SongLibrarySidebar from './SongLibrarySidebar';
import type { SongType } from '@/types/SongType';

describe('<SongLibrarySidebar>', () => {
  const songs: SongType[] = [
    {
      id: 'song-123',
      title: 'Mock Song Title',
      artist: 'Mock Artist',
      genre: 'rock',
      key: 'C',
      tempo: '132',
      duration: 330,
      instrumentation: ['drumset', 'electric bass'],
    },
    {
      id: 'song-234',
      title: 'Another Song',
      artist: 'Someone',
      genre: 'pop',
      key: 'G',
      tempo: '100',
      duration: 200,
      instrumentation: [],
    },
  ];

  it('mounts and shows the headers.', () => {
    cy.mount(<SongLibrarySidebar songs={songs} onAddSong={cy.stub()} />);

    cy.get('[data-cy=h1').should('be.visible').and('contain.text', 'Workspace');
    cy.get('[data-cy=h2')
      .should('be.visible')
      .and('contain.text', 'Choose a song, and drag it to your setlist.');
  });

  it('renders a tile per library song', () => {
    cy.mount(<SongLibrarySidebar songs={songs} onAddSong={cy.stub()} />);

    cy.get('[data-cy=tile]').should('have.length', 2);
  });
});
