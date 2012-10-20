
jQuery ->
  $('.editor-content').each ->
    new CoffeeCompileEditor this
    

class CoffeeCompileEditor
  CoffeeMode = require("ace/mode/coffee").Mode
  constructor: (@editor) ->
    p = $(@editor).parent()
    p.append $("<div class='editor'/>")
    p.append $("<pre class='editor-jsbuffer'/>")
    p.append $("<pre class='editor-console'/>")
    @run = $("<a class='run'>Run</a>")

    p.append @run
    @js = p.find ".editor-jsbuffer"
    @console = p.find ".editor-console"
    @setupAce()

  setupAce: ->
    ref = @
    content = @editor.innerHTML
    @editor.innerHTML = ""
    content = content.replace /(^\s+|\s+$)/g, ""
    content = content.replace /&gt;/g, ">"
    editor = ace.edit @editor
    @ace = editor
    session = editor.getSession()
    session.setMode new CoffeeMode()
    editor.setTheme("ace/theme/textmate");
    session.setUseSoftTabs(true)
    session.setTabSize(2)
    setTimeout ->
      editor.getSession().setValue(content)
      editor.focus()
    editor.getSession().on "change", (e) ->
      if @changeTimer
        clearTimeout(@changeTimer)
        @changeTimer = null
      @changeTimer = setTimeout ->
        @changeTimer = null
        ref.updateEditor()
      , 500
    @run.click ->
      ref.runCode()
  changeTimer: null

  updateEditor: ->
    try
      compiled = CoffeeScript.compile(@ace.getSession().getValue(), { bare: true })
      @js.html compiled
      hljs.highlightBlock @js[0], null, false
    catch error
      error
    
  runCode: ->
    @console[0].innerHTML = ""
    old_console = console.log
    try
      compiled = CoffeeScript.compile(@ace.getSession().getValue(), { bare: true })
      ref = @console
      console.log = (obj) ->
        ref.append "<span class='log'>#{obj.toString()}</span>"
        null
      result = eval(compiled)
      console.log = old_console
      try
        resultText = JSON.stringify(result, null, 1)
      catch error
        resultText = result.toString()
      if (resultText)
        @console.append "<span class='return'>#{@escapeHTML(resultText)}</span>"
    catch error
      @console.append "<span class='error'>#{@escapeHTML(error.toString())}</span>"
      console.log = old_console
    

  escapeHTML: (s) -> s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

