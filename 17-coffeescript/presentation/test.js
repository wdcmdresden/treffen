<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta charset='utf-8' />
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible' />
    <title>Coffeescript - WDCM Dresden</title>
    <link href="stylesheets/github.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="stylesheets/all.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body class='test'>
    <div class='reveal'>
      <div class='state-background'>
        <div class='slides'>
          (function() {
            var User;
          
            User = (function() {
          
              function User() {}
          
              User.prototype.greet = function(x) {
                return "Hallo " + this.vorname + " " + this.name + " bla \n";
              };
          
              return User;
          
            })();
          
          }).call(this);
        </div>
        <aside class='controls'>
          <a class='left' href='#'>&#x25C4;</a>
          <a class='right' href='#'>&#x25BA;</a>
          <a class='up' href='#'>&#x25B2;</a>
          <a class='down' href='#'>&#x25BC;</a>
        </aside>
        <div class='progress'>
          <span></span>
        </div>
      </div>
    </div>
    <script src="javascripts/head.min.js" type="text/javascript"></script>
    <script src="javascripts/jquery.min.js" type="text/javascript"></script>
    <script src="javascripts/reveal.min.js" type="text/javascript"></script>
    <script src="javascripts/ace.js" type="text/javascript"></script>
    <script src="javascripts/mode-coffee.js" type="text/javascript"></script>
    <script src="javascripts/theme-textmate.js" type="text/javascript"></script>
    <script src="javascripts/coffee-script.js" type="text/javascript"></script>
    <script src="javascripts/highlight.pack.js" type="text/javascript"></script>
    <script src="javascripts/all.js" type="text/javascript"></script>
  </body>
</html>
