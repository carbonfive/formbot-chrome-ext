require('./setup');

const multilineParse = require("./multiline_fixture_parser");

require("../js/radioButtonSelections");

describe('Array', () =>  {
  jsdom();
  describe('some context', () => {

    it('works', () => {
      let div = document.createElement('div');
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