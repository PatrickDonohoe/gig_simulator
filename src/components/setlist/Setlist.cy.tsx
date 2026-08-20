import Setlist from './Setlist';
import type { SetlistProps } from './Setlist';

describe('<Setlist>', () => {
  const mockRegister =
    (() => ({})) as unknown as SetlistProps['commonTileProps']['register'];

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
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    const mockCommon: SetlistProps['commonTileProps'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      onClick: mockClick,
      onRemove: mockRemove,
      setValue: mockSet,
      getValues: mockGet,
    };

    const tiles: SetlistProps['tiles'] = [
      {
        id: 'row-1',
        songId: 'song-123',
        notes: 'Opener',
        transitionTime: { minutes: 1, seconds: 30 },
      },
      {
        id: 'row-2',
        songId: 'song-234',
        notes: '',
        transitionTime: { minutes: 0, seconds: 0 },
      },
    ];

    cy.mount(
      <Setlist
        tiles={tiles}
        commonTileProps={mockCommon}
        setlistDuration={5}
      />,
    );

    cy.get('[data-cy=list]');
    cy.get('[data-cy=fallback-title]').should('not.exist');
    cy.get('[data-cy=tile').should('have.length', 2);
  });

  it('shows the fallback when tiles is an empty array', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    const mockCommon: SetlistProps['commonTileProps'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      onClick: mockClick,
      onRemove: mockRemove,
      setValue: mockSet,
      getValues: mockGet,
    };

    cy.mount(
      <Setlist tiles={[]} commonTileProps={mockCommon} setlistDuration={10} />,
    );

    cy.get('[data-cy=list]').should('not.exist');
    cy.get('[data-cy=setlist-fallback');
    cy.get('[data-cy=fallback-title]')
      .should('be.visible')
      .and('contain.text', 'Drag songs from your library to make a setlist.');
  });
});
