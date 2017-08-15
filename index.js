(function() {
  function TextareaCaret(textarea) {
    this.textarea = textarea;
  }

  TextareaCaret.prototype.caretPosition = function() {
    return this.textarea.selectionStart;
  };

  TextareaCaret.prototype.currentHeadIndex = function() {
    var parsedLines   = this.parsedLines();
    var caretPosition = this.caretPosition();

    if (parsedLines.length < 2) return 0;

    for (var i = 0; i < parsedLines.length; i++) {
      var line = parsedLines[i];

      if (line.start <= caretPosition && caretPosition < line.end) {
        return line.start;
      }
    }
    return parsedLines[parsedLines.length - 1].start;
  };

  TextareaCaret.prototype.currentLine = function() {
    var parsedLines   = this.parsedLines();
    var caretPosition = this.caretPosition();

    for (var i = 0; i < parsedLines.length; i++) {
      var line = parsedLines[i];

      if (line.start <= caretPosition && caretPosition < line.end) {
        return line.value;
      }
    }
    return this.textarea.value;
  };

  TextareaCaret.prototype.headIndexes = function() {
    var lines = this.lines();
    var headIndexes = [];
    var pos = 0;

    if (lines.length < 2) return [0];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      headIndexes.push(pos);
      pos += (line + "\n").length
    }
    return headIndexes;
  };

  TextareaCaret.prototype.insert = function(text, position) {
    var before = this.textarea.value.substr(0, position);
    var after  = this.textarea.value.substr(position, this.textarea.value.length);
    this.textarea.value = before + text + after;
  };

  TextareaCaret.prototype.insertAtCaret = function(text) {
    this.insert(text, this.caretPosition());
  };

  TextareaCaret.prototype.insertAtCurrentHead = function(text) {
    this.insert(text, this.currentHeadIndex());
  };

  TextareaCaret.prototype.lines = function() {
    if (/\n/.test(this.textarea.value)) {
      return this.textarea.value.split("\n");
    } else {
      return [];
    }
  };

  TextareaCaret.prototype.parsedLines = function() {
    var lines = this.lines();
    var parsedLines = [];
    var pos = 0;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var lf = i === lines.length - 1 ? "" : "\n";
      var value = line + lf;
      var length = value.length;
      var end = pos + length;

      parsedLines.push({
        start:  pos,
        end:    end,
        length: length,
        value:  value
      });

      pos += length;
    }
    return parsedLines;
  };

  if (typeof module === 'object') {
    module.exports = TextareaCaret;
  } else {
    window.TextareaCaret = TextareaCaret;
  }
})();