(function () {
  var t0943 = 1200;
  var p2fa2 = 4000;
  var jbac2 = null;
  var h2b13 = null;

  function m9e0d() {
    clearTimeout(jbac2);
    jbac2 = setTimeout(h6b00, t0943 + Math.random() * (p2fa2 - t0943));
  }

  function h6b00() {
    h2b13.classList.remove("h6b00");
    void h2b13.offsetWidth; 
    h2b13.classList.add("h6b00");
  }

  function j1cdf() {
    h2b13 = document.querySelector(".l2e2a");
    if (!h2b13) return;

    var yaec2 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (yaec2 && yaec2.matches) return;

    h2b13.addEventListener("animationend", m9e0d);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(jbac2);
      else m9e0d();
    });

    m9e0d();
  }

  window.qd72a = j1cdf;
})();
