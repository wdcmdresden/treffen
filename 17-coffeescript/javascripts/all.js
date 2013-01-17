(function() {
  var CoffeeCompileEditor;

  Reveal.addEventListener('slidechanged', function(event) {
    var el;
    el = $(event.currentSlide);
    if (!(el.find(".ace_editor").length > 0)) {
      return new CoffeeCompileEditor(el.find(".editor-content")[0]);
    }
  });

  CoffeeCompileEditor = (function() {
    var CoffeeMode;

    CoffeeMode = require("ace/mode/coffee").Mode;

    function CoffeeCompileEditor(editor) {
      var p;
      this.editor = editor;
      this.editor.ace = this;
      p = $(this.editor).parent();
      p.append($("<div class='editor'/>"));
      p.append($("<pre class='editor-jsbuffer'/>"));
      p.append($("<pre class='editor-console'/>"));
      this.run = $("<a class='run'>Run</a>");
      p.append(this.run);
      this.js = p.find(".editor-jsbuffer");
      this.console = p.find(".editor-console");
      this.setupAce();
    }

    CoffeeCompileEditor.prototype.setupAce = function() {
      var content, editor, ref, session;
      ref = this;
      content = this.editor.innerHTML;
      this.editor.innerHTML = "";
      content = content.replace(/(^\s+|\s+$)/g, "");
      content = content.replace(/&gt;/g, ">");
      content = content.replace(/&lt;/g, "<");
      editor = ace.edit(this.editor);
      this.ace = editor;
      session = editor.getSession();
      session.setMode(new CoffeeMode());
      editor.setTheme("ace/theme/textmate");
      session.setUseSoftTabs(true);
      session.setTabSize(2);
      ref.updateEditor();
      setTimeout(function() {
        editor.getSession().setValue(content);
        return editor.focus();
      });
      editor.getSession().on("change", function(e) {
        if (this.changeTimer) {
          clearTimeout(this.changeTimer);
          this.changeTimer = null;
        }
        return this.changeTimer = setTimeout(function() {
          this.changeTimer = null;
          return ref.updateEditor();
        }, 500);
      });
      return this.run.click(function() {
        return ref.runCode();
      });
    };

    CoffeeCompileEditor.prototype.changeTimer = null;

    CoffeeCompileEditor.prototype.updateEditor = function() {
      var compiled;
      try {
        compiled = CoffeeScript.compile(this.ace.getSession().getValue(), {
          bare: true
        });
        this.js.html(compiled);
        return hljs.highlightBlock(this.js[0], null, false);
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    CoffeeCompileEditor.prototype.runCode = function() {
      var compiled, old_console, ref, result, resultText;
      this.console[0].innerHTML = "";
      old_console = console.log;
      try {
        compiled = CoffeeScript.compile(this.ace.getSession().getValue(), {
          bare: true
        });
        ref = this.console;
        console.log = function(obj) {
          ref.append("<span class='log'>" + (obj.toString()) + "</span>");
          return null;
        };
        result = eval(compiled);
        console.log = old_console;
        try {
          resultText = JSON.stringify(result, null, 1);
        } catch (error) {
          resultText = result.toString();
        }
        if (resultText) {
          return this.console.append("<span class='return'>" + (this.escapeHTML(resultText)) + "</span>");
        }
      } catch (error) {
        this.console.append("<span class='error'>" + (this.escapeHTML(error.toString())) + "</span>");
        return console.log = old_console;
      }
    };

    CoffeeCompileEditor.prototype.escapeHTML = function(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    return CoffeeCompileEditor;

  })();

}).call(this);

//
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  rollingLinks: false,

  theme: Reveal.getQueryHash().theme || 'default', // available themehemes are in /css/theme
  transition: Reveal.getQueryHash().transition || 'concave', // default/cube/page/concave/linear(2d)

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: 'javascripts/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'javascripts/notes.js', async: true, condition: function() { return !!document.body.classList; } }
    
  ]
});
