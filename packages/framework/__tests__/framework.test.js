'use strict';

const framework = require('..');
const assert = require('assert').strict;

assert.strictEqual(framework(), 'Hello from framework');
console.info('framework tests passed');
