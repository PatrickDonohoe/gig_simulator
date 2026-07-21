import type { SubmitEvent } from 'react';

import AddSongForm, { type AddSongFormProps } from './AddSongForm';

describe('<AddSongForm>', () => {
  const mockRegister = (() => ({})) as unknown as AddSongFormProps['register'];

  const buildProps = (
    overrides: Partial<AddSongFormProps> = {},
  ): AddSongFormProps => ({
    register: mockRegister,
    errors: {},
    isSubmitting: false,
    instrumentationFields: [{ id: 'field-1', value: '' }],
    appendInstrumentation:
      overrides.appendInstrumentation ?? cy.stub().as('appendInstrumentation'),
    removeInstrumentation:
      overrides.removeInstrumentation ?? cy.stub().as('removeInstrumentation'),
    submitAddSong: overrides.submitAddSong ?? cy.stub().as('submitAddSong'),
    addSongError: null,
    handleIsAddSong:
      overrides.handleIsAddSong ?? cy.stub().as('handleIsAddSong'),
    ...overrides,
  });

  it('mounts and displays hard-coded text', () => {
    cy.mount(<AddSongForm {...buildProps()} />);

    cy.get('[data-cy=song_form]').should('be.visible');
    cy.get('[data-cy=new_song]')
      .should('be.visible')
      .and('contain.text', 'Add a new song to your library');
    cy.get('[data-cy=submit_button]')
      .should('be.visible')
      .and('contain.text', 'Add Song +');
  });

  it('shows appropriate text and behavior when submitting', () => {
    cy.mount(<AddSongForm {...buildProps({ isSubmitting: true })} />);

    cy.get('[data-cy=submit_button]').should('be.disabled');
    cy.get('[data-cy=submit_button]')
      .should('be.visible')
      .and('contain.text', 'Adding...');
  });

  it('enables the submit button when not submitting', () => {
    cy.mount(<AddSongForm {...buildProps({ isSubmitting: false })} />);

    cy.get('[data-cy=submit_button]').should('not.be.disabled');
  });

  it('shows a submission error when addSongError is of type string', () => {
    const errorText: string = 'Encountered an error adding your song';
    cy.mount(<AddSongForm {...buildProps({ addSongError: errorText })} />);

    cy.getByData('song_error')
      .should('be.visible')
      .and('contain.text', errorText);
  });

  it('calls the submit function when the submit button is clicked.', () => {
    const submitAddSong = cy
    .stub()
    .callsFake((e: SubmitEvent) => e.preventDefault())
    .as('submitAddSong');
    cy.mount(<AddSongForm {...buildProps({ submitAddSong })} />);

    cy.getByData('submit_button').click();

    cy.get('@submitAddSong').should('have.been.calledOnce');
  });
});
