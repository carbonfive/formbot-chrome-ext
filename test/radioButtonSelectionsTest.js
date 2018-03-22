let chai = require("chai");
const expect = chai.expect;

import multilineParse from "./multiline_fixture_parser";
require("../js/vendor/jquery-3.2.1.min");
require("../js/radioButtonSelections");

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
      expect(fixture).not.equal("");
    });
  });
});