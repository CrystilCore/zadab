(function () {
  var zfb91 = 1200;
  var c9e59 = 4000;
  var rbfc0 = null;
  var xaa62 = null;

  function d7807() {
    clearTimeout(rbfc0);
    rbfc0 = setTimeout(f986e, zfb91 + Math.random() * (c9e59 - zfb91));
  }

  function f986e() {
    xaa62.classList.remove("f986e");
    void xaa62.offsetWidth; 
    xaa62.classList.add("f986e");
  }

  function kad74() {
    xaa62 = document.querySelector(".w2b86");
    if (!xaa62) return;

    var p0d00 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (p0d00 && p0d00.matches) return;

    xaa62.addEventListener("animationend", d7807);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(rbfc0);
      else d7807();
    });

    d7807();
  }

  window.e62a5 = kad74;
})();
