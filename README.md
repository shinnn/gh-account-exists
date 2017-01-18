# gh-account-exists

[![NPM version](https://img.shields.io/npm/v/gh-account-exists.svg)](https://www.npmjs.com/package/gh-account-exists)
[![Build Status](https://travis-ci.org/shinnn/gh-account-exists.svg?branch=master)](https://travis-ci.org/shinnn/gh-account-exists)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/gh-account-exists.svg)](https://coveralls.io/github/shinnn/is-gist-starred?branch=master)

A [Node.js](https://nodejs.org/) module to check if a [Github](https://github.com/) account with the given username exists or not

```javascript
const ghAccountExists = require('gh-account-exists');

ghAccountExists('shinnn').then(exists => {
  console.log(exists); // true
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install gh-account-exists
```

## API

```javascript
const ghAccountExists = require('gh-account-exists');
```

### ghAccountExists(*username* [, *options*])

*username*: `String` (a Github username)  
*options*: `Object` ([`gh-get` options](https://github.com/shinnn/gh-get#ghgeturl--options))  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor)

The returned promise will be resolved with `true` if the account exists, or resolved with `false` if it doesn't exist.

```javascript
// User account
ghAccountExists('tim').then(exists => {
  console.log(exists); // true
});

// Organization account
ghAccountExists('nodejs').then(exists => {
  console.log(exists); // true
});

// Bot account
ghAccountExists('mention-bot').then(exists => {
  console.log(exists); // true
});

// Account that doesn't exist
ghAccountExists('4589iutoiy72euiiujjudjf').then(exists => {
  console.log(exists); // false
});
```

## License

Copyright (c) 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
