if (typeof process === 'object') {
  // Initialize node environment
  const JSDOM = require('jsdom').JSDOM;

  global.window = new JSDOM('', {
    url: "http://localhost",
  }).window;
  global.document = global.window.document;

} else {
  window.expect = window.chai.expect
  window.require = function () { /* noop */ }
}