module.exports = {
  indexes: function(el) {
    var lines = this.lines(el);
    var indexes = [];
    var pos = 0;
    for (var i = 0; i <= lines.length; i++) {
      indexes.push(pos);
      var line = lines[i];
      pos += (line + "\n").length
    }
    return indexes;
  },
  lines: function(el) {
    return el.value.split("\n");
  },
  caretPosition: function(el) {
    return el.selectionStart;
  },
  insert: function(el, text, position) {
    el.value = el.value.substr(0, position) + text + el.value.substr(position, el.value.length);
  },
  insertAtCaret: function(el, text) {
    this.insert(el, text, this.caretPosition(el));
  }
};


function TextareaCaret(el) {
  this.el = el;
}

TextareaCaret.prototype.aaa = function(arg) {
  return "bbb";
};
