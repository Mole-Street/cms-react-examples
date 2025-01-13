module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    // SCSS-specific rules
    'scss/load-partial-extension': null,
    'scss/dollar-variable-pattern': '^_?[a-z][a-zA-Z0-9]*$', // Allows an optional _ prefix with camelCase
    'scss/at-mixin-pattern': '^(?:[a-z][a-zA-Z0-9]*|[A-Z][A-Z0-9]*)$', // Allows camelCase or ALL CAPS
    'scss/at-function-pattern': '^[a-z][a-zA-Z0-9]*$', // camelCase

    // General stylistic rules
    'color-function-notation': 'modern',
    'function-name-case': null,
    'value-keyword-case': null,
    'font-family-name-quotes': 'always-where-recommended',
    'selector-class-pattern': null,

    // Vendor-prefix and syntax rules
    'property-no-vendor-prefix': null,
    'media-feature-range-notation': null,

    // Formatting rules
    'at-rule-empty-line-before': null,
  },
};
