'use strict';

const vuePermission = require('..');
const assert = require('assert').strict;

assert.strictEqual(vuePermission(), 'Hello from vuePermission');
console.info('vuePermission tests passed');
