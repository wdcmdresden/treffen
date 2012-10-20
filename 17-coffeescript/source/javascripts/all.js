//= require editor
//
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  rollingLinks: false,

  theme: Reveal.getQueryHash().theme || 'sky', // available themehemes are in /css/theme
  transition: Reveal.getQueryHash().transition || 'concave', // default/cube/page/concave/linear(2d)

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: 'javascripts/classList.js', condition: function() { return !document.body.classList; } }
    
  ]
});
