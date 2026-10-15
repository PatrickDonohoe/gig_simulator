import ModalBackdrop from './ModalBackdrop';
import AddSongForm, {
  type AddSongFormProps,
} from '@/components/add_song/AddSongForm';

describe('<ModalBackdrop>', () => {
  it('mounts and shows a background color', () => {
    const mockClose = cy.stub();

    const mockRegister =
      (() => ({})) as unknown as AddSongFormProps['register'];

    const mockProps: AddSongFormProps = {
      isSubmitting: false,
      errors: {},
      addSongError: null,
      title: 'title',
      submitLabel: 'Add Song +',
      register: mockRegister,
      submitAddSong: cy.stub(),
      setFocus: cy.stub().as('setFocus'),
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
