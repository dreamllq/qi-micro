'use strict';

const stylelint = require('..');
const assert = require('assert').strict;

assert.strictEqual(stylelint(), 'Hello from stylelint');
console.info('stylelint tests passed');
