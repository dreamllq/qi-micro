'use strict';

const frameworkSdk = require('..');
const assert = require('assert').strict;

assert.strictEqual(frameworkSdk(), 'Hello from frameworkSdk');
console.info('frameworkSdk tests passed');
