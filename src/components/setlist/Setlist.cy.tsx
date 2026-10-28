import { useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router';

import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import Setlist from './Setlist';
import type { SetlistProps } from './Setlist';
import FiltersProvider from '@/context/filters/FiltersProvider';

describe('<Setlist>', () => {
  const mockDetails = {
    id: 'song-123',
    title: 'Mock Song Title',
    artist: 'Mock Artist',
    genre: 'rock',
    key: 'C',
    tempo: 132,
    duration: 330,
  };

  const tiles: SetlistProps['tiles'] = [
    {
      id: 'row-1',
      kind: 'song',
      songId: 'song-123',
    },
    {
      id: 'row-t1',
      kind: 'transition',
      transitionId: 't1',
      notes: 'Opener',
      transitionTime: { minutes: 1, seconds: 30 },
    },
    {
      id: 'row-2',
      kind: 'song',
      songId: 'song-234',
    },
    {
      id: 'row-t2',
      kind: 'transition',
      transitionId: 't2',
      notes: '',
      transitionTime: { minutes: 0, seconds: 0 },
    },
  ];

  // const mockDefaults

  const mountSetlist = (
    tiles: SetlistProps['tiles'],
    commonOverrides: Partial<SetlistProps['commonTileProps']> = {},
    extraProps: Partial<SetlistProps> = {},
  ) => {
    const TestBed = () => {
      const { register, setValue, getValues, control } = useForm<FormValues>({
        defaultValues: {
          setlist: [
            {},
            { transitionTime: { minutes: 1, seconds: 30 } },
            {},
            { transitionTime: { seconds: 0 } },
          ],
        },
      });

      const commonTileProps: SetlistProps['commonTileProps'] = {
        register,
        setValue,
        getValues,
        control,
        getSongData: cy.stub().returns(mockDetails),
        onClick: cy.stub(),
        onRemove: cy.stub(),
        ...commonOverrides,
      };

      return (
        <FiltersProvider>
          <Setlist
            tiles={tiles}
            commonTileProps={commonTileProps}
            setlistDuration={5}
            errors={{}}
            isDirty
            submitLabel="Submit"
            setlistInsert={cy.stub() as never}
            {...extraProps}
          />
        </FiltersProvider>
      );
    };

    cy.mount(
      <MemoryRouter>
        <TestBed />
      </MemoryRouter>,
    );
  };

  it('mounts and shows the list when tiles.length > 0', () => {
    const onClick = cy.stub().as('onClick');
    const onRemove = cy.stub().as('onRemove');

    mountSetlist(tiles, { onClick, onRemove });

    cy.get('[data-cy=list]');
    cy.get('[data-cy=fallback-title]').should('not.exist');
    cy.getByData('list').find('[id^="setlist-tile-"]').should('have.length', 2);
  });
});
