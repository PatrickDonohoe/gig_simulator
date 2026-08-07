import WorkspaceSidebar from './WorkspaceSidebar';
import type { SetlistProps } from '../setlist/Setlist';

describe('<WorkspaceSidebar>', () => {
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

  const mockRegister =
    (() => ({})) as unknown as SetlistProps['commonTileProps']['register'];

  it('mounts and shows the headers.', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockHandle = cy.stub();
    const mockReset = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    const mockCommon: SetlistProps['commonTileProps'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      activeFilters: ['duration', 'genre'],
      onClick: mockClick,
      onRemove: mockRemove,
      handleFilter: mockHandle,
      resetFilters: mockReset,
      setValue: mockSet,
      getValues: mockGet,
    };

    cy.mount(<WorkspaceSidebar tiles={tiles} common={mockCommon} />);

    cy.get('[data-cy=h1').should('be.visible').and('contain.text', 'Workspace');
    cy.get('[data-cy=h2')
      .should('be.visible')
      .and('contain.text', 'Choose a song, and drag it to your setlist.');
  });

  it('displays SidebarTiles if tiles.length > 0', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockHandle = cy.stub();
    const mockReset = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    const mockCommon: SetlistProps['commonTileProps'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      activeFilters: ['duration', 'genre'],
      onClick: mockClick,
      onRemove: mockRemove,
      handleFilter: mockHandle,
      resetFilters: mockReset,
      setValue: mockSet,
      getValues: mockGet,
    };

    cy.mount(<WorkspaceSidebar tiles={tiles} common={mockCommon} />);

    cy.get('[data-cy=tile]').should('be.visible');
  });
});
