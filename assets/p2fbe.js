(function () {
  var kbb22 = 1200;
  var lb0a1 = 4000;
  var ve1d5 = null;
  var fdb0b = null;

  function ldc32() {
    clearTimeout(ve1d5);
    ve1d5 = setTimeout(s8b27, kbb22 + Math.random() * (lb0a1 - kbb22));
  }

  function s8b27() {
    fdb0b.classList.remove("s8b27");
    void fdb0b.offsetWidth; 
    fdb0b.classList.add("s8b27");
  }

  function q4320() {
    fdb0b = document.querySelector(".kb90a");
    if (!fdb0b) return;

    var lc2bc = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (lc2bc && lc2bc.matches) return;

    fdb0b.addEventListener("animationend", ldc32);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(ve1d5);
      else ldc32();
    });

    ldc32();
  }

  window.t6518 = q4320;
})();
