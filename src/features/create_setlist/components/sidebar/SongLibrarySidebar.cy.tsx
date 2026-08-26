import SongLibrarySidebar, { type SongLibrarySidebarProps } from './SongLibrarySidebar';
import type { SetlistProps } from '../../../../components/setlist/Setlist';

describe('<SongLibrarySidebar>', () => {
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
    (() => ({})) as unknown as SongLibrarySidebarProps['common']['register'];

  it('mounts and shows the headers.', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();
    const mockWatch = cy.stub();

    const mockCommon: SongLibrarySidebarProps['common'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      onClick: mockClick,
      onRemove: mockRemove,
      setValue: mockSet,
      getValues: mockGet,
      watch: mockWatch,
    };

    cy.mount(<SongLibrarySidebar tiles={tiles} common={mockCommon} />);

    cy.get('[data-cy=h1').should('be.visible').and('contain.text', 'Workspace');
    cy.get('[data-cy=h2')
      .should('be.visible')
      .and('contain.text', 'Choose a song, and drag it to your setlist.');
  });

  it('displays SongLibraryTiles if tiles.length > 0', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();
    const mockWatch = cy.stub();

    const mockCommon: SongLibrarySidebarProps['common'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      onClick: mockClick,
      onRemove: mockRemove,
      setValue: mockSet,
      getValues: mockGet,
      watch: mockWatch,
    };

    cy.mount(<SongLibrarySidebar tiles={tiles} common={mockCommon} />);

    cy.get('[data-cy=tile]').should('be.visible');
  });
});
