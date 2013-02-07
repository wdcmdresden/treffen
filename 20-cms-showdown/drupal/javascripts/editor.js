(function() {

  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    rollingLinks: false,
    theme: Reveal.getQueryHash().theme || 'default',
    transition: Reveal.getQueryHash().transition || 'concave',
    dependencies: [
      {
        src: 'javascripts/classList.js',
        condition: function() {
          return !document.body.classList;
        }
      }
    ]
  });

  Reveal.addEventListener('slidechanged', function(event) {});

  $(function() {
    return prettyPrint();
  });

}).call(this);
