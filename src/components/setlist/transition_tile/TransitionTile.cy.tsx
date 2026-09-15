import { useForm, useWatch } from 'react-hook-form';

import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import type {
  TransitionField,
  TransitionTileProps,
} from '@/features/create_setlist/types/TileProps';
import TransitionTile from './TransitionTile';

describe('<TransitionTile>', () => {
  const makeField = (
    overrides: Partial<TransitionField> = {},
  ): TransitionField => ({
    id: 'row-t1',
    kind: 'transition',
    transitionId: 't1',
    notes: 'Key change to D',
    transitionTime: { minutes: 2, seconds: 15 },
    ...overrides,
  });

  type MountArgs = {
    field?: TransitionField;
    index?: number;
    onRemove?: TransitionTileProps['commonTileProps']['onRemove'];
  };

  const TestBed = ({
    field,
    index,
    onRemove,
  }: Required<MountArgs>) => {
    const { register, setValue, getValues, control } = useForm<FormValues>({
      defaultValues: {
        setlistName: 'Test setlist',
        setlist: Array.from({ length: index + 1 }, (_, i) =>
          i === index
            ? {
                kind: 'transition',
                transitionId: field.transitionId,
                notes: field.notes,
                transitionTime: field.transitionTime,
              }
            : { kind: 'song', songId: `song-${i}` },
        ),
      } as FormValues,
    });

    const commonTileProps: TransitionTileProps['commonTileProps'] = {
      register,
      setValue,
      getValues,
      control,
      onRemove,
    };

    // Mirrors the row's live form state so specs can assert that the
    // textarea / number inputs are actually wired through react-hook-form.
    const watched = useWatch({ control, name: `setlist.${index}` });

    return (
      <>
        <TransitionTile
          field={field}
          index={index}
          commonTileProps={commonTileProps}
        />
        <pre data-cy="form-state">{JSON.stringify(watched)}</pre>
      </>
    );
  };

  const mountTile = (args: MountArgs = {}) => {
    const field = args.field ?? makeField();
    const index = args.index ?? 0;
    const onRemove =
      args.onRemove ??
      (cy.stub().as('onRemove') as unknown as TransitionTileProps['commonTileProps']['onRemove']);

    cy.mount(<TestBed field={field} index={index} onRemove={onRemove} />);
  };

  // Minus is rendered before Plus inside each NumberInput row.
  const stepperButtons = (cyId: string) =>
    cy.getByData(cyId).parent().parent().find('button');

  it('renders the tile container and heading for the given index', () => {
    mountTile({ index: 0 });

    cy.getByData('transition-tile-0').should('be.visible');
    cy.getByData('transition-tile-0')
      .find('h1')
      .should('contain.text', 'Transition');
  });

  it('renders the notes textarea with its placeholder and existing notes', () => {
    mountTile({ field: makeField({ notes: 'Swap to acoustic guitar' }) });

    cy.getByData('notes-0')
      .should('have.value', 'Swap to acoustic guitar')
      .and('have.attr', 'placeholder')
      .and('match', /Add any notes here/);
  });

  it('renders an empty textarea when the transition has no notes', () => {
    mountTile({ field: makeField({ notes: '' }) });

    cy.getByData('notes-0').should('have.value', '');
  });

  it('writes edited notes back into the form', () => {
    mountTile({ field: makeField({ notes: '' }) });

    cy.getByData('notes-0').type('Hold for applause');

    cy.getByData('notes-0').should('have.value', 'Hold for applause');
    cy.getByData('form-state').should(
      'contain.text',
      '"notes":"Hold for applause"',
    );
  });

  it('calls onRemove with the tile index when the trash button is clicked', () => {
    mountTile({ index: 2 });

    cy.getByData('transition-tile-2').find('button').first().click();

    cy.get('@onRemove').should('have.been.calledOnceWith', 2);
  });

  it('seeds the minute and second inputs from transitionTime', () => {
    mountTile({ field: makeField({ transitionTime: { minutes: 4, seconds: 7 } }) });

    cy.getByData('minutes-tran-0').should('have.value', '4');
    cy.getByData('seconds-tran-0').should('have.value', '7');
  });

  it('increments minutes through the stepper and reflects it in the form', () => {
    mountTile({ field: makeField({ transitionTime: { minutes: 2, seconds: 15 } }) });

    stepperButtons('minutes-tran-0').last().click();

    cy.getByData('minutes-tran-0').should('have.value', '3');
    cy.getByData('form-state').should('contain.text', '"minutes":3');
  });

  it('decrements seconds through the stepper', () => {
    mountTile({ field: makeField({ transitionTime: { minutes: 2, seconds: 15 } }) });

    stepperButtons('seconds-tran-0').first().click();

    cy.getByData('seconds-tran-0').should('have.value', '14');
    cy.getByData('form-state').should('contain.text', '"seconds":14');
  });

  it('disables the minus button when a unit is already at 0', () => {
    mountTile({ field: makeField({ transitionTime: { minutes: 0, seconds: 30 } }) });

    stepperButtons('minutes-tran-0').first().should('be.disabled');
    stepperButtons('minutes-tran-0').last().should('be.enabled');
  });

  it('disables the plus button when a unit reaches 59', () => {
    mountTile({ field: makeField({ transitionTime: { minutes: 3, seconds: 59 } }) });

    stepperButtons('seconds-tran-0').last().should('be.disabled');
    stepperButtons('seconds-tran-0').first().should('be.enabled');
  });

  it('namespaces every data-cy hook by the tile index', () => {
    mountTile({ index: 3 });

    cy.getByData('transition-tile-3').should('exist');
    cy.getByData('notes-3').should('exist');
    cy.getByData('minutes-tran-3').should('exist');
    cy.getByData('seconds-tran-3').should('exist');
  });

  it('does not render a drop indicator when nothing is being dragged', () => {
    mountTile();

    cy.getByData('drop-edge').should('not.exist');
  });
});
