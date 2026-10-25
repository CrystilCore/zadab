(function () {
  var y60f5 = 1200;
  var o84fd = 4000;
  var l8ac2 = null;
  var jfcd3 = null;

  function xba7a() {
    clearTimeout(l8ac2);
    l8ac2 = setTimeout(h02d3, y60f5 + Math.random() * (o84fd - y60f5));
  }

  function h02d3() {
    jfcd3.classList.remove("h02d3");
    void jfcd3.offsetWidth; 
    jfcd3.classList.add("h02d3");
  }

  function sf227() {
    jfcd3 = document.querySelector(".p1832");
    if (!jfcd3) return;

    var w0e4b = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (w0e4b && w0e4b.matches) return;

    jfcd3.addEventListener("animationend", xba7a);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(l8ac2);
      else xba7a();
    });

    xba7a();
  }

  window.x1505 = sf227;
})();
