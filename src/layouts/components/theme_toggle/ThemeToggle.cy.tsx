import { useState } from 'react';

import {
  ThemeContext,
  type ThemeContextType,
} from '@/context/theme/ThemeContext';
import ThemeToggle from '@/layouts/components/theme_toggle/ThemeToggle';

const mountWithTheme = (overrides: Partial<ThemeContextType> = {}) => {
  const value: ThemeContextType = {
    theme: 'light',
    resolvedTheme: 'light',
    handleTheme: cy.stub().as('handleTheme'),
    ...overrides,
  };

  cy.mount(
    <ThemeContext.Provider value={value}>
      <ThemeToggle />
    </ThemeContext.Provider>,
  );
};

const StatefulThemeToggle = ({
  initial,
}: {
  initial: ThemeContextType['resolvedTheme'];
}) => {
  const [resolvedTheme, setResolvedTheme] = useState(initial);
  const value: ThemeContextType = {
    theme: resolvedTheme,
    resolvedTheme,
    handleTheme: (t) => setResolvedTheme(t as typeof resolvedTheme),
  };
  return (
    <ThemeContext.Provider value={value}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
};

describe('<ThemeToggle>', () => {
  it('calls handleTheme and changes theme when clicked', () => {
    mountWithTheme({ resolvedTheme: 'light' });

    cy.getByData('button').click();

    cy.get('@handleTheme').should('have.been.calledOnceWith', 'dark');
  });

  it('shows the moon icon when the theme is dark', () => {
    mountWithTheme({ resolvedTheme: 'dark' });

    cy.getByData('moon').should('have.css', 'opacity', '1');
    cy.getByData('sun').should('have.css', 'opacity', '0');
  });

  it('shows the sun icon when the theme is light', () => {
    mountWithTheme({ resolvedTheme: 'light' });

    cy.getByData('sun').should('have.css', 'opacity', '1');
    cy.getByData('moon').should('have.css', 'opacity', '0');
  });

  it('changes the visible icon after click', () => {
    cy.mount(<StatefulThemeToggle initial="light" />);

    cy.getByData('button').click();

    cy.getByData('moon').should('be.visible').and('have.css', 'opacity', '1');
  });
});
