/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'warn',
      comment: 'This dependency is part of a circular relationship.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'This module is not imported anywhere and is likely dead code.',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|cts|mts|json)$', // dotfiles
          '\\.d\\.ts$',
          '(^|/)tsconfig\\.[^/]+\\.json$',
          '(^|/)(vite|vitest)\\.config\\.[^/]+$',
          '(^|/)src/main\\.tsx$',
        ],
      },
      to: {},
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      comment: 'This module depends on something that cannot be resolved.',
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: 'no-dev-dep-in-src',
      severity: 'error',
      comment: 'Production source is importing a devDependency.',
      from: { path: '^src/', pathNot: '\\.(spec|test|cy)\\.(js|ts|tsx)$' },
      to: {
        dependencyTypes: ['npm-dev'],
        pathNot: ['node_modules/@types/'],
      },
    },
  ],

  options: {
    doNotFollow: { path: 'node_modules' },

    // keep tests / cypress / storybook-ish files out of the graph
    exclude: {
      path: [
        '\\.(spec|test|cy)\\.(js|ts|tsx)$',
        '(^|/)cypress/',
        '(^|/)__(tests|mocks)__/',
        '(^|/)vitest\\.setup\\.ts$',
      ],
    },

    tsPreCompilationDeps: true, // include type-only imports
    tsConfig: { fileName: 'tsconfig.app.json' }, // resolves @/* etc.

    enhancedResolveOptions: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      mainFields: ['module', 'main', 'types', 'typings'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
    },

    reporterOptions: {
      dot: {
        collapsePattern: '^src/(features|components|hooks|utils|layouts)/[^/]+',
        theme: {
          graph: { rankdir: 'LR', splines: 'ortho' },
          modules: [
            {
              criteria: { source: '^src/features/' },
              attributes: { fillcolor: '#c9e7ff' },
            },
            {
              criteria: { source: '^src/components/' },
              attributes: { fillcolor: '#d8f0d8' },
            },
            {
              criteria: { source: '^src/hooks/' },
              attributes: { fillcolor: '#ffe9c9' },
            },
          ],
        },
      },
      archi: {
        collapsePattern: '^src/(features|components|hooks|utils|layouts)/[^/]+',
      },
    },
  },
};
