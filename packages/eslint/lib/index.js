import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'] 
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser } 
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } } 
  },
  {
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'spaced-comment': ['error', 'always'],
      'block-spacing': 'error',
      'brace-style': 'warn',
      'space-before-blocks': 'error',
      'arrow-spacing': 'error',
      'keyword-spacing': [
        'error',
        {
          'before': true,
          'after': true 
        }
      ],
      'switch-colon-spacing': [
        'error',
        {
          before: true,
          after: true 
        }
      ],
      'no-multi-spaces': 'error',
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': 'error',
      'computed-property-spacing': ['error', 'never'],
      'semi-spacing': [
        'error',
        {
          before: false, 
          after: true 
        }
      ],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true 
        }
      ],
      'comma-spacing': [
        'warn',
        {
          before: false,
          after: true
        }
      ],
      'no-whitespace-before-property': 'error',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'no-dupe-keys': 'error',
      'eqeqeq': 'warn',
      'object-curly-newline': [
        'warn',
        {
          'ObjectExpression': {
            'multiline': true,
            'minProperties': 4 
          },
          'ObjectPattern': {
            'multiline': true,
            'minProperties': 4 
          },
          'ImportDeclaration': 'never',
          'ExportDeclaration': {
            'multiline': true,
            'minProperties': 4 
          }
        }
      ],
      'object-property-newline': 'error',
      'array-element-newline': [
        'error',
        {
          multiline: true,
          minItems: 3 
        }
      ],
      'array-bracket-newline': [
        'warn',
        {
          multiline: true,
          minItems: 3 
        }
      ],
      'arrow-body-style': ['warn', 'as-needed'],
      'implicit-arrow-linebreak': ['warn', 'beside'],
      'no-sparse-arrays': 'error',
      'indent': ['error', 2],
      'func-call-spacing': ['error', 'never'],
      'comma-dangle': ['warn', 'never'],
      'no-prototype-builtins': 'warn'
    }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-useless-template-attributes': 'warn',
      'vue/html-closing-bracket-newline': 'off',
      'vue/block-tag-newline': [
        'error',
        {
          singleline: 'always',
          multiline: 'always',
          maxEmptyLines: 1 
        }
      ],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        { autofix: true }
      ],
      'vue/html-quotes': [
        'error',
        'single',
        { avoidEscape: true }
      ],
      'vue/max-attributes-per-line': ['error', { singleline: { max: 3 } }],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below' 
        }
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        { registeredComponentsOnly: false }
      ],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/eqeqeq': 'warn',
      'vue/no-mutating-props': 'warn',
      'vue/require-valid-default-prop': 'warn',
      'vue/no-duplicate-attributes': 'warn'
    }
  }
]
