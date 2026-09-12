(function () {
  var g97de = 1200;
  var gd5bc = 4000;
  var ib299 = null;
  var g4c99 = null;

  function s8978() {
    clearTimeout(ib299);
    ib299 = setTimeout(ud5df, g97de + Math.random() * (gd5bc - g97de));
  }

  function ud5df() {
    g4c99.classList.remove("ud5df");
    void g4c99.offsetWidth; 
    g4c99.classList.add("ud5df");
  }

  function if234() {
    g4c99 = document.querySelector(".m85be");
    if (!g4c99) return;

    var ka72a = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (ka72a && ka72a.matches) return;

    g4c99.addEventListener("animationend", s8978);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(ib299);
      else s8978();
    });

    s8978();
  }

  window.a991d = if234;
})();
