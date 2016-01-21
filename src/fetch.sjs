'use strict'
class Request {
  constructor(url) {
    this.url = url;
  }
}

class Headers {
  constructor(headers) {
    let map = this[Symbol.for('items')] = new Map();
    if(headers) {
      Object.keys(headers).forEach(k => this.append(k, headers[k]) );
    }
  }
  append(name, value) {
    this.set(name, value);
    return this;
  }
  has(name) {
    return this[Symbol.for('items')].has(name);
  }
  get(name) {
    this[Symbol.for('items')].get(name);
    return this;
  }
  set(name, value) {
    this[Symbol.for('items')].set(name, value);
    return this;
  }
  delete(name) {
    this[Symbol.for('items')].delete(name);
    return this;
  }
  toString() { return '[Headers]'; }
}
class Response {
  constructor(url, status, message, headers, body) {
    const s = Symbol.for;
    this[s('headers')] = new Headers(headers);
    this[s('url')] = url;
    this[s('status')] = status;
    this[s('body')] = body;
  }
  get status() {
    return this[Symbol.for('status')];
  }
  get ok() {
    return this.status >= 200 && this.status < 300;
  }
  text() {
    return this[Symbol.for('body')];
  }
  json() {
    return JSON.parse(this[Symbol.for('body')]);
  }
  get headers() {
    return Symbol.for('headers');
  }
}

/** Title case, e.g. `title('titleCase') => 'TitleCase'` */
function title(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// See https://davidwalsh.name/fetch
function fetch(url, options) {

  const defaults = { method: 'get', headers: new Headers() }
  const opts = Object.assign({}, defaults, options);
  return new Promise(function(resolve, reject) {
    let xdmphttp = xdmp['http' + title(opts.method)];
    const http = xdmphttp('http://www.marklogic.com');
    const meta = fn.head(http);
    const body = fn.subsequence(http, 2);
    // console.log(meta);
    var response = new Response(url, Number(meta.code), meta.message, new Headers(meta.headers), body);
    resolve(response);
  });
}

module.exports.Request = Request;
module.exports.Response = Request;
module.exports.Headers = Headers;
module.exports.fetch = fetch;
