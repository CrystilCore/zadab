(function () {
  var m146d = 1200;
  var k2f60 = 4000;
  var la121 = null;
  var i6d98 = null;

  function re7af() {
    clearTimeout(la121);
    la121 = setTimeout(zce93, m146d + Math.random() * (k2f60 - m146d));
  }

  function zce93() {
    i6d98.classList.remove("zce93");
    void i6d98.offsetWidth; 
    i6d98.classList.add("zce93");
  }

  function e3c83() {
    i6d98 = document.querySelector(".cccf8");
    if (!i6d98) return;

    var u9541 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (u9541 && u9541.matches) return;

    i6d98.addEventListener("animationend", re7af);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(la121);
      else re7af();
    });

    re7af();
  }

  window.q9d77 = e3c83;
})();
