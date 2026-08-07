import { useForm, useFieldArray } from 'react-hook-form';

import SetlistTile from './SetlistTile';
import type { SetlistTileProps } from './SetlistTile';
import type { FormValues } from '../../hooks/useSetlist';

// Local wrapper to inject RHF tools
const SetlistTileWrapper = (props: {
  getSongDisplayDetails: SetlistTileProps['commonTileProps']['getSongDisplayDetails'];
  activeFilters: SetlistTileProps['commonTileProps']['activeFilters'];
  onRemove: SetlistTileProps['commonTileProps']['onRemove'];
  onClick: SetlistTileProps['commonTileProps']['onClick'];
  resetFilters: SetlistTileProps['commonTileProps']['resetFilters'];
  handleFilter: SetlistTileProps['commonTileProps']['handleFilter'];
  setValue: SetlistTileProps['commonTileProps']['setValue'];
  getValues: SetlistTileProps['commonTileProps']['getValues'];
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
      commonTileProps={{
        register,
        getSongDisplayDetails: props.getSongDisplayDetails,
        activeFilters: props.activeFilters,
        onClick: props.onClick,
        onRemove: props.onRemove,
        handleFilter: props.handleFilter,
        resetFilters: props.resetFilters,
        setValue: props.setValue,
        getValues: props.getValues,
      }}
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

    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockHandle = cy.stub();
    const mockReset = cy.stub();
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    // Passing simple mock arrays and the stubbed functions into the wrapper
    cy.mount(
      <SetlistTileWrapper
        getSongDisplayDetails={mockGetSongDisplayDetails}
        activeFilters={[
          'duration',
          'genre',
          'tempo',
          'instrumentation',
          'artist',
        ]}
        onRemove={mockRemove}
        onClick={mockClick}
        handleFilter={mockHandle}
        resetFilters={mockReset}
        setValue={mockSet}
        getValues={mockGet}
      />,
    );

    // verifying it works
    cy.get('input').should('exist');
    cy.get('[data-cy=notes]').should('have.text', 'Opener');
    cy.get('[data-cy=minutes_tran]').should('have.value', '1');
    cy.get('[data-cy=seconds_tran]').should('have.value', '30');
    cy.get('h2')
      .should('be.visible')
      .and(
        'contain.text',
        'Enter a custom transition time if different from the default.',
      );
  });
  // it('displays ');
});
