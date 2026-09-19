(function () {
  var xd94b = 1200;
  var ta3ff = 4000;
  var a409c = null;
  var ge95f = null;

  function j0640() {
    clearTimeout(a409c);
    a409c = setTimeout(i7742, xd94b + Math.random() * (ta3ff - xd94b));
  }

  function i7742() {
    ge95f.classList.remove("i7742");
    void ge95f.offsetWidth; 
    ge95f.classList.add("i7742");
  }

  function c06ec() {
    ge95f = document.querySelector(".e249a");
    if (!ge95f) return;

    var w2b67 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (w2b67 && w2b67.matches) return;

    ge95f.addEventListener("animationend", j0640);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(a409c);
      else j0640();
    });

    j0640();
  }

  window.q38a3 = c06ec;
})();
