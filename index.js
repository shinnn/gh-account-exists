/*!
 * gh-account-exists | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/gh-account-exists
*/
'use strict';

const inspect = require('util').inspect;

const ghGet = require('gh-get');

const ERROR_MESSAGE = 'Expected a Github username to check whether it exists or not';

function onFulfilled() {
  return true;
}

function onRejected(err) {
  if (err.message.startsWith('404')) {
    return false;
  }

  return Promise.reject(err);
}

module.exports = function ghAccountExists(username, options) {
  options = Object.assign({
    userAgent: 'gh-account-exists https://github.com/shinnn/gh-account-exists'
  }, options);

  if (typeof username !== 'string') {
    return Promise.reject(new TypeError(`${ERROR_MESSAGE}, but got ${inspect(username)}.`));
  }

  if (username.length === 0) {
    return Promise.reject(new Error(`${ERROR_MESSAGE}, but got '' (empty string).`));
  }

  if (!/^[a-z\d-]{1,39}$/.test(username)) {
    return Promise.resolve(false);
  }

  return ghGet(`users/${username}`, options).then(onFulfilled, onRejected);
};
