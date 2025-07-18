'use strict';

const trans = require('..');
const assert = require('assert').strict;

assert.strictEqual(trans(), 'Hello from trans');
console.info('trans tests passed');
