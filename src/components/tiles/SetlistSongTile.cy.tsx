import { MemoryRouter } from 'react-router';

import SetlistSongTile from '@/components/tiles/SetlistSongTile';
import type { SongTileProps } from '@/features/create_setlist/types/TileProps';
import FiltersProvider from '@/context/filters/FiltersProvider';
import type { SongField } from '@/features/create_setlist/types/TileProps';

// Local wrapper to inject RHF tools
const SetlistSongTileWrapper = (props: {
  getSongData: SongTileProps['commonTileProps']['getSongData'];
  onRemove: SongTileProps['commonTileProps']['onRemove'];
}) => {
  // const { fields } = useFieldArray({
  //   control,
  //   name: 'setlist',
  // });

  const field: SongField = { kind: 'song', songId: 'song-123', id: '0' };

  return (
    <MemoryRouter>
      <SetlistSongTile
        field={field}
        index={0}
        commonTileProps={{
          getSongData: props.getSongData,
          onRemove: props.onRemove,
        }}
      />
    </MemoryRouter>
  );
};

describe('<SetlistSongTile>', () => {
  it('mounts and renders song data', () => {
    // mocking the standard function prop
    const mockGetSongData = cy.stub().returns({
      id: 'song-123',
      title: 'Mock Song Title',
      artist: 'Mock Artist',
      genre: 'rock',
      key: 'C',
      tempo: 132,
      duration: 330,
    });

    const mockRemove = cy.stub();

    // Passing simple mock arrays and the stubbed functions into the wrapper
    cy.mount(
      <FiltersProvider>
        <SetlistSongTileWrapper
          getSongData={mockGetSongData}
          onRemove={mockRemove}
        />
      </FiltersProvider>,
    );

    // verifying it works
    cy.get('h2').should('be.visible').and('contain.text', 'Mock Song Title');
  });
  // it('displays ');
});
