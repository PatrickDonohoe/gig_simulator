import type { UseFormRegister } from 'react-hook-form';

import Setlist from './Setlist';
import type { TileProps } from '../SetlistTile/SetlistTile';
import type { FormValues } from '../../hooks/useSetlist';

describe('<Setlist>', () => {
  const mockRegister = (() => ({})) as unknown as UseFormRegister<FormValues>;

  const mockDetails = {
    id: 'song-123',
    title: 'Mock Song Title',
    artist: 'Mock Artist',
    genre: 'rock',
    key: 'C',
    tempo: '132',
    duration: 330,
    instrumentation: [
      'drumset',
      'electric bass',
      'electric guitar',
      'acoustic guitar',
    ],
  };

  it('mounts and shows the list when tiles.length > 0', () => {
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);

    const tiles: TileProps[] = [
      {
        field: {
          id: 'row-1',
          songId: 'song-123',
          notes: 'Opener',
          transitionTime: { minutes: 1, seconds: 30 },
        },
        register: mockRegister,
        getSongDisplayDetails: mockGetSongDisplayDetails,
        metaFilters: ['duration', 'genre'],
      },
      {
        field: {
          id: 'row-2',
          songId: 'song-234',
          notes: '',
          transitionTime: { minutes: 0, seconds: 0 },
        },
        register: mockRegister,
        getSongDisplayDetails: mockGetSongDisplayDetails,
        metaFilters: ['artist', 'instrumentation'],
      },
    ];

    cy.mount(<Setlist tiles={tiles} />);

    cy.get('[data-cy=list]');
    cy.get('[data-cy=fallback-title]').should('not.exist');
    cy.get('[data-cy=tile').should('have.length', 2);
  });

  it('shows the fallback when tiles is an empty array', () => {
    cy.mount(<Setlist tiles={[]} />);

    cy.get('[data-cy=list]').should('not.exist');
    cy.get('[data-cy=setlist-fallback');
    cy.get('[data-cy=fallback-title]')
      .should('be.visible')
      .and('contain.text', 'Drag songs from your library to make a setlist.');
  });
});
