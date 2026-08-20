import { useForm, useFieldArray } from 'react-hook-form';

import SetlistSongTile from './SetlistSongTile';
import type { SetlistSongTileProps } from './SetlistSongTile';
import type { FormValues } from '../../../../hooks/use_setlist/useSetlist';

// Local wrapper to inject RHF tools
const SetlistSongTileWrapper = (props: {
  getSongDisplayDetails: SetlistSongTileProps['commonTileProps']['getSongDisplayDetails'];
  onRemove: SetlistSongTileProps['commonTileProps']['onRemove'];
  onClick: SetlistSongTileProps['commonTileProps']['onClick'];
  setValue: SetlistSongTileProps['commonTileProps']['setValue'];
  getValues: SetlistSongTileProps['commonTileProps']['getValues'];
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
    <SetlistSongTile
      field={fields[0]}
      index={0}
      commonTileProps={{
        register,
        getSongDisplayDetails: props.getSongDisplayDetails,
        onClick: props.onClick,
        onRemove: props.onRemove,
        setValue: props.setValue,
        getValues: props.getValues,
      }}
    />
  );
};

describe('<SetlistSongTile>', () => {
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
    const mockSet = cy.stub();
    const mockGet = cy.stub();

    // Passing simple mock arrays and the stubbed functions into the wrapper
    cy.mount(
      <SetlistSongTileWrapper
        getSongDisplayDetails={mockGetSongDisplayDetails}
        onRemove={mockRemove}
        onClick={mockClick}
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
