import LibraryListRow from '@/features/songs_library/components/library_view/list_view/list_row/LibraryListRow';
import type { SongType } from '@/types/SongType';

describe('<LibraryListRow>', () => {
  const mockSong: SongType = {
    id: '1',
    title: 'Song One',
    artist: 'Artist One',
    genre: 'Rock',
    key: 'C',
    tempo: 120,
    duration: 180,
    instrumentation: [],
  };

  it('displays the correct number of columns', () => {
    cy.mount(<LibraryListRow song={mockSong} onSelect={cy.stub()} />);

    cy.get('#list-row-1').find('[id^="cell-1-"]').should('have.length', 6);
  });

  it('displays the corresponding text for its column', () => {
    cy.mount(<LibraryListRow song={mockSong} onSelect={cy.stub()} />);

    cy.get('#cell-1-title').should('contain.text', 'Song One');
    cy.get('#cell-1-genre').should('contain.text', 'Rock');
  });

  it('calls onSelect when the row is clicked', () => {
    cy.mount(
      <LibraryListRow song={mockSong} onSelect={cy.stub().as('onSelect')} />,
    );

    cy.get('#list-row-1').click();
    cy.get('@onSelect').should('have.been.calledOnce');
  });
});
