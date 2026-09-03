import { useForm } from 'react-hook-form';

import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import Setlist from './Setlist';
import type { SetlistProps } from './Setlist';
import FiltersProvider from '@/context/filters/FiltersProvider';

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
        getSongDisplayDetails: cy.stub().returns(mockDetails),
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
            isValid
            setlistInsert={cy.stub() as never}
            {...extraProps}
          />
        </FiltersProvider>
      );
    };

    cy.mount(<TestBed />);
  };

  it('mounts and shows the list when tiles.length > 0', () => {
    // const mockClick = cy.stub();
    // const mockRemove = cy.stub();
    // const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    // const mockSet = cy.stub();
    // const mockGet = cy.stub();
    // const mockControl =
    //   {} as unknown as SetlistProps['commonTileProps']['control'];
    // const mockErrors = {};

    // const mockCommon: SetlistProps['commonTileProps'] = {
    //   register: mockRegister,
    //   getSongDisplayDetails: mockGetSongDisplayDetails,
    //   onClick: mockClick,
    //   onRemove: mockRemove,
    //   setValue: mockSet,
    //   getValues: mockGet,
    //   control: mockControl,
    // };

    // cy.mount(
    //   <FiltersProvider>
    //     <Setlist
    //       tiles={tiles}
    //       commonTileProps={mockCommon}
    //       setlistDuration={5}
    //       errors={mockErrors}
    //       isValid={true}
    //       setlistInsert={cy.stub() as unknown as SetlistProps['setlistInsert']}
    //     />
    //   </FiltersProvider>,
    // );

    const onClick = cy.stub().as('onClick');
    const onRemove = cy.stub().as('onRemove');

    mountSetlist(tiles, { onClick, onRemove });

    cy.get('[data-cy=list]');
    cy.get('[data-cy=fallback-title]').should('not.exist');
    cy.getByData('list')
      .find('[data-cy^="setlist-tile-"]')
      .should('have.length', 2);
  });

  it('shows the fallback when tiles is an empty array', () => {
    const mockClick = cy.stub();
    const mockRemove = cy.stub();
    const mockGetSongDisplayDetails = cy.stub().returns(mockDetails);
    const mockSet = cy.stub();
    const mockGet = cy.stub();
    const mockControl =
      {} as unknown as SetlistProps['commonTileProps']['control'];
    const mockErrors = {};

    const mockCommon: SetlistProps['commonTileProps'] = {
      register: mockRegister,
      getSongDisplayDetails: mockGetSongDisplayDetails,
      onClick: mockClick,
      onRemove: mockRemove,
      setValue: mockSet,
      getValues: mockGet,
      control: mockControl,
    };

    cy.mount(
      <FiltersProvider>
        <Setlist
          tiles={[]}
          commonTileProps={mockCommon}
          setlistDuration={10}
          errors={mockErrors}
          isValid={false}
          setlistInsert={cy.stub() as unknown as SetlistProps['setlistInsert']}
        />
      </FiltersProvider>,
    );

    cy.get('[data-cy=list]').should('not.exist');
    cy.get('[data-cy=setlist-fallback');
    cy.get('[data-cy=fallback-title]')
      .should('be.visible')
      .and('contain.text', 'Drag songs from your library to make a setlist.');
  });
});
