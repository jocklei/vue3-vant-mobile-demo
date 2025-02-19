import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,

    // enable UnoCSS support
    // https://unocss.dev/integrations/vscode
    unocss: true,

    formatters: {
      css: true,
    },
  },
  {
    rules: {
      'no-console': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'off',
      'no-useless-catch': 'off',
      'unicorn/no-new-array': 'off',
      'perfectionist/sort-imports': 'off',
      'antfu/top-level-function': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-exports': 'off',
    },
  },
  {
    ignores: [
      '.github/**',
      'scripts/**',
    ],
  },
)
