require('./setup');
require("../js/radioButtonSelections");
const expect = require('chai').expect
const chai = require("chai")
const multilineParse = require("./multiline_fixture_parser");

describe('Array', () =>  {

  describe('some context', () => {

    it('works', () => {
      let fixture = multilineParse(function() {/*
  <form method="post" action="/" class="test-form">
    <p>
      <label for="do-you-like-beans[yes]">Yes</label>
      <input type="radio" name="do-you-like-beans" id="do-you-like-beans[yes]" value="yes">
    </p>
    <p>
      <label for="do-you-like-beans[no]">No</label>
      <input type="radio" name="do-you-like-beans" id="do-you-like-beans[yes]" value="no">
    </p>
    <input type="submit" value="Sign up">
  </form>
*/});

      let div = document.createElement('div').appendChild(fixture);

      expect(fixture).not.equal("");
    });
  });
});