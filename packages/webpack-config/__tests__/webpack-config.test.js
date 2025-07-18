'use strict';

const webpackConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(webpackConfig(), 'Hello from webpackConfig');
console.info('webpackConfig tests passed');
