'use strict';

const appTypesGen = require('..');
const assert = require('assert').strict;

assert.strictEqual(appTypesGen(), 'Hello from appTypesGen');
console.info('appTypesGen tests passed');
