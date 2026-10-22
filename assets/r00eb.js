(function () {
  var d22ba = 1200;
  var lf1be = 4000;
  var l1a9f = null;
  var t59bb = null;

  function hfd55() {
    clearTimeout(l1a9f);
    l1a9f = setTimeout(a9f42, d22ba + Math.random() * (lf1be - d22ba));
  }

  function a9f42() {
    t59bb.classList.remove("a9f42");
    void t59bb.offsetWidth; 
    t59bb.classList.add("a9f42");
  }

  function ge38f() {
    t59bb = document.querySelector(".v14d0");
    if (!t59bb) return;

    var o2f5a = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (o2f5a && o2f5a.matches) return;

    t59bb.addEventListener("animationend", hfd55);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(l1a9f);
      else hfd55();
    });

    hfd55();
  }

  window.s6cc2 = ge38f;
})();
