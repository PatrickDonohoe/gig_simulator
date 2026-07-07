import { useForm, useFieldArray } from 'react-hook-form';

import SetlistTile, { type SetlistTileProps } from './SetlistTile';
import type { FormValues } from '../../hooks/useSetlist';

// Local wrapper to inject RHF tools
const SetlistTileWrapper = (props: {
  getSongDisplayDetails: SetlistTileProps['getSongDisplayDetails'];
  metaFilters: SetlistTileProps['metaFilters'];
}) => {
  const { register, control } = useForm<FormValues>({
    defaultValues: {
      setlist: [
        {
          songId: 'song-123',
          transitionTime: { minutes: 1, seconds: 30 },
          notes: 'Opener',
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'setlist',
  });

  return (
    <SetlistTile
      field={fields[0]}
      index={0}
      register={register}
      getSongDisplayDetails={props.getSongDisplayDetails}
      metaFilters={props.metaFilters}
    />
  );
};

describe('<SetlistTile>', () => {
  it('mounts and renders form fields', () => {
    // mocking the standard function prop
    const mockGetSongDisplayDetails = cy.stub().returns({
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
    });

    // Passing simple mock arrays and the stubbed functions into the wrapper
    cy.mount(
      <SetlistTileWrapper
        getSongDisplayDetails={mockGetSongDisplayDetails}
        metaFilters={[
          'duration',
          'genre',
          'tempo',
          'instrumentation',
          'artist',
        ]}
      />,
    );

    // verifying it works
    cy.get('input').should('exist');
    cy.get('[data-cy=notes]').should('have.text', 'Opener');
    cy.get('[data-cy=min_tran]').should('have.value', '1');
    cy.get('[data-cy=sec_tran]').should('have.value', '30');
    cy.get('h2').should('be.visible').and('contain.text', 'Enter a custom transition time if different from the default.');
  });
});
