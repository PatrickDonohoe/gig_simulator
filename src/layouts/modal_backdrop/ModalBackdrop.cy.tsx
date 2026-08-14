import ModalBackdrop from './ModalBackdrop';
import AddSongForm, {
  type AddSongFormProps,
} from '@/features/create_setlist/components/add_song/AddSongForm';

describe('<ModalBackdrop>', () => {
  it('mounts and shows a background color', () => {
    const mockClose = cy.stub();

    const mockRegister =
      (() => ({})) as unknown as AddSongFormProps['register'];

    const mockProps: AddSongFormProps = {
      register: mockRegister,
      errors: {},
      isSubmitting: false,
      instrumentationFields: [{ id: 'field-1', value: '' }],
      appendInstrumentation: cy.stub(),
      removeInstrumentation: cy.stub(),
      submitAddSong: cy.stub(),
      addSongError: null,
      handleIsAddSong: cy.stub().as('handleIsAddSong'),
    };

    cy.mount(
      <ModalBackdrop handleClose={mockClose}>
        <AddSongForm {...mockProps} />
      </ModalBackdrop>,
    );

    cy.get('[data-cy=modal_layout]');
    cy.get('[data-cy=centering_div_ML]');
    cy.get('[data-cy=modal_layout]').should(
      'have.css',
      'color',
      'rgb(0, 0, 0)',
    );
  });
});
