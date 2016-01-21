'use strict'
const fetch = require('./src/fetch').fetch;
fetch('http://www.marklogic.com')
  .then(response => response.text())
  .then(console.log);
