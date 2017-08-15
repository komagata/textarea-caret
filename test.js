var assert = require("assert");
var TextareaCaret = require("./index.js");

describe("textarea-caret-util", function() {
  var textarea = null;
  var tc = null;

  beforeEach(function(){
    document.body.innerHTML = "<!DOCTYPE html><html lang=\"ja\"><head><meta charset=\"UTF-8\"><title>Test</title></head><body><textarea></textarea></body></html>";
    textarea = document.querySelector("textarea");
    tc = new TextareaCaret(textarea);
  });

  it("caretPosition", function() {
    assert.equal(tc.caretPosition(), 0);
  });

  it("currentHeadIndex", function() {
    textarea.value = "";
    textarea.setSelectionRange(0, 0);
    assert.equal(tc.currentHeadIndex(), 0);

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(8, 8);
    assert.equal(tc.currentHeadIndex(), 8);

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(5, 5);
    assert.equal(tc.currentHeadIndex(), 4);

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(11, 11);
    assert.equal(tc.currentHeadIndex(), 8);
  });

  it("currentLine", function() {
    textarea.value = "";
    textarea.setSelectionRange(0, 0);
    assert.equal(tc.currentLine(), "");

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(8, 8);
    assert.equal(tc.currentLine(), 'ccc');

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(5, 5);
    assert.equal(tc.currentLine(), "bbb\n");

    textarea.value = "aaa\n## bbb\nccc";
    textarea.setSelectionRange(8, 8);
    assert.equal(tc.currentLine(), "## bbb\n");
  });

  it("headIndexes", function() {
    textarea.value = "aaa\nbbb\nccc";
    assert.deepEqual(tc.headIndexes(), [0, 4, 8]);

    textarea.value = "";
    assert.deepEqual(tc.headIndexes(), [0]);
  });

  it("insert", function() {
    textarea.value = "aaa\nbbb\nccc";
    tc.insert("XXX\n", 4);
    assert.equal(textarea.value, "aaa\nXXX\nbbb\nccc");
  });

  it("insertAtCaret", function() {
    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(8, 8);
    tc.insertAtCaret("XXX\n");
    assert.equal(textarea.value, "aaa\nbbb\nXXX\nccc");
  });

  it("insertAtCurrentHead", function() {
    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(8, 8);
    tc.insertAtCurrentHead("## ");
    assert.equal(textarea.value, "aaa\nbbb\n## ccc");

    textarea.value = "aaa\nbbb\nccc";
    textarea.setSelectionRange(5, 5);
    tc.insertAtCurrentHead("- ");
    assert.equal(textarea.value, "aaa\n" + '- ' + "bbb\nccc");

    textarea.setSelectionRange(5, 5);
    tc.insertAtCurrentHead("- ");
    assert.equal(textarea.value, "aaa\n" + '- - ' + "bbb\nccc");
  });

  it("lines", function() {
    textarea.value = "";
    assert.deepEqual(tc.lines(), []);

    textarea.value = "aaa\nbbb\nccc";
    assert.deepEqual(tc.lines(), ["aaa", "bbb", "ccc"]);
  });

  it("parsedLines", function() {
    textarea.value = "";
    assert.deepEqual(tc.parsedLines(), []);

    textarea.value = "aaa\nbbb\nccc";
    var expected = [
      {
        start:  0,
        end:    4,
        length: 4,
        value:  "aaa\n"
      },
      {
        start:  4,
        end:    8,
        length: 4,
        value:  "bbb\n"
      },
      {
        start:  8,
        end:    11,
        length: 3,
        value:  "ccc"
      }
    ];
    assert.deepEqual(tc.parsedLines(), expected);
  });
});