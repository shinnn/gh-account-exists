'use strict';

const ghAccountExists = require('.');
const test = require('tape');

process.env.GITHUB_TOKEN = '';

test('ghAccountExists()', t => {
  t.plan(10);

  const option = {token: process.env.TOKEN_FOR_TEST};

  ghAccountExists('othiym23', option).then(result => {
    t.strictEqual(
      result,
      true,
      'should check if a Github account with a given username exists.'
    );
  }).catch(t.fail);

  ghAccountExists('a'.repeat(39), option).then(result => {
    t.strictEqual(
      result,
      true,
      'should support maximun-length username.'
    );
  }).catch(t.fail);

  ghAccountExists('electron-userland', option).then(result => {
    t.strictEqual(
      result,
      true,
      'should support organization accounts.'
    );
  }).catch(t.fail);

  ghAccountExists('klewkdslkrk-welklf-ddsklkk132h32kfkjk', option).then(result => {
    t.strictEqual(
      result,
      false,
      'should be fulfilled with `false` when a user doesn\'t exist.'
    );
  }).catch(t.fail);

  ghAccountExists('aあ', option).then(result => {
    t.strictEqual(
      result,
      false,
      'should be fulfilled with `false` when the username includes an invlid character.'
    );
  }).catch(t.fail);

  ghAccountExists('a'.repeat(40)).then(result => {
    t.strictEqual(
      result,
      false,
      'should be fulfilled with `false` when the string exceeds maximum username length.'
    );
  }).catch(t.fail);

  ghAccountExists('shinnn', {token: 'aaaaaaaaaaaaaaaaaaa'}).then(t.fail, ({message}) => {
    t.strictEqual(
      message,
      '401 Unauthorized (Bad credentials)',
      'should fail when the API request doesn\'t succeed.'
    );
  }).catch(t.fail);

  ghAccountExists([1, 2]).then(t.fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected a Github username to check whether it exists or not, but got [ 1, 2 ].',
      'should fail when it takes a non-string argument.'
    );
  }).catch(t.fail);

  ghAccountExists('').then(t.fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected a Github username to check whether it exists or not, but got \'\' (empty string).',
      'should fail when it takes an empty string.'
    );
  }).catch(t.fail);

  ghAccountExists().then(t.fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected a Github username to check whether it exists or not, but got undefined.',
      'should fail when it takes no arguments.'
    );
  }).catch(t.fail);
});
